import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ResponseStatus } from 'src/config/res/response-status';
import { ProjectColorRepository } from 'src/repositories/project-color.repository';
import { ProjectRepository } from 'src/repositories/project.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateProjectRequestDto } from './dto/create-project.request.dto';
import { ProjectColorResponseDto } from './dto/project-color.response.dto';
import { UpdateProjectRequestDto } from './dto/update-project.request.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectColorRepository: ProjectColorRepository,
    private readonly userRepository: UserRepository
  ) {}

  async getProjectColors(): Promise<ProjectColorResponseDto[]> {
    return await this.projectColorRepository.find();
  }

  async createProject(userId: number, createProjectRequestDto: CreateProjectRequestDto) {
    const project = this.projectRepository.create(createProjectRequestDto);
    project.userId = userId;

    await this.projectRepository.save(project);
  }

  async updateProject(userId: number, projectId: number, updateProjectRequestDto: UpdateProjectRequestDto) {
    const project = await this.projectRepository.findOne(projectId);
    
    if (!project) {
      throw new NotFoundException(ResponseStatus.PROJECT_NOT_FOUND);
    }
    if (project.userId != userId) {
      throw new ForbiddenException(ResponseStatus.UPDATE_PROJECT_FAIL_FORBIDDEN);
    }

    await this.projectRepository.update(project, updateProjectRequestDto);
  }

  async deleteProject(userId: number, projectId: number) {
    const project = await this.projectRepository.findOne(projectId);
    if (!project) {
      throw new NotFoundException(ResponseStatus.PROJECT_NOT_FOUND);
    }
    if (project.userId != userId) {
      throw new ForbiddenException(ResponseStatus.DELETE_PROJECT_FAIL_FORBIDDEN);
    }

    await this.projectRepository.delete(project);
  }
}
