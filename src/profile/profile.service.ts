import { Injectable } from '@nestjs/common';
import { RecommendTag } from 'src/entities/RecommendTag';
import { profileRepository } from 'src/repositories/profile.repository';
import { RecommendTagRepository } from 'src/repositories/recommend-tag.repository';
import { TagResponseDto } from './dto/tag.response.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly recommendTagRepository: RecommendTagRepository,
    private readonly profileRepository: profileRepository
  ) {}

  async getRecommendTags(): Promise<TagResponseDto[]> {
    const recommendTags = await this.recommendTagRepository.findAll();
    return await Promise.all(
      recommendTags.map((recommendTag) => {
        return TagResponseDto.ofRecommendTag(recommendTag);
      })
    );
  }
}
