import { CompanyRole } from '@prisma/client';

export interface JwtPayload {
  userId: string;
  email: string;
  companyId: string;
  companyRole: CompanyRole;
}
