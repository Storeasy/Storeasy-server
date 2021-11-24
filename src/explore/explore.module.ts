import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { ExploreController } from './explore.controller';
import { ExploreService } from './explore.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PageRepository,
      ProfileRepository,
      PageImageRepository,
      PageTagRepository,
      ProfileTagRepository,
      LikePageRepository,
    ]),
  ],
  controllers: [ExploreController],
  providers: [ExploreService]
})
export class ExploreModule {}
