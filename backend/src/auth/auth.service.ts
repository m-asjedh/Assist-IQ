import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ChatbotStatus, CompanyRole } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { JwtPayload } from './auth.types';
import { generateUniqueSlug, successResponse } from '../common/utils';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const slug = await generateUniqueSlug(dto.companyName, async (s) => {
      const company = await this.prisma.company.findUnique({
        where: { slug: s },
      });
      return !!company;
    });

    const result = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          password: hashedPassword,
        },
      });

      const company = await tx.company.create({
        data: {
          name: dto.companyName,
          slug,
        },
      });

      await tx.companyMember.create({
        data: {
          userId: user.id,
          companyId: company.id,
          role: CompanyRole.OWNER,
        },
      });

      const chatbot = await tx.chatbot.create({
        data: {
          companyId: company.id,
          name: 'Support Bot',
          welcomeMessage: 'Hi! How can I help you today?',
          tone: 'professional',
          primaryColor: '#3B82F6',
          status: ChatbotStatus.ACTIVE,
        },
      });

      return { user, company, chatbot };
    });

    const token = this.signToken({
      userId: result.user.id,
      email: result.user.email,
      companyId: result.company.id,
      companyRole: CompanyRole.OWNER,
    });

    return successResponse('Registration successful', {
      token,
      user: this.usersService.sanitizeUser(result.user),
      company: result.company,
      chatbot: result.chatbot,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        memberships: {
          include: { company: true },
          orderBy: { createdAt: 'asc' },
          take: 1,
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const membership = user.memberships[0];
    if (!membership) {
      throw new UnauthorizedException('No company membership found');
    }

    const token = this.signToken({
      userId: user.id,
      email: user.email,
      companyId: membership.companyId,
      companyRole: membership.role,
    });

    return successResponse('Login successful', {
      token,
      user: this.usersService.sanitizeUser(user),
      company: membership.company,
      companyRole: membership.role,
    });
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);
    const membership = await this.prisma.companyMember.findFirst({
      where: { userId },
      include: { company: true },
      orderBy: { createdAt: 'asc' },
    });

    return successResponse('Profile retrieved', {
      user,
      company: membership?.company ?? null,
      companyRole: membership?.role ?? null,
    });
  }

  private signToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
