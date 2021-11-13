import { Injectable } from '@nestjs/common';
import { ProjectTag } from 'src/entities/ProjectTag';
import { PageResponseDto } from 'src/page/dto/page.response.dto';
import { ProjectResponseDto } from 'src/project/dto/project.response.dto';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProjectTagRepository } from 'src/repositories/project-tag.repository';
import { ProjectRepository } from 'src/repositories/project.repository';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';

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

  async getMyTags(userId: number) {
    const userTags = await this.userTagRepository.findAllByUserId(userId);
    return userTags.map((userTag) => {
      return TagResponseDto.ofTagColor(userTag.tag, userTag.tagColor);
    })
  }

  async getTags(userId: number) {
    const userTags = await this.userTagRepository.findAllByUserId(userId);
    return userTags.map((userTag) => {
      return TagResponseDto.ofTag(userTag.tag);
    })
  }

  async getStory(userId: number) {
    const projects = await this.projectRepository.findAllByUserId(userId);
    const projectData = await Promise.all(
      projects.map(async (project) => {
        const projectTags = await this.projectTagRepository.findAllJoinQuery(+project.id);
        return ProjectResponseDto.ofProject(project, projectTags);
      })
    );

    console.log(projectData);
    
    const pages = await this.pageRepository.findAllSinglePageByUserId(userId);
    const pageData = await Promise.all(
      pages.map(async (page) => {
        const pageImages = await this.pageImageRepository.findAllByPageId(page.id);
        const pageTags = await this.pageTagRepository.findAllJoinQuery(page.id);
        return PageResponseDto.ofSinglePage(page, pageImages, pageTags);
      })
    );

    console.log(pageData);
  }
}
