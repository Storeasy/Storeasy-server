import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { PageResponseDto } from 'src/page/dto/page.response.dto';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { ProjectColorRepository } from 'src/repositories/project-color.repository';
import { ProjectTagRepository } from 'src/repositories/project-tag.repository';
import { ProjectRepository } from 'src/repositories/project.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { CreateProjectRequestDto } from './dto/create-project.request.dto';
import { ProjectDetailResponseDto } from './dto/project-detail.response.dto';
import { ProjectResponseDto } from './dto/project.response.dto';
import { UpdateProjectRequestDto } from './dto/update-project.request.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectColorRepository: ProjectColorRepository,
    private readonly tagRepository: TagRepository,
    private readonly projectTagRepository: ProjectTagRepository,
    private readonly pageImageRepository: PageImageRepository,
    private readonly pageTagRepository: PageTagRepository,
  ) {}

  // 프로젝트색 목록 조회
  async getProjectColors() {
    return await this.projectColorRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  // 프로젝트 생성
  async createProject(
    userId: number,
    createProjectRequestDto: CreateProjectRequestDto,
  ) {
    const project = this.projectRepository.create(createProjectRequestDto);
    project.userId = userId;

    await this.projectRepository.save(project);

    const tags = await this.tagRepository.findByIds(
      createProjectRequestDto.tagIds,
    );
    await Promise.all(
      tags.map((tag, i) => {
        this.projectTagRepository.save({
          projectId: project.id,
          tagId: tag.id,
          orderNum: i + 1,
        });
      }),
    );
  }

  // 프로젝트 수정
  async updateProject(
    userId: number,
    projectId: number,
    updateProjectRequestDto: UpdateProjectRequestDto,
  ) {
    const project = await this.projectRepository.findOne(projectId);

    if (!project) {
      throw new NotFoundException(ResponseStatus.PROJECT_NOT_FOUND);
    }
    if (project.userId != userId) {
      throw new ForbiddenException(
        ResponseStatus.UPDATE_PROJECT_FAIL_FORBIDDEN,
      );
    }

    if (updateProjectRequestDto.tagIds) {
      await this.projectTagRepository.deleteAllByProjectId(projectId);
      const tags = await this.tagRepository.findByIds(
        updateProjectRequestDto.tagIds,
      );
      await Promise.all(
        tags.map((tag, i) => {
          this.projectTagRepository.save({
            projectId: projectId,
            tagId: +tag.id,
            orderNum: i + 1,
          });
        }),
      );
      const { tagIds, ...newDto } = updateProjectRequestDto;
      await this.projectRepository.update(project, newDto);
    } else {
      await this.projectRepository.update(project, updateProjectRequestDto);
    }
  }

  // 프로젝트 삭제
  async deleteProject(userId: number, projectId: number) {
    const project = await this.projectRepository.findOne(projectId);
    if (!project) {
      throw new NotFoundException(ResponseStatus.PROJECT_NOT_FOUND);
    }
    if (project.userId != userId) {
      throw new ForbiddenException(
        ResponseStatus.DELETE_PROJECT_FAIL_FORBIDDEN,
      );
    }

    await this.projectRepository.delete(project);
  }

  // 프로젝트 상세 조회
  async getProject(userId: number, projectId: number) {
    const project = await this.projectRepository.findAllPagesByProjectId(
      projectId,
    );
    if (!project) {
      throw new NotFoundException(ResponseStatus.PROJECT_NOT_FOUND);
    }
    if (project.userId != userId && !project.isPublic) {
      throw new ForbiddenException(ResponseStatus.PROFILE_IS_NOT_PUBLIC);
    }

    const projectTags = await this.projectTagRepository.findAllJoinQuery(
      project.id,
    );
    const projectData = ProjectResponseDto.ofProject(project, projectTags);

    const pages = project.pages;
    const pageData = await Promise.all(
      pages.map(async (page) => {
        if (page.isPublic) {
          const pageImageCount =
            await this.pageImageRepository.getCountByPageId(page.id);
          const pageTags = await this.pageTagRepository.findAllJoinQuery(
            page.id,
          );
          return PageResponseDto.ofPageSimple(page, pageImageCount, pageTags);
        }
      }),
    );

    return ProjectDetailResponseDto.ofProjectPage(projectData, pageData);
  }
}
