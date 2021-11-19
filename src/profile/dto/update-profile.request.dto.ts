import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";

export class UpdateProfileRequestDto {
  @ApiProperty({
    example: 'http://~~',
    description: '프로필 이미지 URL',
  })
  profileImage?: string;

  @ApiProperty({
    example: '테스트 닉네임',
    description: '닉네임',
  })
  nickname?: string;

  @ApiProperty({
    example: '테스트 연락처',
    description: '연락처',
  })
  contact?: string;

  @ApiProperty({
    example: '테스트 소개글',
    description: '소개글',
  })
  bio?: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: '태그 ID',
  })
  tagIds?: number[];
}
