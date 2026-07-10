export function successResponse<T>(message: string, data: T) {
  return {
    success: true,
    message,
    data,
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function generateUniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>,
): Promise<string> {
  let slug = slugify(base);
  let counter = 0;

  while (await exists(slug)) {
    counter += 1;
    slug = `${slugify(base)}-${counter}`;
  }

  return slug;
}

export function chunkText(
  text: string,
  chunkSize = 900,
  overlap = 150,
): {
  content: string;
  metadata: { index: number; start: number; end: number };
}[] {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return [];

  const chunks: {
    content: string;
    metadata: { index: number; start: number; end: number };
  }[] = [];

  let start = 0;
  let index = 0;

  while (start < normalized.length) {
    const end = Math.min(start + chunkSize, normalized.length);
    const content = normalized.slice(start, end).trim();

    if (content) {
      chunks.push({
        content,
        metadata: { index, start, end },
      });
      index += 1;
    }

    if (end >= normalized.length) break;
    start = Math.max(end - overlap, start + 1);
  }

  return chunks;
}

export function formatVector(embedding: number[]): string {
  return `[${embedding.join(',')}]`;
}

export const ALLOWED_FILE_TYPES: Record<string, string> = {
  'application/pdf': 'pdf',
  'text/plain': 'txt',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    'docx',
};
