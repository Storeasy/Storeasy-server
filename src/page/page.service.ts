import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
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
    private readonly likePageRepository: LikePageRepository,
    private readonly userTagRepository: UserTagRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  // 페이지 생성
  public async createPage(
    userId: number,
    createPageRequestDto: CreatePageRequestDto,
  ) {
    const { tagIds, pageImages, ...newDto } = createPageRequestDto;

    const page = this.pageRepository.create(newDto);
    page.userId = userId;
    await this.pageRepository.save(page);

    if (createPageRequestDto.tagIds) {
      const tagIdsNum = createPageRequestDto.tagIds;
      const tags = await this.tagRepository.findByIds(tagIdsNum);
      await Promise.all(
        tags.map((tag, i) => {
          this.pageTagRepository.save({
            pageId: page.id,
            tagId: tag.id,
            orderNum: i + 1,
          });
        }),
      );
    }

    if (createPageRequestDto.pageImages) {
      for (const [i, v] of createPageRequestDto.pageImages.entries()) {
        await this.pageImageRepository.save({
          page: page,
          imageUrl: v,
          orderNum: i + 1,
        });
      }
    }
  }

  // 페이지 수정
  public async updatePage(
    userId: number,
    pageId: number,
    updatePageRequestDto: UpdatePageRequestDto,
  ) {
    const page = await this.pageRepository.findOne(pageId);

    if (!page) {
      throw new NotFoundException(ResponseStatus.PAGE_NOT_FOUND);
    }
    if (page.userId != userId) {
      throw new ForbiddenException(ResponseStatus.UPDATE_PAGE_FAIL_FORBIDDEN);
    }

    if (updatePageRequestDto.tagIds) {
      await this.pageTagRepository.deleteAllByPageId(pageId);
      const tagIdsNum = updatePageRequestDto.tagIds;
      const tags = await this.tagRepository.findByIds(tagIdsNum);
      await Promise.all(
        tags.map((tag, i) => {
          this.pageTagRepository.save({
            pageId: page.id,
            tagId: tag.id,
            orderNum: i + 1,
          });
        }),
      );
    }
    if (updatePageRequestDto.pageImages) {
      await this.pageImageRepository.deleteAllByPageId(pageId);
      for (const [i, v] of updatePageRequestDto.pageImages.entries()) {
        await this.pageImageRepository.save({
          page: page,
          imageUrl: v,
          orderNum: i + 1,
        });
      }
    }

    const { tagIds, pageImages, ...newDto } = updatePageRequestDto;
    await this.pageRepository.update(page, newDto);
  }

  // 페이지 삭제
  public async deletePage(userId: number, pageId: number) {
    const page = await this.pageRepository.findOne(pageId);
    if (!page) {
      throw new NotFoundException(ResponseStatus.PAGE_NOT_FOUND);
    }
    if (page.userId != pageId) {
      throw new ForbiddenException(ResponseStatus.DELETE_PAGE_FAIL_FORBIDDEN);
    }

    await this.pageImageRepository.deleteAllByPageId(pageId);
    await this.pageTagRepository.deleteAllByPageId(pageId);
    await this.pageRepository.delete(page);
  }

  // 페이지 상세 조회
  public async getPage(userId: number, pageId: number) {
    const page = await this.pageRepository.findOneByPageId(pageId);
    if (!page) {
      throw new NotFoundException(ResponseStatus.PAGE_NOT_FOUND);
    }
    if (userId != page.userId && !page.isPublic) {
      throw new ForbiddenException(ResponseStatus.PAGE_IS_NOT_PUBLIC);
    }

    if (userId == page.userId) {
      const isLiked = await this.likePageRepository.existsBySenderAndPageId(userId, pageId);
      const pageImages = await this.pageImageRepository.findAllByPageId(pageId);
      const pageTags = await this.pageTagRepository.findAllByPageId(pageId);
      const userTags = await Promise.all(
        pageTags.map(async (pageTag) => {
          return this.userTagRepository.findOneByUserIdAndTagId(userId, pageTag.tagId);
        })
      );
      return PageResponseDto.ofPageWithUserTag(page, isLiked, pageImages, userTags);
    } else {
      const profile = await this.profileRepository.findOne(page.userId);
      const isLiked = await this.likePageRepository.existsBySenderAndPageId(userId, pageId);
      const pageImages = await this.pageImageRepository.findAllByPageId(pageId);
      const pageTags = await this.pageTagRepository.findAllTagsByPageId(pageId);
      return PageResponseDto.ofPage(profile, page, isLiked, pageImages, pageTags);
    }  
  }
}
