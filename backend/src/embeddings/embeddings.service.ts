import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { createOpenRouterClient } from '../common/openrouter';

@Injectable()
export class EmbeddingsService {
  private readonly client: OpenAI;
  private readonly embeddingModel: string;

  constructor(private readonly configService: ConfigService) {
    this.client = createOpenRouterClient(this.configService);
    this.embeddingModel =
      this.configService.get<string>('OPENROUTER_EMBEDDING_MODEL') ??
      'openai/text-embedding-3-small';
  }

  async createEmbedding(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: this.embeddingModel,
      input: text,
    });

    return response.data[0].embedding;
  }

  async createEmbeddings(texts: string[]): Promise<number[][]> {
    if (texts.length === 0) return [];

    const response = await this.client.embeddings.create({
      model: this.embeddingModel,
      input: texts,
    });

    return response.data
      .sort((a, b) => a.index - b.index)
      .map((item) => item.embedding);
  }
}
