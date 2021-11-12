import { Injectable } from '@nestjs/common';
import { TagColorRepository } from 'src/repositories/tag-color.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { TagColorRequestDto } from './dto/tag-color.request.dto';
import { TagRequestDto } from './dto/tag.request.dto';
import { TagResponseDto } from './dto/tag.response.dto';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly tagColorRepository: TagColorRepository,
    private readonly userRepository: UserRepository,
    private readonly userTagRepository: UserTagRepository
  ) {}

  async getTagColors() {
    return await this.tagColorRepository.find();
  }

  async createTag(tagRequestDto: TagRequestDto): Promise<TagResponseDto> {
    const tag = await this.tagRepository.findOneByName(tagRequestDto.name);
    if (!tag) {
      return TagResponseDto.ofTag(
        await this.tagRepository.save({
          name: tagRequestDto.name,
        })
      );
    }
    return TagResponseDto.ofTag(tag);
  }

  async createTagWithColor(userId: number, tagColorRequestDto: TagColorRequestDto): Promise<TagResponseDto> {
    const user = await this.userRepository.findOne(userId);
    const tag = await this.tagRepository.findOneByName(tagColorRequestDto.name);
    const tagColor = await this.tagColorRepository.findOne(tagColorRequestDto.tagColorId);
    if (!tag) {
      await this.tagRepository.save({
        name: tagColorRequestDto.name,
      })
      await this.userTagRepository.save({
        userId: user.id,
        tagId: tag.id,
        tagColorId: tagColor.id
      })
      return TagResponseDto.ofTagColor(tag, tagColor);
    } else {
      await this.userTagRepository.save({
        userId: user.id,
        tagId: tag.id,
        tagColorId: tagColor.id
      })
      return TagResponseDto.ofTagColor(tag, tagColor);
    }
  }
}
