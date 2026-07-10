import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly client: SupabaseClient;
  private readonly bucket: string;

  constructor(private readonly configService: ConfigService) {
    const url = this.configService.getOrThrow<string>('SUPABASE_URL');
    const serviceRoleKey = this.configService.getOrThrow<string>(
      'SUPABASE_SERVICE_ROLE_KEY',
    );

    this.bucket =
      this.configService.get<string>('SUPABASE_STORAGE_BUCKET') ??
      'assist-iq-documents';

    this.client = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  getBucketName(): string {
    return this.bucket;
  }

  async ensureBucket(): Promise<void> {
    const { data: buckets } = await this.client.storage.listBuckets();
    const exists = buckets?.some((b) => b.name === this.bucket);

    if (!exists) {
      const { error } = await this.client.storage.createBucket(this.bucket, {
        public: false,
        fileSizeLimit: 10 * 1024 * 1024,
      });

      if (error && !error.message.includes('already exists')) {
        throw new Error(`Failed to create storage bucket: ${error.message}`);
      }
    }
  }

  async uploadFile(
    path: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<{ path: string }> {
    await this.ensureBucket();

    const { data, error } = await this.client.storage
      .from(this.bucket)
      .upload(path, buffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    return { path: data.path };
  }

  async downloadFile(path: string): Promise<Buffer> {
    const { data, error } = await this.client.storage
      .from(this.bucket)
      .download(path);

    if (error || !data) {
      throw new Error(`Failed to download file: ${error?.message}`);
    }

    const arrayBuffer = await data.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async deleteFile(path: string): Promise<void> {
    const { error } = await this.client.storage
      .from(this.bucket)
      .remove([path]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  async getSignedUrl(path: string, expiresIn = 3600): Promise<string> {
    const { data, error } = await this.client.storage
      .from(this.bucket)
      .createSignedUrl(path, expiresIn);

    if (error || !data?.signedUrl) {
      throw new Error(`Failed to create signed URL: ${error?.message}`);
    }

    return data.signedUrl;
  }
}
