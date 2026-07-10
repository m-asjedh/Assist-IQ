import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { UpdateChatbotStatusDto } from './dto/update-chatbot-status.dto';
import { successResponse } from '../common/utils';
import type { JwtPayload } from '../auth/auth.types';
import { ChatbotStatus } from '@prisma/client';

@Injectable()
export class ChatbotsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(user: JwtPayload) {
    const chatbots = await this.prisma.chatbot.findMany({
      where: { companyId: user.companyId },
      orderBy: { createdAt: 'asc' },
    });

    return successResponse('Chatbots retrieved', chatbots);
  }

  async findOne(user: JwtPayload, id: string) {
    const chatbot = await this.findCompanyChatbot(user.companyId, id);
    return successResponse('Chatbot retrieved', chatbot);
  }

  async update(user: JwtPayload, id: string, dto: UpdateChatbotDto) {
    await this.findCompanyChatbot(user.companyId, id);

    const chatbot = await this.prisma.chatbot.update({
      where: { id },
      data: dto,
    });

    return successResponse('Chatbot updated', chatbot);
  }

  async updateStatus(
    user: JwtPayload,
    id: string,
    dto: UpdateChatbotStatusDto,
  ) {
    await this.findCompanyChatbot(user.companyId, id);

    const chatbot = await this.prisma.chatbot.update({
      where: { id },
      data: { status: dto.status },
    });

    return successResponse('Chatbot status updated', chatbot);
  }

  async findActivePublic(chatbotId: string) {
    const chatbot = await this.prisma.chatbot.findFirst({
      where: {
        id: chatbotId,
        status: ChatbotStatus.ACTIVE,
      },
      select: {
        id: true,
        name: true,
        welcomeMessage: true,
        tone: true,
        primaryColor: true,
        status: true,
      },
    });

    if (!chatbot) {
      throw new NotFoundException('Chatbot not found or inactive');
    }

    return chatbot;
  }

  private async findCompanyChatbot(companyId: string, id: string) {
    const chatbot = await this.prisma.chatbot.findFirst({
      where: { id, companyId },
    });

    if (!chatbot) {
      throw new NotFoundException('Chatbot not found');
    }

    return chatbot;
  }
}
