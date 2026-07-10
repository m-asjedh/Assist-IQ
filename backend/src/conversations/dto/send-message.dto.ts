import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({ example: 'What are your business hours?' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
