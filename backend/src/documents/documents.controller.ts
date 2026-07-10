import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/auth.types';
import { ALLOWED_FILE_TYPES } from '../common/utils';

@ApiTags('Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a knowledge base document' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024,
      },
      fileFilter: (_req, file, callback) => {
        if (!ALLOWED_FILE_TYPES[file.mimetype]) {
          return callback(
            new Error('Invalid file type. Allowed: PDF, TXT, DOCX'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  upload(
    @CurrentUser() user: JwtPayload,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentsService.upload(user, file);
  }

  @Get()
  @ApiOperation({ summary: 'List company documents' })
  findAll(@CurrentUser() user: JwtPayload) {
    return this.documentsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by ID' })
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.documentsService.findOne(user, id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  remove(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.documentsService.remove(user, id);
  }

  @Post(':id/process')
  @ApiOperation({ summary: 'Process document into chunks and embeddings' })
  process(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.documentsService.process(user, id);
  }
}
