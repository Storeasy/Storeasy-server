import { ApiProperty } from '@nestjs/swagger';
import { Page } from 'src/entities/Page';
import { PageImage } from 'src/entities/PageImage';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';

export class PageResponseDto {
  @ApiProperty({
    example: 1,
    description: '사용자 ID',
  })
  userId: number;

  @ApiProperty({
    example: 1,
    description: '프로젝트 ID',
  })
  projectId: number;

  @ApiProperty({
    example: '테스트 프로젝트',
    description: '프로젝트명',
  })
  projectTitle: string;

  @ApiProperty({
    example: '테스트 페이지',
    description: '페이지명',
  })
  title: string;

  @ApiProperty({
    example: '테스트 페이지입니다',
    description: '페이지 설명',
  })
  content: string;

  @ApiProperty({
    example: '2021-11-05',
    description: '페이지 시작 날짜',
  })
  startDate: string;

  @ApiProperty({
    example: '2021-11-05',
    description: '페이지 종료 날짜',
  })
  endDate: string;

  @ApiProperty({
    example: [],
    description: '페이지 태그',
  })
  tags: TagResponseDto[];

  @ApiProperty({
    example: ['imageUrl1', 'imageUrl2', 'imageUrl3'],
    description: '사용자 ID',
  })
  images: string[];

  public static ofPage(page: Page, images: PageImage[], tags: any[]) {
    return {
      userId: page.userId,
      projectId: page.project.id,
      projectTitle: page.project.title,
      title: page.title,
      content: page.content,
      startDate: page.startDate,
      endDate: page.endDate,
      images: images.map((image) => image.imageUrl),
      tags: tags.map((tag) => TagResponseDto.ofPageTag(tag)),
    };
  }
}
