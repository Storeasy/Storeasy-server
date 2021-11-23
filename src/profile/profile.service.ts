import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { LikeUserRepository } from 'src/repositories/like-user.repository';
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
    private readonly profileRepository: ProfileRepository,
    private readonly likeUserRepository: LikeUserRepository,
  ) {}

  async getRecommendTags(): Promise<TagResponseDto[]> {
    const recommendTags = await this.recommendTagRepository.findAll();
    return await Promise.all(
      recommendTags.map((recommendTag) => {
        return TagResponseDto.ofTag(recommendTag.tag);
      }),
    );
  }

  async createProfileTags(
    userId: number,
    createProfileTagRequestDto: CreateProfileTagRequestDto,
  ) {
    const user = await this.userRepository.findOne(userId);
    const tags = await this.tagRepository.findByIds(
      createProfileTagRequestDto.tags,
    );

    await Promise.all(
      tags.map((tag, i) => {
        this.profileTagRepository.save({
          user: user,
          tag: tag,
          orderNum: i + 1,
        });
      }),
    );
  }

  // 본인 프로필 조회
  async getMyProfile(userId: number) {
    const profile = await this.profileRepository.findOne(userId);
    const profileTags = await this.profileTagRepository.findAllByUserIdJoinTag(userId);
    const tags = profileTags.map(profileTag => profileTag.tag);

    return ProfileResponseDto.ofMyProfile(profile, tags);
  }

  // 프로필 조회
  async getProfile(currentUserId: number, userId: number) {
    const profile = await this.profileRepository.findOne(userId);
    if (!profile) {
      throw new NotFoundException(ResponseStatus.PROFILE_NOT_FOUND);
    }
    if (!profile.isPublic) {
      throw new ForbiddenException(ResponseStatus.PROFILE_IS_NOT_PUBLIC);
    }

    const isLiked = await this.likeUserRepository.existsBySenderAndReceiver(currentUserId, userId);

    const profileTags = await this.profileTagRepository.findAllByUserIdJoinTag(userId);
    const tags = profileTags.map(profileTag => profileTag.tag);
    
    return ProfileResponseDto.ofProfile(profile, isLiked, tags);
  }

  async updateProfile(
    userId: number,
    updateProfileRequestDto: UpdateProfileRequestDto,
  ) {
    if (updateProfileRequestDto.tagIds) {
      const { tagIds, ...newDto } = updateProfileRequestDto;
      await this.profileRepository.update(userId, newDto);

      await this.profileTagRepository.deleteAllByUserId(userId);
      const user = await this.userRepository.findOne(userId);
      const tagIdsNum = updateProfileRequestDto.tagIds;
      const tags = await this.tagRepository.findByIds(tagIdsNum);
      await Promise.all(
        tags.map((tag, i) => {
          this.profileTagRepository.save({
            user: user,
            tag: tag,
            orderNum: i + 1,
          });
        }),
      );
    } else {
      await this.profileRepository.update(userId, updateProfileRequestDto);
    }
  }
}
