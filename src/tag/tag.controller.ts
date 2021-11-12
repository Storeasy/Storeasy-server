import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { TagColorRequestDto } from './dto/tag-color.request.dto';
import { TagColorResponseDto } from './dto/tag-color.response.dto';
import { TagRequestDto } from './dto/tag.request.dto';
import { TagResponseDto } from './dto/tag.response.dto';
import { TagService } from './tag.service';

@ApiTags('태그')
@Controller('api/tags')
export class TagController {
  constructor(
    private tagService: TagService
  ) {}

  @ApiOperation({ summary: "태그색 목록 조회" })
  @ApiOkResponse({ type: TagColorResponseDto })
  @Get('colors')
  async getTagColors() {
    const data = this.tagService.getTagColors();
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_TAG_COLORS_SUCCESS, data);
  }

  @ApiOperation({ summary: "태그 등록" })
  @ApiCreatedResponse({ type: TagResponseDto })
  @Post()
  async createTag(@Body() tagRequestDto: TagRequestDto): Promise<ResponseEntity<TagResponseDto>> {
    const data = await this.tagService.createTag(tagRequestDto);
    return ResponseEntity.OK_WITH(ResponseStatus.CREATE_TAG_SUCCESS, data);
  }

  @ApiOperation({ summary: "태그 등록 With Color" })
  @ApiCreatedResponse({ type: TagResponseDto })
  @Post('color')
  async createTagWithColor(@Req() req, @Body() tagColorRequestDto: TagColorRequestDto): Promise<ResponseEntity<TagResponseDto>> {
    const data = await this.tagService.createTagWithColor(req.user.userId, tagColorRequestDto);
    return ResponseEntity.OK_WITH(ResponseStatus.CREATE_TAG_SUCCESS, data);
  }
}
