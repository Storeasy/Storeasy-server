import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { S3Service } from 'src/s3/s3.service';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PageRepository,
      PageImageRepository,
      PageTagRepository,
      TagRepository,
    ]),
  ],
  controllers: [PageController],
  providers: [PageService, S3Service],
})
export class PageModule {}
