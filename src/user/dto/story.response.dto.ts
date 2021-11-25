import { Page } from 'src/entities/Page';
import { PageTag } from 'src/entities/PageTag';
import { Project } from 'src/entities/Project';
import { ProjectTag } from 'src/entities/ProjectTag';
import { UserTag } from 'src/entities/UserTag';
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

  public static ofProjectWithUserTag(project: Project, tags: UserTag[]): StoryResponseDto {
    return {
      project: ProjectResponseDto.ofProjectWithUserTag(project, tags),
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

  public static ofPageWithUserTag(
    page: Page,
    isLiked: boolean,
    imageCount: number,
    tags: UserTag[],
  ): StoryResponseDto {
    return {
      page: PageResponseDto.ofPageSimpleWithUserTag(page, isLiked, imageCount, tags),
    };
  }
}
