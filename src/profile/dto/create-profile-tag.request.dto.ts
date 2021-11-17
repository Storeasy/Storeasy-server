import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateProfileTagRequestDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: '태그 ID 배열',
  })
  @IsArray()
  tags: number[];
}
