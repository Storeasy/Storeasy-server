import { ConsoleLogger, Injectable } from '@nestjs/common';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { ExplorePageResponseDto } from './dto/explore-page.response.dto';

@Injectable()
export class ExploreService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly pageImageRepository: PageImageRepository,
    private readonly pageTagRepository: PageTagRepository,
    private readonly profileTagRepository: ProfileTagRepository,
    private readonly likePageRepository: LikePageRepository,
  ) {}

  public async getRecommendPages(userId: number) {
    const tag = await this.profileTagRepository.findOneByUserId(userId);
    console.log(tag);
    const profileTags = await this.profileTagRepository.findAllUsersByTagIdExceptUserId(tag.tagId, userId);
    console.log(profileTags);
    const pages = await Promise.all(
      profileTags.map(async (profileTag) => {
        return await this.pageRepository.findRecentPageByUserId(profileTag.userId);
      })
    );
    console.log(pages);

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
    console.log(publicPages);

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
}
