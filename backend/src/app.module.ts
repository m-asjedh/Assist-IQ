import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SupabaseModule } from './supabase/supabase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { ChatbotsModule } from './chatbots/chatbots.module';
import { DocumentsModule } from './documents/documents.module';
import { EmbeddingsModule } from './embeddings/embeddings.module';
import { RagModule } from './rag/rag.module';
import { ConversationsModule } from './conversations/conversations.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    PrismaModule,
    SupabaseModule,
    AuthModule,
    UsersModule,
    CompaniesModule,
    ChatbotsModule,
    DocumentsModule,
    EmbeddingsModule,
    RagModule,
    ConversationsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
