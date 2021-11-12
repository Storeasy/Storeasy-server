import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { create } from 'domain';
import { ResponseStatus } from 'src/config/res/response-status';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { CreatePageRequestDto } from './dto/create-page.request.dto';
import { PageResponseDto } from './dto/page.response.dto';
import { UpdatePageRequestDto } from './dto/update-page.request.dto';

@Injectable()
export class PageService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly pageImageRepository: PageImageRepository,
    private readonly pageTagRepository: PageTagRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  async createPageWithImage(userId: number, pageImages: string[], createPageRequestDto: CreatePageRequestDto) {
    console.log(createPageRequestDto);
    const { tagIds, ...newDto } = createPageRequestDto;
    console.log(newDto);
    const page = this.pageRepository.create(newDto);
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
    console.log(tagIdsNum);
    const tags = await this.tagRepository.findByIds(tagIdsNum);
    console.log(tags);
    await Promise.all(
      tags.map((tag, i) => {
        this.pageTagRepository.save({
          pageId: page.id,
          tagId: tag.id,
          orderNum: i+1,
        });
      })
    );
  }
    
  async createPage(userId: number, createPageRequestDto: CreatePageRequestDto) {
    console.log(createPageRequestDto);
    const { tagIds, ...newDto } = createPageRequestDto;
    console.log(newDto);
    const page = this.pageRepository.create(newDto);
    page.userId = userId;

    await this.pageRepository.save(page);

    const tagIdsStr = createPageRequestDto.tagIds.substring(1, createPageRequestDto.tagIds.length-1).split(',');
    const tagIdsNum = tagIdsStr.map((tagIds) => +tagIds);
    console.log(tagIdsNum);
    const tags = await this.tagRepository.findByIds(tagIdsNum);
    console.log(tags);
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

  async updatePageWithImage(userId: number, pageId: number, pageImages: string[], updatePageRequestDto: UpdatePageRequestDto) {
    const page = await this.pageRepository.findOne(pageId);

    if (!page) {
      throw new NotFoundException(ResponseStatus.PAGE_NOT_FOUND);
    }
    if (page.userId != userId) {
      throw new ForbiddenException(ResponseStatus.UPDATE_PAGE_FAIL_FORBIDDEN);
    }

    if (updatePageRequestDto.tagIds) {
      await this.pageImageRepository.deleteAllByPageId(pageId);
      pageImages.map((pageImage, i) => {
        this.pageImageRepository.save({
          page: page,
          imageUrl: pageImage,
          orderNum: i+1
        })
      })
  
      await this.pageTagRepository.deleteAllByPageId(pageId);
      const tagIdsStr = updatePageRequestDto.tagIds.substring(1, updatePageRequestDto.tagIds.length-1).split(',');
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

      const {tagIds, ...newDto} = updatePageRequestDto;
      await this.pageRepository.update(page, newDto);
    } else {
      await this.pageImageRepository.deleteAllByPageId(pageId);
      pageImages.map((pageImage, i) => {
        this.pageImageRepository.save({
          page: page,
          imageUrl: pageImage,
          orderNum: i+1
        })
      })

      const {tagIds, ...newDto} = updatePageRequestDto;
      await this.pageRepository.update(page, newDto);
    }
  }

  async updatePage(userId: number, pageId: number, updatePageRequestDto: UpdatePageRequestDto) {
    const page = await this.pageRepository.findOne(pageId);

    if (!page) {
      throw new NotFoundException(ResponseStatus.PAGE_NOT_FOUND);
    }
    if (page.userId != userId) {
      throw new ForbiddenException(ResponseStatus.UPDATE_PAGE_FAIL_FORBIDDEN);
    }

    if (updatePageRequestDto.tagIds) {
      await this.pageTagRepository.deleteAllByPageId(pageId);
      const tagIdsStr = updatePageRequestDto.tagIds.substring(1, updatePageRequestDto.tagIds.length-1).split(',');
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

      const {tagIds, ...newDto} = updatePageRequestDto;
      await this.pageRepository.update(page, newDto);
    } else {
      const {tagIds, ...newDto} = updatePageRequestDto;
      await this.pageRepository.update(page, newDto);
    }
  }

  async deletePage(userId: number, pageId: number) {
    const page = await this.pageRepository.findOne(pageId);
    if (!page) {
      throw new NotFoundException(ResponseStatus.PAGE_NOT_FOUND);
    }
    if (page.userId != pageId) {
      throw new ForbiddenException(ResponseStatus.DELETE_PAGE_FAIL_FORBIDDEN);
    }

    await this.pageRepository.delete(page);
  }

  async getPage(pageId: number) {
    const page = await this.pageRepository.findOneByPageId(pageId);
    const pageImages = await this.pageImageRepository.findAllByPageId(pageId);
    const pageTags = await this.pageTagRepository.findAllJoinQuery(pageId);
    
    return PageResponseDto.ofPage(page, pageImages, pageTags);
  }
}
