import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatbotsService } from '../chatbots/chatbots.service';
import { ConversationsService } from './conversations.service';
import { StartConversationDto } from './dto/start-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { successResponse } from '../common/utils';

@ApiTags('Public')
@Controller('public')
export class PublicController {
  constructor(
    private readonly chatbotsService: ChatbotsService,
    private readonly conversationsService: ConversationsService,
  ) {}

  @Get('chatbots/:chatbotId')
  @ApiOperation({ summary: 'Get public chatbot widget config' })
  async getPublicChatbot(@Param('chatbotId') chatbotId: string) {
    const chatbot = await this.chatbotsService.findActivePublic(chatbotId);
    return successResponse('Chatbot retrieved', chatbot);
  }

  @Post('chatbots/:chatbotId/conversations')
  @ApiOperation({ summary: 'Start a public widget conversation' })
  startConversation(
    @Param('chatbotId') chatbotId: string,
    @Body() dto: StartConversationDto,
  ) {
    return this.conversationsService.startPublic(chatbotId, {
      ...dto,
      chatbotId,
    });
  }

  @Post('conversations/:conversationId/messages')
  @ApiOperation({ summary: 'Send a message in a public conversation' })
  sendMessage(
    @Param('conversationId') conversationId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.conversationsService.sendPublicMessage(conversationId, dto);
  }
}
