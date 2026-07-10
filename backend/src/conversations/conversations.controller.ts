import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import { StartConversationDto } from './dto/start-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { UpdateConversationStatusDto } from './dto/update-conversation-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/auth.types';

@ApiTags('Conversations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a new conversation' })
  start(@CurrentUser() user: JwtPayload, @Body() dto: StartConversationDto) {
    return this.conversationsService.start(user, dto);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Send a message in a conversation' })
  sendMessage(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.conversationsService.sendMessage(user, id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List company conversations' })
  findAll(@CurrentUser() user: JwtPayload) {
    return this.conversationsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get conversation by ID' })
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.conversationsService.findOne(user, id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update conversation status' })
  updateStatus(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateConversationStatusDto,
  ) {
    return this.conversationsService.updateStatus(user, id, dto);
  }
}
