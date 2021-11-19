import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';
import { StoryResponseDto } from './dto/story.response.dto';
import { UserService } from './user.service';

@ApiTags('홈')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '본인 태그 목록 조회' })
  @ApiOkResponse({ type: TagResponseDto })
  @Get('tags')
  async getMyTags(@Req() req) {
    const data = await this.userService.getMyTags(req.user.userId);
    return ResponseEntity.OK_WITH(
      ResponseStatus.READ_ALL_USER_TAG_SUCCESS,
      data,
    );
  }

  @ApiOperation({ summary: '태그 목록 조회' })
  @ApiOkResponse({ type: TagResponseDto })
  @Get(':userId/tags')
  async getTags(@Param('userId') userId: number) {
    const data = await this.userService.getTags(userId);
    return ResponseEntity.OK_WITH(
      ResponseStatus.READ_ALL_USER_TAG_SUCCESS,
      data,
    );
  }

  @ApiOperation({ summary: "본인 스토리 조회" })
  @ApiOkResponse()
  @Get('story')
  async getMyStory(@Req() req) {
    console.log(req.user);
    const data = await this.userService.getStory(req.user.userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_STORY_SUCCESS, data);
  }

  @ApiOperation({ summary: "스토리 조회" })
  @ApiOkResponse()
  @Get(':userId/story')
  async getStory(@Param('userId') userId: number) {
    const data = await this.userService.getStory(userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_STORY_SUCCESS, data);
  }
}
