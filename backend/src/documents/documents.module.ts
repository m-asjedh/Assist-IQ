import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TextExtractionService } from './text-extraction.service';
import { EmbeddingsModule } from '../embeddings/embeddings.module';

@Module({
  imports: [EmbeddingsModule],
  controllers: [DocumentsController],
  providers: [DocumentsService, TextExtractionService],
  exports: [DocumentsService],
})
export class DocumentsModule {}
