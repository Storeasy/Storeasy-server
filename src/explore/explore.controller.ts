import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { ExploreService } from './explore.service';

@ApiTags('탐색')
@Controller('api/explore')
export class ExploreController {
  constructor(
    private readonly exploreService: ExploreService,
  ) {}

  @ApiOperation({ summary: '스토리지 템플릿 목록 조회' })
  @ApiOkResponse()
  @Get('storeasy')
  async getStoreasyTemplates() {
    const data = await this.exploreService.getStoreasyTemplates();
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_STOREASY_TEMPLATES_SUCCESS, data);
  }

  @ApiOperation({ summary: '스토리지 템플릿 목록 조회' })
  @ApiOkResponse()
  @Get('storeasy/:pageId')
  async getStoreasyTemplate(@Req() req, @Param('pageId') pageId: number) {
    const data = await this.exploreService.getStoreasyTemplate(req.user.userId, pageId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_STOREASY_TEMPLATE_SUCCESS, data);
  }

  @ApiOperation({ summary: '추천 페이지 목록 조회' })
  @ApiOkResponse()
  @Get('page/recommend')
  async getRecommendPages(@Req() req) {
    const data = await this.exploreService.getRecommendPages(req.user.userId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_RECOMMEND_PAGES_SUCCESS, data);
  }

  @ApiOperation({ summary: '태그별 페이지 검색' })
  @ApiOkResponse()
  @Get('page')
  async searchPagesByTag(@Req() req, @Query('tag') tag: string) {
    const data = await this.exploreService.searchPagesByTag(req.user.userId, tag);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_EXPLORE_PAGES_SUCCESS, data)
  }

  @ApiOperation({ summary: '태그별 페이지 검색' })
  @ApiOkResponse()
  @Get('user')
  async searchUsersByTag(@Req() req, @Query('tag') tag: string) {
    const data = await this.exploreService.searchUsersByTag(tag);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_EXPLORE_USERS_SUCCESS, data)
  }

  @ApiOperation({ summary: '탐색 페이지 상세 조회' })
  @ApiOkResponse()
  @Get('page/:pageId')
  async getPage(@Req() req, @Param('pageId') pageId: number) {
    const data = await this.exploreService.getPage(req.user.userId, pageId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_EXPLORE_PAGE_SUCCESS, data);
  }
}
