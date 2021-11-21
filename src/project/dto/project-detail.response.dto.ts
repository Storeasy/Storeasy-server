import { PageResponseDto } from 'src/page/dto/page.response.dto';
import { ProjectResponseDto } from './project.response.dto';

export class ProjectDetailResponseDto {
  project: ProjectResponseDto;
  pages: PageResponseDto[];

  static ofProjectPage(
    project: ProjectResponseDto,
    pages: PageResponseDto[],
  ): ProjectDetailResponseDto {
    return {
      project: project,
      pages: pages,
    };
  }
}
