import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CompanyRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { successResponse } from '../common/utils';
import type { JwtPayload } from '../auth/auth.types';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyCompany(user: JwtPayload) {
    const company = await this.prisma.company.findUnique({
      where: { id: user.companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return successResponse('Company retrieved', company);
  }

  async updateMyCompany(user: JwtPayload, dto: UpdateCompanyDto) {
    if (user.companyRole !== CompanyRole.OWNER) {
      throw new ForbiddenException('Insufficient permissions');
    }

    const company = await this.prisma.company.update({
      where: { id: user.companyId },
      data: dto,
    });

    return successResponse('Company updated', company);
  }
}
