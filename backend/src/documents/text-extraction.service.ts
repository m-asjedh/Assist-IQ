import { Injectable } from '@nestjs/common';
import { PDFParse } from 'pdf-parse';
import * as mammoth from 'mammoth';

@Injectable()
export class TextExtractionService {
  async extractText(buffer: Buffer, fileType: string): Promise<string> {
    switch (fileType) {
      case 'pdf':
        return this.extractPdf(buffer);
      case 'txt':
        return buffer.toString('utf-8');
      case 'docx':
        return this.extractDocx(buffer);
      default:
        throw new Error(`Unsupported file type: ${fileType}`);
    }
  }

  private async extractPdf(buffer: Buffer): Promise<string> {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    await parser.destroy();
    return result.text;
  }

  private async extractDocx(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
}
