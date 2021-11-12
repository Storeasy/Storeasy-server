import { Injectable } from '@nestjs/common';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { CreatePageRequestDto } from './dto/create-page.request.dto';

@Injectable()
export class PageService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly pageImageRepository: PageImageRepository,
    private readonly pageTagRepository: PageTagRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async createPageWithImage(userId: number, pageImages: string[], createPageRequestDto: CreatePageRequestDto) {
    const page = this.pageRepository.create(createPageRequestDto);
    page.userId = userId;

    await this.pageRepository.save(page);

    pageImages.map((pageImage, i) => {
      this.pageImageRepository.save({
        page: page,
        imageUrl: pageImage,
        orderNum: i+1
      })
    })

    const tagIdsStr = createPageRequestDto.tagIds.substring(1, createPageRequestDto.tagIds.length-1).split(',');
    const tagIdsNum = tagIdsStr.map((tagIds) => +tagIds);
    const tags = await this.tagRepository.findByIds(tagIdsNum);
    await Promise.all(
      tags.map((tag, i) => {
        this.pageTagRepository.save({
          page: page,
          tag: tag,
          orderNum: i+1
        });
      })
    );
  }

    
  async createPage(userId: number, createPageRequestDto: CreatePageRequestDto) {
    const page = this.pageRepository.create(createPageRequestDto);
    page.userId = userId;

    await this.pageRepository.save(page);

    const tagIdsStr = createPageRequestDto.tagIds.substring(1, createPageRequestDto.tagIds.length-1).split(',');
    const tagIdsNum = tagIdsStr.map((tagIds) => +tagIds);
    const tags = await this.tagRepository.findByIds(tagIdsNum);
    await Promise.all(
      tags.map((tag, i) => {
        this.pageTagRepository.save({
          page: page,
          tag: tag,
          orderNum: i+1
        });
      })
    );
  }
}
