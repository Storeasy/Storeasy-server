import { Injectable } from '@nestjs/common';
import { PageResponseDto } from 'src/page/dto/page.response.dto';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProjectTagRepository } from 'src/repositories/project-tag.repository';
import { ProjectRepository } from 'src/repositories/project.repository';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';
import { StoryResponseDto } from './dto/story.response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userTagRepository: UserTagRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly projectTagRepository: ProjectTagRepository,
    private readonly pageRepository: PageRepository,
    private readonly pageImageRepository: PageImageRepository,
    private readonly pageTagRepository: PageTagRepository,
    private readonly likePageRepository: LikePageRepository,
  ) {}

  // 본인 태그 목록 조회
  async getMyTags(userId: number) {
    const userTags = await this.userTagRepository.findAllByUserId(userId);
    return userTags.map((userTag) => {
      return TagResponseDto.ofTagColor(userTag.tag, userTag.tagColor);
    });
  }

  // 태그 목록 조회
  async getTags(userId: number) {
    const userTags = await this.userTagRepository.findAllByUserId(userId);
    return userTags.map((userTag) => {
      return TagResponseDto.ofTag(userTag.tag);
    });
  }

  // 본인 스토리 조회
  async getMyStory(userId: number) {
    const projects = await this.projectRepository.findAllByUserId(userId);

    const projectData = await Promise.all(
      projects.map(async (project) => {
        const projectTags = await this.projectTagRepository.findAllByProjectId(project.id);
        const userTags = await Promise.all(
          projectTags.map(async (projectTag) => {
            return this.userTagRepository.findOneByUserIdAndTagId(userId, projectTag.tagId);
          })
        );
        return StoryResponseDto.ofProjectWithUserTag(project, userTags);
      }),
    );

    const pages = await this.pageRepository.findAllSinglePageByUserId(userId);

    const pageData = await Promise.all(
      pages.map(async (page) => {
        if(page.isPublic) {
          const isLiked = await this.likePageRepository.existsBySenderAndPageId(userId, page.id);
          const pageImageCount = await this.pageImageRepository.getCountByPageId(
            page.id,
          );
          const pageTags = await this.pageTagRepository.findAllByPageId(page.id);
          const userTags = await Promise.all(
            pageTags.map(async (pageTag) => {
              return this.userTagRepository.findOneByUserIdAndTagId(userId, pageTag.tagId);
            })
          );
          
          return StoryResponseDto.ofPageWithUserTag(page, isLiked, pageImageCount, userTags);
        }
      }),
    );

    // Array.prototype.push.apply(projectData, pageData);
    // Array.prototype.concat(projectData, pageData);
    const data = [...projectData, ...pageData];

    data.sort((a: StoryResponseDto, b: StoryResponseDto): number => {
      const d1 = new Date(a.project != null ? a.project.startDate : a.page.startDate);
      const d2 = new Date(b.project != null ? b.project.startDate : b.page.startDate);
      if (d1 < d2) return 1;
      else if (d1 > d2) return -1;
      else return 0;
    });

    return data;
  }

  // 스토리 조회
  async getStory(userId: number) {
    const projects = await this.projectRepository.findAllByUserId(userId);
    const publicProjects = projects.filter(project => {
      if(project.isPublic) {
        return true;
      } else {
        return false;
      }
    });
    const projectData = await Promise.all(
      publicProjects.map(async (project) => {
        const projectTags = await this.projectTagRepository.findAllTagsByProjectId(project.id);
        return StoryResponseDto.ofProject(project, projectTags);
      }),
    );

    const pages = await this.pageRepository.findAllSinglePageByUserId(userId);
    const publicPages = pages.filter(page => {
      if(page.isPublic) {
        return true;
      } else {
        return false;
      }
    });
    const pageData = await Promise.all(
      publicPages.map(async (page) => {
        if(page.isPublic) {
          const isLiked = await this.likePageRepository.existsBySenderAndPageId(userId, page.id);
          const pageImageCount = await this.pageImageRepository.getCountByPageId(
            page.id,
          );
          const pageTags = await this.pageTagRepository.findAllTagsByPageId(page.id);
          return StoryResponseDto.ofPage(page, isLiked, pageImageCount, pageTags);
        }
      }),
    );

    // Array.prototype.push.apply(projectData, pageData);
    // Array.prototype.concat(projectData, pageData);
    const data = [...projectData, ...pageData];

    data.sort((a: StoryResponseDto, b: StoryResponseDto): number => {
      const d1 = new Date(a.project != null ? a.project.startDate : a.page.startDate);
      const d2 = new Date(b.project != null ? b.project.startDate : b.page.startDate);
      if (d1 < d2) return 1;
      else if (d1 > d2) return -1;
      else return 0;
    });

    return data;
  }

  // 본인 태그별 페이지 목록 조회
  public async getPagesByTag(userId: number, tag: number) {
    const userTag = await this.userTagRepository.findAllPagesByUserIdAndTagId(
      userId,
      tag,
    );
    if(!userTag) {
      return null;
    }

    const pageTags = userTag.pageTags;
    const pages = await this.pageRepository.findAllByIds(pageTags.map(pageTag => pageTag.pageId));
    const data =  await Promise.all(
      pages.map(async (page) => {
        const isLiked = await this.likePageRepository.existsBySenderAndPageId(userId, page.id);
        const pageImageCount = await this.pageImageRepository.getCountByPageId(
          page.id,
        );
        const pageTags = await this.pageTagRepository.findAllByPageId(page.id);
        const userTags = await Promise.all(
          pageTags.map(async (pageTag) => {
            return this.userTagRepository.findOneByUserIdAndTagId(userId, pageTag.tagId);
          })
        );
        return StoryResponseDto.ofPageWithUserTag(page, isLiked, pageImageCount, userTags);
      }),
    );

    data.sort((a: StoryResponseDto, b: StoryResponseDto): number => {
      const d1 = new Date(a.page.startDate);
      const d2 = new Date(b.page.startDate);
      if (d1 < d2) return 1;
      else if (d1 > d2) return -1;
      else return 0;
    });

    return data;
  }
}
