import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentStatus, UsageType } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { TextExtractionService } from './text-extraction.service';
import {
  ALLOWED_FILE_TYPES,
  chunkText,
  formatVector,
  successResponse,
} from '../common/utils';
import type { JwtPayload } from '../auth/auth.types';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly supabaseService: SupabaseService,
    private readonly embeddingsService: EmbeddingsService,
    private readonly textExtractionService: TextExtractionService,
    private readonly configService: ConfigService,
  ) {}

  async upload(user: JwtPayload, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const fileType = ALLOWED_FILE_TYPES[file.mimetype];
    if (!fileType) {
      throw new BadRequestException(
        'Invalid file type. Allowed: PDF, TXT, DOCX',
      );
    }

    const documentId = randomUUID();
    const storagePath = `companies/${user.companyId}/documents/${documentId}-${file.originalname}`;
    const bucket = this.supabaseService.getBucketName();

    await this.supabaseService.uploadFile(
      storagePath,
      file.buffer,
      file.mimetype,
    );

    const signedUrl = await this.supabaseService.getSignedUrl(storagePath);

    const document = await this.prisma.document.create({
      data: {
        id: documentId,
        companyId: user.companyId,
        uploadedById: user.userId,
        fileName: `${documentId}-${file.originalname}`,
        originalName: file.originalname,
        fileType,
        fileSize: file.size,
        storageBucket: bucket,
        storagePath,
        publicUrl: signedUrl,
        status: DocumentStatus.UPLOADED,
      },
    });

    await this.prisma.usageLog.create({
      data: {
        companyId: user.companyId,
        type: UsageType.DOCUMENT_UPLOAD,
        count: 1,
        metadata: { documentId: document.id, fileName: document.originalName },
      },
    });

    return successResponse('Document uploaded successfully', document);
  }

  async findAll(user: JwtPayload) {
    const documents = await this.prisma.document.findMany({
      where: { companyId: user.companyId },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse('Documents retrieved', documents);
  }

  async findOne(user: JwtPayload, id: string) {
    const document = await this.findCompanyDocument(user.companyId, id);
    return successResponse('Document retrieved', document);
  }

  async remove(user: JwtPayload, id: string) {
    const document = await this.findCompanyDocument(user.companyId, id);

    await this.supabaseService.deleteFile(document.storagePath);

    await this.prisma.document.delete({ where: { id } });

    return successResponse('Document deleted successfully', { id });
  }

  async process(user: JwtPayload, id: string) {
    const document = await this.findCompanyDocument(user.companyId, id);

    if (document.status === DocumentStatus.PROCESSING) {
      throw new BadRequestException('Document is already being processed');
    }

    await this.prisma.document.update({
      where: { id },
      data: { status: DocumentStatus.PROCESSING },
    });

    try {
      const fileBuffer = await this.supabaseService.downloadFile(
        document.storagePath,
      );

      const extractedText = await this.textExtractionService.extractText(
        fileBuffer,
        document.fileType,
      );

      const chunks = chunkText(extractedText);

      if (chunks.length === 0) {
        throw new BadRequestException(
          'No text could be extracted from document',
        );
      }

      await this.prisma.documentChunk.deleteMany({
        where: { documentId: id },
      });

      const embeddings = await this.embeddingsService.createEmbeddings(
        chunks.map((chunk) => chunk.content),
      );

      for (let i = 0; i < chunks.length; i += 1) {
        const chunk = chunks[i];
        const embedding = embeddings[i];
        const chunkId = randomUUID();
        const vector = formatVector(embedding);

        await this.prisma.$executeRawUnsafe(
          `
          INSERT INTO "DocumentChunk" ("id", "documentId", "companyId", "content", "embedding", "metadata", "createdAt")
          VALUES ($1, $2, $3, $4, $5::vector, $6::jsonb, NOW())
          `,
          chunkId,
          id,
          user.companyId,
          chunk.content,
          vector,
          JSON.stringify({
            ...chunk.metadata,
            documentId: id,
            fileName: document.originalName,
          }),
        );
      }

      const updated = await this.prisma.document.update({
        where: { id },
        data: {
          extractedText,
          status: DocumentStatus.COMPLETED,
        },
      });

      await this.prisma.usageLog.create({
        data: {
          companyId: user.companyId,
          type: UsageType.EMBEDDING,
          count: chunks.length,
          metadata: { documentId: id },
        },
      });

      return successResponse('Document processed successfully', updated);
    } catch (error) {
      await this.prisma.document.update({
        where: { id },
        data: { status: DocumentStatus.FAILED },
      });

      const message =
        error instanceof Error ? error.message : 'Document processing failed';
      throw new BadRequestException(message);
    }
  }

  private async findCompanyDocument(companyId: string, id: string) {
    const document = await this.prisma.document.findFirst({
      where: { id, companyId },
    });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  getMaxFileSizeBytes(): number {
    const maxMb = Number(this.configService.get('MAX_FILE_SIZE_MB') ?? 10);
    return maxMb * 1024 * 1024;
  }
}
