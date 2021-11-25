import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/entities/Project';
import { ProjectTag } from 'src/entities/ProjectTag';
import { UserTag } from 'src/entities/UserTag';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';

export class ProjectResponseDto {
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
  projectId: number;

  @ApiProperty({
    example: 'red',
    description: '프로젝트색 값',
  })
  projectColor: string;

  @ApiProperty({
    example: '테스트 프로젝트',
    description: '프로젝트명',
  })
  title: string;

  @ApiProperty({
    example: '테스트 프로젝트입니다',
    description: '프로젝트 설명',
  })
  description: string;

  @ApiProperty({
    example: '2021-11-01',
    description: '프로젝트 시작 날짜',
  })
  startDate: string;

  @ApiProperty({
    example: '2021-11-10',
    description: '프로젝트 종료 날짜',
  })
  endDate: string;

  @ApiProperty({
    example: [],
    description: '프로젝트 태그',
  })
  tags: TagResponseDto[];

  public static ofProjectWithUserTag(project: Project, tags: UserTag[]): ProjectResponseDto {
    return {
      userId: +project.userId,
      isPublic: project.isPublic == true ? true : false,
      projectId: +project.id,
      projectColor: project.projectColor.value,
      title: project.title,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      tags: tags.map((tag) => TagResponseDto.ofUserTag(tag)),
    };
  }

  public static ofProject(project: Project, tags: any[]): ProjectResponseDto {
    return {
      userId: +project.userId,
      isPublic: project.isPublic == true ? true : false,
      projectId: +project.id,
      projectColor: project.projectColor.value,
      title: project.title,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate,
      tags: tags.map((tag) => TagResponseDto.ofProjectTag(tag)),
    };
  }
}
