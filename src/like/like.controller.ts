import { Controller, Param, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LikeService } from './like.service';

@ApiTags('좋아요')
@Controller('api/like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
  ) {}

  @ApiOperation({ summary: '사용자 좋아요' })
  @ApiCreatedResponse()
  @Post('user/:userId')
  async likeUser(@Req() req, @Param('userId') userId: number) {

  }

  @ApiOperation({ summary: '페이지 좋아요' })
  @ApiCreatedResponse()
  @Post('page/:pageId')
  async likePage(@Req() req, @Param('pageId') pageId: number) {

  }
}
