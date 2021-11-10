import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/entities/Profile';
import { RecommendTag } from 'src/entities/RecommendTag';
import { Tag } from 'src/entities/Tag';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { RecommendTagRepository } from 'src/repositories/recommend-tag.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Profile,
      Tag,
      RecommendTag,
      RecommendTagRepository,
      UserRepository,
      ProfileRepository,
      TagRepository,
      ProfileTagRepository,
    ]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService]
})
export class ProfileModule {}