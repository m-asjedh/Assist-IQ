import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV?: Environment;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  DIRECT_URL: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsOptional()
  JWT_EXPIRES_IN?: string;

  @IsString()
  @IsNotEmpty()
  SUPABASE_URL: string;

  @IsString()
  @IsNotEmpty()
  SUPABASE_SERVICE_ROLE_KEY: string;

  @IsString()
  @IsOptional()
  SUPABASE_STORAGE_BUCKET?: string;

  @IsString()
  @IsNotEmpty()
  OPENROUTER_API_KEY: string;

  @IsString()
  @IsOptional()
  OPENROUTER_BASE_URL?: string;

  @IsString()
  @IsOptional()
  OPENROUTER_CHAT_MODEL?: string;

  @IsString()
  @IsOptional()
  OPENROUTER_EMBEDDING_MODEL?: string;

  @IsOptional()
  MAX_FILE_SIZE_MB?: number;

  @IsUrl({ require_tld: false })
  @IsOptional()
  FRONTEND_URL?: string;

  @IsOptional()
  PORT?: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
