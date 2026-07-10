import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ChatbotStatus } from '@prisma/client';

export class UpdateChatbotDto {
  @ApiPropertyOptional({ example: 'Support Bot' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Welcome! How can we help?' })
  @IsOptional()
  @IsString()
  welcomeMessage?: string;

  @ApiPropertyOptional({ example: 'friendly' })
  @IsOptional()
  @IsString()
  tone?: string;

  @ApiPropertyOptional({ example: '#3B82F6' })
  @IsOptional()
  @IsString()
  primaryColor?: string;

  @ApiPropertyOptional({ enum: ChatbotStatus })
  @IsOptional()
  @IsEnum(ChatbotStatus)
  status?: ChatbotStatus;
}
