import { ApiProperty } from "@nestjs/swagger";
import { Profile } from "src/entities/Profile";
import { TagResponseDto } from "src/tag/dto/tag.response.dto";

export class LikeUserResponseDto {
  @ApiProperty({
    example: 1,
    description: '사용자 ID',
  })
  userId: number;

  @ApiProperty({
    example: 'http://~~',
    description: '프로필 이미지 URL',
  })
  profileImage: string;

  @ApiProperty({
    example: '행복한 만두',
    description: '사용자 닉네임',
  })
  nickname: string;

  @ApiProperty({
    example: '성신여자대학교',
    description: '대학교명',
  })
  universityName: string;
  
  @ApiProperty({
    example: true,
    description: '좋아요 여부',
  })
  isLiked: boolean;

  @ApiProperty({
    example: [],
    description: '프로필 태그',
  })
  tags: TagResponseDto[];

  public static ofLikeUser(profile: Profile, tags: any[]): LikeUserResponseDto {
    return {
      userId: +profile.userId,
      profileImage: profile.profileImage,
      nickname: profile.nickname,
      universityName: profile.universityName,
      isLiked: true,
      tags: tags.map((tag) => TagResponseDto.ofTag(tag)),
    }
  }
}