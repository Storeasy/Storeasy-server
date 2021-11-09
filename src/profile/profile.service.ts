import { Injectable } from '@nestjs/common';
import { profile } from 'console';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { RecommendTagRepository } from 'src/repositories/recommend-tag.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { TagResponseDto } from '../tag/dto/tag.response.dto';
import { CreateProfileTagRequestDto } from './dto/create-profile-tag.request.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly recommendTagRepository: RecommendTagRepository,
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly tagRepository: TagRepository,
    private readonly profileTagRepository: ProfileTagRepository,
  ) {}

  async getRecommendTags(): Promise<TagResponseDto[]> {
    const recommendTags = await this.recommendTagRepository.findAll();
    return await Promise.all(
      recommendTags.map((recommendTag) => {
        return TagResponseDto.ofRecommendTag(recommendTag);
      })
    );
  }

  async createProfileTags(userId: string, createProfileTagRequestDto: CreateProfileTagRequestDto) {
    const user = await this.userRepository.findOne(parseInt(userId));
    const tags = await this.tagRepository.findByIds(createProfileTagRequestDto.tags);

    await Promise.all(
      tags.map((tag, i) => {
        this.profileTagRepository.save({
          user: user,
          tag: tag,
          orderNum: i+1,
        });
      })
    );
  }
}
