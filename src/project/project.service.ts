import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { ProjectColorRepository } from 'src/repositories/project-color.repository';
import { ProjectTagRepository } from 'src/repositories/project-tag.repository';
import { ProjectRepository } from 'src/repositories/project.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateProjectRequestDto } from './dto/create-project.request.dto';
import { UpdateProjectRequestDto } from './dto/update-project.request.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectColorRepository: ProjectColorRepository,
    private readonly tagRepository: TagRepository,
    private readonly projectTagRepository: ProjectTagRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getProjectColors() {
    return await this.projectColorRepository.find();
  }

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
            tagId: tag.id,
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
}
