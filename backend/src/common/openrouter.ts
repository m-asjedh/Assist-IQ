import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export function createOpenRouterClient(configService: ConfigService): OpenAI {
  const frontendUrl = configService.get<string>('FRONTEND_URL');

  return new OpenAI({
    apiKey: configService.getOrThrow<string>('OPENROUTER_API_KEY'),
    baseURL:
      configService.get<string>('OPENROUTER_BASE_URL') ?? OPENROUTER_BASE_URL,
    defaultHeaders: {
      ...(frontendUrl ? { 'HTTP-Referer': frontendUrl } : {}),
      'X-OpenRouter-Title': 'Assist IQ',
    },
  });
}
