import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ChatbotStatus } from '@prisma/client';

export class UpdateChatbotStatusDto {
  @ApiProperty({ enum: ChatbotStatus })
  @IsEnum(ChatbotStatus)
  status: ChatbotStatus;
}
