import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { TagResponseDto } from '../tag/dto/tag.response.dto';
import { CreateProfileTagRequestDto } from './dto/create-profile-tag.request.dto';
import { ProfileService } from './profile.service';

@ApiTags('프로필')
@Controller('api/profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService
  ) {}

  @ApiOperation({ description: '추천 태그 목록 조회' })
  @ApiOkResponse({ type: TagResponseDto })
  @Get('tags/recommend')
  async getRecommendTags(): Promise<ResponseEntity<TagResponseDto[]>> {
    const data = await this.profileService.getRecommendTags();
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_RECOMMEND_TAGS_SUCCESS, data);
  }

  @ApiOperation({ description: '프로필 태그 설정' })
  @ApiCreatedResponse()
  @Post('tags')
  async createProfileTags(@Req() req, @Body() createProfileTagRequestDto: CreateProfileTagRequestDto) {
    console.log(req.user);
    console.log(req.user.userId);

    await this.profileService.createProfileTags(req.user.userId, createProfileTagRequestDto);
    return ResponseEntity.OK(ResponseStatus.CREATE_PROFILE_TAG_SUCCESS);
  }
}
