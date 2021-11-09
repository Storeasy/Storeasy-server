import { Controller, Get, Post } from '@nestjs/common';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { TagResponseDto } from './dto/tag.response.dto';
import { ProfileService } from './profile.service';

@Controller('api/profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService
  ) {}

  @Get('tags/recommend')
  async getRecommendTags() {
    const data = await this.profileService.getRecommendTags();
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_RECOMMEND_TAGS_SUCCESS, data);
  }
}
