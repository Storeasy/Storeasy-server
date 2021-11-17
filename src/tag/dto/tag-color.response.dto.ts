import { ApiProperty } from '@nestjs/swagger';

export class TagColorResponseDto {
  @ApiProperty({
    example: 1,
    description: '태그색 ID',
  })
  id: number;

  @ApiProperty({
    example: '#123456',
    description: '태그색 값',
  })
  value: string;
}
