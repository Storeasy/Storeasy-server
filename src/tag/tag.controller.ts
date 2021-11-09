import { Body, Controller, Post } from '@nestjs/common';
import { ResponseEntity } from 'src/config/res/response-entity';
import { ResponseStatus } from 'src/config/res/response-status';
import { TagRequestDto } from './dto/tag.request.dto';
import { TagResponseDto } from './dto/tag.response.dto';
import { TagService } from './tag.service';

@Controller('api/tags')
export class TagController {
  constructor(
    private tagService: TagService
  ) {}

  @Post()
  async createTag(@Body() tagRequestDto: TagRequestDto): Promise<ResponseEntity<TagResponseDto>> {
    const data = await this.tagService.createTag(tagRequestDto);
    return ResponseEntity.OK_WITH(ResponseStatus.CREATE_TAG_SUCCESS, data);
  }
}
