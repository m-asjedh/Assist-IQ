import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { successResponse } from '../common/utils';
import type { JwtPayload } from '../auth/auth.types';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(user: JwtPayload) {
    const companyId = user.companyId;
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const [
      totalConversations,
      totalMessages,
      totalDocuments,
      totalChunks,
      chatbots,
      monthlyUsage,
    ] = await Promise.all([
      this.prisma.conversation.count({ where: { companyId } }),
      this.prisma.message.count({
        where: { conversation: { companyId } },
      }),
      this.prisma.document.count({ where: { companyId } }),
      this.prisma.documentChunk.count({ where: { companyId } }),
      this.prisma.chatbot.findMany({
        where: { companyId },
        select: { id: true, name: true, status: true },
      }),
      this.prisma.usageLog.groupBy({
        by: ['type'],
        where: {
          companyId,
          createdAt: { gte: startOfMonth },
        },
        _sum: { count: true },
      }),
    ]);

    return successResponse('Analytics overview retrieved', {
      totalConversations,
      totalMessages,
      totalDocuments,
      totalDocumentChunks: totalChunks,
      chatbotStatus: chatbots,
      monthlyUsage: monthlyUsage.map((item) => ({
        type: item.type,
        count: item._sum.count ?? 0,
      })),
    });
  }

  async getConversations(user: JwtPayload) {
    const conversations = await this.prisma.conversation.findMany({
      where: { companyId: user.companyId },
      include: {
        _count: { select: { messages: true } },
        chatbot: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return successResponse('Conversation analytics retrieved', conversations);
  }

  async getTopQuestions(user: JwtPayload) {
    const messages = await this.prisma.message.findMany({
      where: {
        role: 'USER',
        conversation: { companyId: user.companyId },
      },
      select: { content: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });

    const counts = new Map<string, number>();

    for (const message of messages) {
      const normalized = message.content.trim().toLowerCase();
      if (!normalized) continue;
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1);
    }

    const topQuestions = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([question, count]) => ({ question, count }));

    return successResponse('Top questions retrieved', topQuestions);
  }
}
