import { Injectable } from '@nestjs/common';
import { PageResponseDto } from 'src/page/dto/page.response.dto';
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

  // 스토리 조회
  async getStory(userId: number) {
    const projects = await this.projectRepository.findAllByUserId(userId);
    const projectData = await Promise.all(
      projects.map(async (project) => {
        const projectTags = await this.projectTagRepository.findAllJoinQuery(+project.id);
        return StoryResponseDto.ofProject(project, projectTags);
      })
    );

    console.log('project', projectData);
    
    const pages = await this.pageRepository.findAllSinglePageByUserId(userId);
    const pageData = await Promise.all(
      pages.map(async (page) => {
        const pageImageCount = await this.pageImageRepository.getCountByPageId(page.id);
        const pageTags = await this.pageTagRepository.findAllJoinQuery(page.id);
        return StoryResponseDto.ofPage(page, pageImageCount, pageTags);
      })
    );

    console.log('page', pageData);
    // Array.prototype.push.apply(projectData, pageData);
    // Array.prototype.concat(projectData, pageData);
    const data = [ ...projectData, ...pageData ];
    console.log('data', data);

    data.sort((a: StoryResponseDto, b: StoryResponseDto): number => {
      const d1 = new Date(a.startDate);
      const d2 = new Date(b.startDate);
      if (d1 < d2) return 1;
      else if (d1 > d2) return -1;
      else return 0;
    });
    
    console.log('sort data', data);
    return data;
  }

  // 본인 태그별 페이지 목록 조회
  public async getPagesByTag(userId: number, tag: number) {
    const userTag = await this.userTagRepository.findAllPagesByUserIdAndTagId(userId, tag);
    const pageTags = userTag.pageTags;
    return await Promise.all(
      pageTags.map(async (pageTag) => {
        const pageImageCount = await this.pageImageRepository.getCountByPageId(pageTag.page.id);
        const pageTags = await this.pageTagRepository.findAllJoinQuery(pageTag.page.id);
        return PageResponseDto.ofPageSimple(pageTag.page, pageImageCount, pageTags);
      })
    );
  }
}
