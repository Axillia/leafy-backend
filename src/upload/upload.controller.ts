import { Controller, Post, Req, Res } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  async upload(@Req() req, @Res() res) {
    try {
      await this.uploadService.fileUpload(req, res);
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: 'Failed to upload image',
        url: null,
      });
    }
  }
}
