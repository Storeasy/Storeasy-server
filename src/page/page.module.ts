import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
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
      LikePageRepository,
      UserTagRepository,
      ProfileRepository,
    ]),
  ],
  controllers: [PageController],
  providers: [PageService, S3Service],
})
export class PageModule {}
