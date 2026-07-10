import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ConversationStatus,
  MessageRole,
  Prisma,
  UsageType,
} from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RagService } from '../rag/rag.service';
import { ChatbotsService } from '../chatbots/chatbots.service';
import { StartConversationDto } from './dto/start-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateConversationStatusDto } from './dto/update-conversation-status.dto';
import { successResponse } from '../common/utils';
import type { JwtPayload } from '../auth/auth.types';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly ragService: RagService,
    private readonly chatbotsService: ChatbotsService,
  ) {}

  async start(user: JwtPayload, dto: StartConversationDto) {
    const chatbot = await this.prisma.chatbot.findFirst({
      where: { id: dto.chatbotId, companyId: user.companyId },
    });

    if (!chatbot) {
      throw new NotFoundException('Chatbot not found');
    }

    const conversation = await this.prisma.conversation.create({
      data: {
        chatbotId: chatbot.id,
        companyId: user.companyId,
        visitorName: dto.visitorName,
        visitorEmail: dto.visitorEmail,
        status: ConversationStatus.OPEN,
      },
    });

    return successResponse('Conversation started', {
      conversation,
      welcomeMessage: chatbot.welcomeMessage,
    });
  }

  async sendMessage(
    user: JwtPayload,
    conversationId: string,
    dto: SendMessageDto,
  ) {
    const conversation = await this.findCompanyConversation(
      user.companyId,
      conversationId,
    );

    return this.handleMessage(conversation, dto.content);
  }

  async startPublic(chatbotId: string, dto: StartConversationDto) {
    const chatbot = await this.chatbotsService.findActivePublic(chatbotId);

    const conversation = await this.prisma.conversation.create({
      data: {
        chatbotId: chatbot.id,
        companyId: (
          await this.prisma.chatbot.findUniqueOrThrow({
            where: { id: chatbot.id },
          })
        ).companyId,
        visitorName: dto.visitorName,
        visitorEmail: dto.visitorEmail,
        status: ConversationStatus.OPEN,
      },
    });

    return successResponse('Conversation started', {
      conversation: {
        id: conversation.id,
        status: conversation.status,
        createdAt: conversation.createdAt,
      },
      welcomeMessage: chatbot.welcomeMessage,
    });
  }

  async sendPublicMessage(conversationId: string, dto: SendMessageDto) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { chatbot: true },
    });

    if (!conversation || conversation.chatbot.status !== 'ACTIVE') {
      throw new NotFoundException('Conversation not found');
    }

    return this.handleMessage(conversation, dto.content);
  }

  async findAll(user: JwtPayload) {
    const conversations = await this.prisma.conversation.findMany({
      where: { companyId: user.companyId },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        chatbot: {
          select: { id: true, name: true },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return successResponse('Conversations retrieved', conversations);
  }

  async findOne(user: JwtPayload, id: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id, companyId: user.companyId },
      include: {
        messages: { orderBy: { createdAt: 'asc' } },
        chatbot: {
          select: { id: true, name: true },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return successResponse('Conversation retrieved', conversation);
  }

  async updateStatus(
    user: JwtPayload,
    id: string,
    dto: UpdateConversationStatusDto,
  ) {
    await this.findCompanyConversation(user.companyId, id);

    const conversation = await this.prisma.conversation.update({
      where: { id },
      data: { status: dto.status },
    });

    return successResponse('Conversation status updated', conversation);
  }

  private async handleMessage(
    conversation: {
      id: string;
      companyId: string;
    },
    content: string,
  ) {
    await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: MessageRole.USER,
        content,
      },
    });

    const ragResult = await this.ragService.query(
      conversation.companyId,
      content,
    );

    const assistantMessage = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        role: MessageRole.ASSISTANT,
        content: ragResult.answer,
        sources: ragResult.sources as unknown as Prisma.InputJsonValue,
      },
    });

    await this.prisma.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    });

    await this.prisma.usageLog.create({
      data: {
        companyId: conversation.companyId,
        type: UsageType.MESSAGE,
        count: 1,
        metadata: { conversationId: conversation.id },
      },
    });

    return successResponse('Message sent', assistantMessage);
  }

  private async findCompanyConversation(companyId: string, id: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: { id, companyId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    return conversation;
  }
}
