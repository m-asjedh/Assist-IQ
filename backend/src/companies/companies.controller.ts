import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import type { JwtPayload } from '../auth/auth.types';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current company profile' })
  getMe(@CurrentUser() user: JwtPayload) {
    return this.companiesService.getMyCompany(user);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current company profile' })
  updateMe(@CurrentUser() user: JwtPayload, @Body() dto: UpdateCompanyDto) {
    return this.companiesService.updateMyCompany(user, dto);
  }
}
