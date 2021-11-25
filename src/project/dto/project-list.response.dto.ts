import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/entities/Project';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';

export class ProjectListResponseDto {
  @ApiProperty({
    example: 1,
    description: '프로젝트 ID',
  })
  id: number;

  @ApiProperty({
    example: '테스트 프로젝트',
    description: '프로젝트명',
  })
  title: string;

  public static ofProject(project: Project): ProjectListResponseDto {
    return {
      id: +project.id,
      title: project.title,
    };
  }
}
