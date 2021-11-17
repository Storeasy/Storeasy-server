import { ApiProperty } from '@nestjs/swagger';

export class ProjectColorResponseDto {
  @ApiProperty({
    example: 1,
    description: '프로젝트색 ID',
  })
  id: number;

  @ApiProperty({
    example: '#123456',
    description: '프로젝트색 값',
  })
  value: string;
}
