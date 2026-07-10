import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { RagModule } from '../rag/rag.module';
import { ChatbotsModule } from '../chatbots/chatbots.module';
import { PublicController } from './public.controller';

@Module({
  imports: [RagModule, ChatbotsModule],
  controllers: [ConversationsController, PublicController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
