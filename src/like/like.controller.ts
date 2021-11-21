import { Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
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
    await this.likeService.likeUser(req.user.userId, userId);
    return ResponseEntity.OK(ResponseStatus.LIKE_USER_SUCCESS);
  }

  @ApiOperation({ summary: '페이지 좋아요' })
  @ApiCreatedResponse()
  @Post('page/:pageId')
  async likePage(@Req() req, @Param('pageId') pageId: number) {
    await this.likeService.likePage(req.user.userId, pageId);
    return ResponseEntity.OK(ResponseStatus.LIKE_PAGE_SUCCESS);
  }

  @ApiOperation({ summary: '좋아요한 사용자 목록 조회'})
  @ApiOkResponse()
  @Get('user')
  async getLikeUsers(@Req() req) {
    const data = await this.likeService.getLikeUsers(req.user.userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_LIKE_USERS_SUCCESS, data);
  }

  @ApiOperation({ summary: '좋아요한 페이지 목록 조회'})
  @ApiOkResponse()
  @Get('page')
  async getLikePages(@Req() req) {
    const data = await this.likeService.getLikePsges(req.user.userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_LIKE_PAGES_SUCCESS, data);
  }
}
