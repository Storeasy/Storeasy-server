import { Page } from "src/entities/Page";
import { Project } from "src/entities/Project";
import { TagResponseDto } from "src/tag/dto/tag.response.dto";
import { StoryType } from "./story-type.enum";

export class StoryResponseDto {
  type: StoryType;
  userId: number;
  projectId?: number;
  projectColor?: string;
  pageId?: number;
  title: string;
  description?: string;
  content?: string;
  startDate: string;
  endDate: string;
  tags: TagResponseDto[];

  public static ofProject(project: Project, tags: any[]) {
    return {
      type: StoryType.PROJECT,
      userId: +project.userId,
      projectId: +project.id,
      projectColor: project.projectColor.value,
      title: project.title,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      tags: tags.map((tag) => TagResponseDto.ofProjectTag(tag)),
    }
  }

  public static ofPage(page: Page, tags: any[]) {
    return {
      type: StoryType.PAGE,
      userId: +page.userId,
      pageId: +page.id,
      title: page.title,
      content: page.content,
      startDate: page.startDate,
      endDate: page.endDate,
      tags: tags.map((tag) => TagResponseDto.ofPageTag(tag)),
    };
  }
}