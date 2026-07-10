import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ConversationStatus } from '@prisma/client';

export class UpdateConversationStatusDto {
  @ApiProperty({ enum: ConversationStatus })
  @IsEnum(ConversationStatus)
  status: ConversationStatus;
}
