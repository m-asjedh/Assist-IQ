import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../prisma/prisma.service';
import { EmbeddingsService } from '../embeddings/embeddings.service';
import { createOpenRouterClient } from '../common/openrouter';
import { formatVector } from '../common/utils';

export interface RagSource {
  id: string;
  content: string;
  metadata: Record<string, unknown> | null;
  similarity: number;
}

export interface RagResult {
  answer: string;
  sources: RagSource[];
}

@Injectable()
export class RagService {
  private readonly client: OpenAI;
  private readonly chatModel: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly embeddingsService: EmbeddingsService,
    private readonly configService: ConfigService,
  ) {
    this.client = createOpenRouterClient(this.configService);
    this.chatModel =
      this.configService.get<string>('OPENROUTER_CHAT_MODEL') ??
      'openai/gpt-4o-mini';
  }

  async query(companyId: string, question: string): Promise<RagResult> {
    const questionEmbedding =
      await this.embeddingsService.createEmbedding(question);
    const vector = formatVector(questionEmbedding);

    const chunks = await this.prisma.$queryRawUnsafe<RagSource[]>(
      `
      SELECT
        id,
        content,
        metadata,
        1 - (embedding <=> $1::vector) AS similarity
      FROM "DocumentChunk"
      WHERE "companyId" = $2
        AND embedding IS NOT NULL
      ORDER BY embedding <=> $1::vector
      LIMIT 5
      `,
      vector,
      companyId,
    );

    const context = chunks
      .map((chunk, index) => `[${index + 1}] ${chunk.content}`)
      .join('\n\n');

    const systemPrompt = `You are a helpful customer support assistant for a company.
Answer questions using ONLY the provided knowledge base context.
If the answer is not available in the context, say: "I don't have enough information in the knowledge base to answer that question."
Do not make up information. Be concise and helpful.`;

    const userPrompt = context
      ? `Context:\n${context}\n\nQuestion: ${question}`
      : `No knowledge base context is available.\n\nQuestion: ${question}`;

    const completion = await this.client.chat.completions.create({
      model: this.chatModel,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
    });

    const answer =
      completion.choices[0]?.message?.content?.trim() ??
      "I don't have enough information in the knowledge base to answer that question.";

    return {
      answer,
      sources: chunks.map((chunk) => ({
        id: chunk.id,
        content: chunk.content,
        metadata: chunk.metadata,
        similarity: Number(chunk.similarity),
      })),
    };
  }
}
