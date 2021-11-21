import {
  Body,
  Controller,
  Delete,
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
import { PageService } from './page.service';
import { ResponseStatus } from 'src/config/res/response-status';
import { CreatePageRequestDto } from './dto/create-page.request.dto';
import { ResponseEntity } from 'src/config/res/response-entity';
import { UpdatePageRequestDto } from './dto/update-page.request.dto';
import { PageResponseDto } from './dto/page.response.dto';

@ApiTags('페이지')
@Controller('api/page')
export class PageController {
  constructor(
    private readonly pageService: PageService,
  ) {}

  @ApiOperation({ summary: '페이지 생성' })
  @ApiCreatedResponse()
  @Post()
  async createPage(
    @Req() req,
    @Body() createPageRequestDto: CreatePageRequestDto,
  ) {
    await this.pageService.createPage(req.user.userId, createPageRequestDto);
    return ResponseEntity.OK(ResponseStatus.CREATE_PAGE_SUCCESS);
  }

  @ApiOperation({ summary: '페이지 수정' })
  @ApiCreatedResponse()
  @Post(':pageId')
  async updatePage(
    @Req() req,
    @Param('pageId') pageId: number,
    @Body() updatePageRequestDto: UpdatePageRequestDto,
  ) {
    await this.pageService.updatePage(
      req.user.userId,
      pageId,
      updatePageRequestDto,
    );
    return ResponseEntity.OK(ResponseStatus.UPDATE_PAGE_SUCCESS);
  }

  @ApiOperation({ summary: '페이지 삭제' })
  @ApiOkResponse()
  @Delete(':pageId')
  async deletePage(@Req() req, @Param('pageId') pageId: number) {
    await this.pageService.deletePage(req.user.userId, pageId);
    return ResponseEntity.OK(ResponseStatus.DELETE_PAGE_SUCCESS);
  }

  @ApiOperation({ summary: '페이지 상세 조회' })
  @ApiOkResponse({ type: PageResponseDto })
  @Get(':pageId')
  async getPage(@Req() req, @Param('pageId') pageId: number) {
    const data = await this.pageService.getPage(req.user.userId, pageId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_PAGE_SUCCESS, data);
  }
}
