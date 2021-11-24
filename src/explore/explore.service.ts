import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { ExplorePageResponseDto } from './dto/explore-page.response.dto';
import { ExploreUserResponseDto } from './dto/explore-user.response.dto';

@Injectable()
export class ExploreService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly pageImageRepository: PageImageRepository,
    private readonly pageTagRepository: PageTagRepository,
    private readonly likePageRepository: LikePageRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly profileTagRepository: ProfileTagRepository,
    private readonly tagRepository: TagRepository,
  ) {}

  public async getRecommendPages(userId: number) {
    const tag = await this.profileTagRepository.findOneByUserId(userId);
    const profileTags = await this.profileTagRepository.findAllUsersByTagIdExceptUserId(tag.tagId, userId);
    const pages = await Promise.all(
      profileTags.map(async (profileTag) => {
        return await this.pageRepository.findRecentPageByUserId(profileTag.userId);
      })
    );

    const publicPages = pages.filter(page => {
      if(page){
        if(page.project) {
          if(page.project.isPublic) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    });

    let limitPublicPages = publicPages.slice(0, 30);

    if(limitPublicPages.length == 0) {
      const recentPages = await this.pageRepository.findAllRecentPages(userId);
      const publicRecentPages = recentPages.filter(page => {
        if(page){
          if(page.project) {
            if(page.project.isPublic) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        } else {
          return false;
        }
      });

      limitPublicPages = publicRecentPages.slice(0, 30);
    }

    return await Promise.all(
      limitPublicPages.map(async (page) => {
        const profile = await this.profileRepository.findOne(page.userId);
        const isLiked = await this.likePageRepository.existsBySenderAndPageId(userId, page.id);
        const pageImageCount = await this.pageImageRepository.getCountByPageId(
          page.id,
        );
        const pageTags = await this.pageTagRepository.findAllJoinQuery(page.id);
        return ExplorePageResponseDto.ofExplorePageSimple(profile, page, isLiked, pageImageCount, pageTags);
      })
    );
  }

  public async searchPagesByTag(userId: number, tagName: string) {
    const tag = await this.tagRepository.findOneByName(tagName);
    if(!tag) {
      return null;
    }

    const pageTags = await this.pageTagRepository.findAllPagesByTagId(tag.id);
    const pages = pageTags.map(pageTag => pageTag.page);
    const publicPages = pages.filter(page => {
      if(page){
        if(page.project) {
          if(page.project.isPublic) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      } else {
        return false;
      }
    });

    return await Promise.all(
      publicPages.map(async (page) => {
        const profile = await this.profileRepository.findOne(page.userId);
        const isLiked = await this.likePageRepository.existsBySenderAndPageId(userId, page.id);
        const pageImageCount = await this.pageImageRepository.getCountByPageId(
          page.id,
        );
        const pageTags = await this.pageTagRepository.findAllJoinQuery(page.id);
        return ExplorePageResponseDto.ofExplorePageSimple(profile, page, isLiked, pageImageCount, pageTags);
      })
    );
  }

  public async searchUsersByTag(tagName: string) {
    const tag = await this.tagRepository.findOneByName(tagName);
    if(!tag) {
      return null;
    }

    const profileTags = await this.profileTagRepository.findAllProfilesByTagId(tag.id);
    const profiles = profileTags.map(profileTag => profileTag.user.profile);

    return await Promise.all(
      profiles.map(async (profile) => {
        const profileTags = await this.profileTagRepository.findAllByUserIdJoinTag(profile.userId);
        const tags = profileTags.map(profileTag => profileTag.tag);
        return  ExploreUserResponseDto.ofExploreUser(profile, tags);
      })
    );
  }

  public async getPage(userId: number, pageId: number) {
    const page = await this.pageRepository.findOneByPageId(pageId);

    if(!page) {
      throw new NotFoundException(ResponseStatus.PAGE_NOT_FOUND);
    }
    if(!page.isPublic) {
      throw new ForbiddenException(ResponseStatus.PAGE_IS_NOT_PUBLIC);
    }

    const profile = await this.profileRepository.findOne(page.userId);
    const isLiked = await this.likePageRepository.existsBySenderAndPageId(userId, pageId);
    const pageImages = await this.pageImageRepository.findAllByPageId(pageId);
    const pageTags = await this.pageTagRepository.findAllJoinQuery(pageId);
    return ExplorePageResponseDto.ofExplorePage(profile,  page, isLiked, pageImages, pageTags);
  }
}
