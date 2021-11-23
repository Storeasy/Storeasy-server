import { Page } from 'src/entities/Page';
import { Project } from 'src/entities/Project';
import { PageResponseDto } from 'src/page/dto/page.response.dto';
import { ProjectResponseDto } from 'src/project/dto/project.response.dto';

export class StoryResponseDto {
  project?: ProjectResponseDto;
  page?: PageResponseDto;

  public static ofProject(project: Project, tags: any[]): StoryResponseDto {
    return {
      project: ProjectResponseDto.ofProject(project, tags),
    };
  }

  public static ofPage(
    page: Page,
    isLiked: boolean,
    imageCount: number,
    tags: any[],
  ): StoryResponseDto {
    return {
      page: PageResponseDto.ofPageSimple(page, isLiked, imageCount, tags),
    };
  }
}
