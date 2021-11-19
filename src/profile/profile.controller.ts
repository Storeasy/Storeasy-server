import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { TagResponseDto } from '../tag/dto/tag.response.dto';
import { CreateProfileTagRequestDto } from './dto/create-profile-tag.request.dto';
import { ProfileResponseDto } from './dto/profile.response.dto';
import { ProfileService } from './profile.service';
import { UpdateProfileRequestDto } from './dto/update-profile.request.dto';
import { S3Service } from 'src/s3/s3.service';

@ApiTags('프로필')
@Controller('api/profile')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
  ) {}

  @ApiOperation({ summary: '추천 태그 목록 조회' })
  @ApiOkResponse({ type: TagResponseDto })
  @Get('tags/recommend')
  async getRecommendTags(): Promise<ResponseEntity<TagResponseDto[]>> {
    const data = await this.profileService.getRecommendTags();
    return ResponseEntity.OK_WITH(
      ResponseStatus.READ_ALL_RECOMMEND_TAGS_SUCCESS,
      data,
    );
  }

  @ApiOperation({ summary: '프로필 태그 설정' })
  @ApiCreatedResponse()
  @Post('tags')
  async createProfileTags(
    @Req() req,
    @Body() createProfileTagRequestDto: CreateProfileTagRequestDto,
  ) {
    await this.profileService.createProfileTags(
      req.user.userId,
      createProfileTagRequestDto,
    );
    return ResponseEntity.OK(ResponseStatus.CREATE_PROFILE_TAG_SUCCESS);
  }

  @ApiOperation({ summary: '본인 프로필 조회' })
  @ApiOkResponse({ type: ProfileResponseDto })
  @Get()
  async getMyProfile(@Req() req) {
    const data = await this.profileService.getProfile(req.user.userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_PROFILE_SUCCESS, data);
  }

  @ApiOperation({ summary: '프로필 조회' })
  @ApiOkResponse({ type: ProfileResponseDto })
  @Get(':userId')
  async getProfile(@Param('userId') userId: number) {
    const data = await this.profileService.getProfile(userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_PROFILE_SUCCESS, data);
  }

  @ApiOperation({ summary: '프로필 수정' })
  @ApiCreatedResponse()
  @Post()
  async updateProfile(
    @Req() req,
    @Body() updateProfileRequestDto: UpdateProfileRequestDto,
  ) {
    await this.profileService.updateProfile(
      req.user.userId,
      updateProfileRequestDto,
    );
    return ResponseEntity.OK(ResponseStatus.UPDATE_PROFILE_SUCCESS);
  }
}
