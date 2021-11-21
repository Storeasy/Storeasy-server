import { ApiProperty } from '@nestjs/swagger';
import { Page } from 'src/entities/Page';
import { Project } from 'src/entities/Project';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';
import { StoryType } from './story-type.enum';

export class StoryResponseDto {
  @ApiProperty({
    example: 0,
    description: '프로젝트/페이지',
  })
  type: StoryType;

  @ApiProperty({
    example: 1,
    description: '사용자 ID',
  })
  userId: number;

  @ApiProperty({
    example: true,
    description: '공개 여부',
  })
  isPublic: boolean;

  @ApiProperty({
    example: 1,
    description: '프로젝트 ID',
  })
  projectId?: number;

  @ApiProperty({
    example: 'red',
    description: '프로젝트색 값',
  })
  projectColor?: string;

  @ApiProperty({
    example: 1,
    description: '페이지 ID',
  })
  pageId?: number;

  @ApiProperty({
    example: '테스트 프로젝트/페이지',
    description: '프로젝트명/페이지명',
  })
  title: string;

  @ApiProperty({
    example: '테스트 프로젝트입니다',
    description: '프로젝트 설명',
  })
  description?: string;

  @ApiProperty({
    example: '테스트 페이지입니다',
    description: '페이지 설명',
  })
  content?: string;

  @ApiProperty({
    example: '2021-11-01',
    description: '프로젝트/페이지 시작 날짜',
  })
  startDate: string;

  @ApiProperty({
    example: '2021-11-01',
    description: '프로젝트/페이지 종료 날짜',
  })
  endDate: string;

  @ApiProperty({
    example: 1,
    description: '페이지 이미지 개수',
  })
  imageCount?: number;

  @ApiProperty({
    example: [],
    description: '프로젝트/페이지 태그',
  })
  tags: TagResponseDto[];

  public static ofProject(project: Project, tags: any[]): StoryResponseDto {
    return {
      type: StoryType.PROJECT,
      userId: +project.userId,
      isPublic: project.isPublic,
      projectId: +project.id,
      projectColor: project.projectColor.value,
      title: project.title,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      tags: tags.map((tag) => TagResponseDto.ofProjectTag(tag)),
    };
  }

  public static ofPage(
    page: Page,
    imageCount: number,
    tags: any[],
  ): StoryResponseDto {
    return {
      type: StoryType.PAGE,
      userId: +page.userId,
      isPublic: page.isPublic,
      pageId: +page.id,
      title: page.title,
      content: page.content,
      startDate: page.startDate,
      endDate: page.endDate,
      imageCount: imageCount,
      tags: tags.map((tag) => TagResponseDto.ofPageTag(tag)),
    };
  }
}
