import { ConflictException, Injectable } from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { tagColorRepository } from 'src/repositories/tag-color.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { TagRequestDto } from './dto/tag.request.dto';
import { TagResponseDto } from './dto/tag.response.dto';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly tagColorRepository: tagColorRepository,
  ) {}

  async createTag(tagReqeustDto: TagRequestDto): Promise<TagResponseDto> {
    const tag = await this.tagRepository.findOneByName(tagReqeustDto.name);
    if (!tag) {
      const tagColor = await this.tagColorRepository.getRandomOne();

      return TagResponseDto.ofTag(
        await this.tagRepository.save({
          name: tagReqeustDto.name,
          tagColor: tagColor
        })
      );
    }
    console.log(tag);
    return TagResponseDto.ofTag(tag);
  }
}
