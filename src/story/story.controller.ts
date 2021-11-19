import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { StoryResponseDto } from './dto/story.response.dto';
import { StoryService } from './story.service';

@ApiTags('스토리')
@Controller('api/story')
export class StoryController {
  constructor(
    private readonly storyService: StoryService,
  ) {}

  @ApiOperation({ summary: '본인 스토리 조회' })
  @ApiOkResponse()
  @Get()
  async getMyStory(@Req() req) {
    const data = await this.storyService.getStory(req.user.userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_STORY_SUCCESS, data);
  }

  @ApiOperation({ summary: '스토리 조회' })
  @ApiOkResponse()
  @Get(':userId')
  async getStory(@Param('userId') userId: number) {
    const data = await this.storyService.getStory(userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_STORY_SUCCESS, data);
  }
}
