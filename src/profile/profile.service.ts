import { Injectable } from '@nestjs/common';
import { OmitType } from '@nestjs/swagger';
import { Tag } from 'src/entities/Tag';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { RecommendTagRepository } from 'src/repositories/recommend-tag.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { TagResponseDto } from '../tag/dto/tag.response.dto';
import { CreateProfileTagRequestDto } from './dto/create-profile-tag.request.dto';
import { ProfileResponseDto } from './dto/profile.response.dto';
import { UpdateProfileRequestDto } from './dto/update-profile.request.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly recommendTagRepository: RecommendTagRepository,
    private readonly userRepository: UserRepository,
    private readonly tagRepository: TagRepository,
    private readonly profileTagRepository: ProfileTagRepository,
    private readonly profileRepository: ProfileRepository
  ) {}

  async getRecommendTags(): Promise<TagResponseDto[]> {
    const recommendTags = await this.recommendTagRepository.findAll();
    return await Promise.all(
      recommendTags.map((recommendTag) => {
        return TagResponseDto.ofTag(recommendTag.tag);
      })
    );
  }

  async createProfileTags(userId: number, createProfileTagRequestDto: CreateProfileTagRequestDto) {
    const user = await this.userRepository.findOne(userId);
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

  async getProfile(userId: number) {
    const profile = await this.profileRepository.findOneJoinUser(userId);
    const tags = await this.profileTagRepository.findAllJoinTag(userId);

    const resTags = await Promise.all(
      tags.map((profileTag) => {
        return TagResponseDto.ofTag(profileTag.tag);
      })
    )
  
    return ProfileResponseDto.ofProfile(profile, resTags);
  }

  async updateProfileWithImage(userId: number, profileImageUrl: string, updateProfileRequestDto: UpdateProfileRequestDto) {
    if (updateProfileRequestDto.tagIds) {
      await this.profileTagRepository.deleteAllByUserId(userId);
      const user = await this.userRepository.findOne(userId);
      const tagIdsStr = updateProfileRequestDto.tagIds.substring(1, updateProfileRequestDto.tagIds.length-1).split(',');
      const tagIdsNum = tagIdsStr.map((tagIds) => +tagIds);
      const tags = await this.tagRepository.findByIds(tagIdsNum);
      await Promise.all(
        tags.map((tag, i) => {
          this.profileTagRepository.save({
            user: user,
            tag: tag,
            orderNum: i+1,
          });
        })
      )

      updateProfileRequestDto.profileImage = profileImageUrl;
      const {tagIds, ...newDto} = updateProfileRequestDto;
      console.log(newDto);
      await this.profileRepository.update(userId, newDto);
    } else {
      updateProfileRequestDto.profileImage = profileImageUrl;
      await this.profileRepository.update(userId, updateProfileRequestDto);
    }
  }

  async updateProfile(userId: number, updateProfileRequestDto: UpdateProfileRequestDto) {
    if (updateProfileRequestDto.tagIds) {
      await this.profileTagRepository.deleteAllByUserId(userId);
      const user = await this.userRepository.findOne(userId);
      const tagIdsStr = updateProfileRequestDto.tagIds.substring(1, updateProfileRequestDto.tagIds.length-1).split(',');
      const tagIdsNum = tagIdsStr.map((tagIds) => +tagIds);
      const tags = await this.tagRepository.findByIds(tagIdsNum);
      await Promise.all(
        tags.map((tag, i) => {
          this.profileTagRepository.save({
            user: user,
            tag: tag,
            orderNum: i+1,
          });
        })
      )

      const {tagIds, ...newDto} = updateProfileRequestDto;
      await this.profileRepository.update(userId, newDto);
    } else {
      await this.profileRepository.update(userId, updateProfileRequestDto);
    }
  }
}
