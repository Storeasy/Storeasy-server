import { Injectable } from '@nestjs/common';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userTagRepository: UserTagRepository) {}

  async getMyTags(userId: number) {
    const userTags = await this.userTagRepository.findAllByUserId(userId);
    return userTags.map((userTag) => {
      return TagResponseDto.ofTagColor(userTag.tag, userTag.tagColor);
    });
  }

  async getTags(userId: number) {
    const userTags = await this.userTagRepository.findAllByUserId(userId);
    return userTags.map((userTag) => {
      return TagResponseDto.ofTag(userTag.tag);
    });
  }
}
