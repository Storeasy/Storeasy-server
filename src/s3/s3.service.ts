import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

@Injectable()
export class S3Service {
  constructor() {}

  public async uploadProfileImage(
    userId: number,
    profileImage: Express.Multer.File,
  ) {
    return await s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: profileImage.buffer,
        Key: `profileImages/${uuidv4()}-${userId}${extname(
          profileImage.originalname,
        )}`,
      })
      .promise();
  }

  public async uploadPageImages(
    userId: number,
    pageImages: Express.Multer.File[],
  ) {
    return pageImages.map((pageImage) => {
      return s3
        .upload({
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Body: pageImage.buffer,
          Key: `pageImages/${uuidv4()}-${userId}${extname(
            pageImage.originalname,
          )}`,
        })
        .promise();
    });
  }
}
