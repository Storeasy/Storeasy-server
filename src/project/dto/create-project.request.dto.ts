import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProjectRequestDto {
  @ApiProperty({
    example: '테스트 프로젝트',
    description: '프로젝트명',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '이것은 테스트 프로젝트입니다',
    description: '프로젝트 설명',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: '2021-11-01',
    description: '프로젝트 시작 날짜',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    example: '2021-11-10',
    description: '프로젝트 종료 날짜',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    example: true,
    description: '프로젝트 공개 여부',
  })
  @IsBoolean()
  isPublic: boolean;

  @ApiProperty({
    example: 1,
    description: '프로젝트색 ID',
  })
  @IsNumber()
  projectColorId: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: '태그 ID',
  })
  @IsArray()
  tagIds: number[];
}
