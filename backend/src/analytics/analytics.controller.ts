import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/auth.types';

@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get analytics overview' })
  getOverview(@CurrentUser() user: JwtPayload) {
    return this.analyticsService.getOverview(user);
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Get conversation analytics' })
  getConversations(@CurrentUser() user: JwtPayload) {
    return this.analyticsService.getConversations(user);
  }

  @Get('top-questions')
  @ApiOperation({ summary: 'Get top visitor questions' })
  getTopQuestions(@CurrentUser() user: JwtPayload) {
    return this.analyticsService.getTopQuestions(user);
  }
}
