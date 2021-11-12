import { Module } from '@nestjs/common';
import { S3Service } from 'src/s3/s3.service';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  controllers: [PageController],
  providers: [PageService, S3Service]
})
export class PageModule {}
