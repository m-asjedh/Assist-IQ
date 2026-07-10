import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatbotsService } from './chatbots.service';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { UpdateChatbotStatusDto } from './dto/update-chatbot-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/auth.types';

@ApiTags('Chatbots')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('chatbots')
export class ChatbotsController {
  constructor(private readonly chatbotsService: ChatbotsService) {}

  @Get()
  @ApiOperation({ summary: 'List company chatbots' })
  findAll(@CurrentUser() user: JwtPayload) {
    return this.chatbotsService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get chatbot by ID' })
  findOne(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.chatbotsService.findOne(user, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update chatbot settings' })
  update(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateChatbotDto,
  ) {
    return this.chatbotsService.update(user, id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update chatbot status' })
  updateStatus(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateChatbotStatusDto,
  ) {
    return this.chatbotsService.updateStatus(user, id, dto);
  }
}
