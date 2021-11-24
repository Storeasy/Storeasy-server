import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { ExploreController } from './explore.controller';
import { ExploreService } from './explore.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PageRepository,
      PageImageRepository,
      PageTagRepository,
      LikePageRepository,
      ProfileRepository,
      ProfileTagRepository,
      TagRepository,
    ]),
  ],
  controllers: [ExploreController],
  providers: [ExploreService]
})
export class ExploreModule {}
