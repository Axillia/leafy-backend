import { Injectable, Req, Res } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';
import * as path from 'path';

@Injectable()
export class UploadService {
  AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
    endpoint:
      'https://8c2366e8bb3a0811e2230fb8dd7beeb6.r2.cloudflarestorage.com',
  });

  upload = multer({
    storage: multerS3({
      s3: this.s3,
      bucket: this.AWS_S3_BUCKET_NAME,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      // acl: 'public-read',
      key: function (request, file, cb) {
        cb(null, `${file.originalname}`);
      },
    }),
  }).array('filepond', 1);

  async fileUpload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function (error) {
        if (error) {
          console.log(error);
          return res.status(500).json({
            success: false,
            error: 'Failed to upload image',
            url: null,
          });
        }
        return res.status(201).json({
          success: true,
          error: null,
          url: req.files[0].location,
        });
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        success: false,
        error: 'Failed to upload image',
        url: null,
      });
    }
  }
}
