import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class CreatePageRequestDto {
  @ApiProperty({
    example: '테스트 페이지',
    description: '페이지명',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '테스트 페이지입니다',
    description: '페이지 설명',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: '2021-11-05',
    description: '페이지 시작 날짜',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2021-11-05',
    description: '페이지 종료 날짜',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    example: true,
    description: '페이지 공개 여부',
  })
  @IsString()
  isPublic: string;

  @ApiProperty({
    example: '1',
    description: '프로젝트 ID',
  })
  projectId?: number;

  @ApiProperty({
    example: '[1, 2, 3]',
    description: '태그 ID',
  })
  @IsString()
  tagIds: string;
}
