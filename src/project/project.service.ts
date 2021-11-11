import { Injectable } from '@nestjs/common';
import { ProjectColorRepository } from 'src/repositories/project-color.repository';
import { ProjectRepository } from 'src/repositories/project.repository';
import { CreateProjectRequestDto } from './dto/create-project.request.dto';
import { ProjectColorResponseDto } from './dto/project-color.response.dto';
import { UpdateProjectRequestDto } from './dto/update-project.request.dto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly projectColorRepository: ProjectColorRepository
  ) {}

  async getProjectColors(): Promise<ProjectColorResponseDto[]> {
    const colors = await this.projectColorRepository.find();
    return colors;
  }

  async createProject(userId: number, createProjectRequestDto: CreateProjectRequestDto) {

  }

  async updateProject(userId: number, projectId: number, updateProjectRequestDto: UpdateProjectRequestDto) {

  }

  async deleteProject(userId: number, projectId: number) {

  }
}
