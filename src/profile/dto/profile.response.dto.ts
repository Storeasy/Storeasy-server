import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/entities/Profile';
import { Tag } from 'src/entities/Tag';
import { TagResponseDto } from 'src/tag/dto/tag.response.dto';

export class ProfileResponseDto {
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
    example: 'http://어쩌구저쩌구',
    description: '프로필 이미지 URL',
  })
  profileImage: string;

  @ApiProperty({
    example: 'testnickname',
    description: '닉네임',
  })
  nickname: string;

  @ApiProperty({
    example: '성신여자대학교',
    description: '학교명',
  })
  universityName: string;

  @ApiProperty({
    example: 'test@test.com',
    description: '연락처, 이메일',
  })
  contact: string;

  @ApiProperty({
    example: '안녕하세요. 저는 어쩌구저쩌구',
    description: '소개글',
  })
  bio: string;

  @ApiProperty({
    example: ['{ "id": 1, "tagName": "울랄라", "tagColor": "#123456" }'],
    description: '프로필 태그 목록',
  })
  tags: TagResponseDto[];

  public static ofProfile(
    profile: Profile,
    tags: any[],
  ): ProfileResponseDto {
    return {
      userId: +profile.userId,
      isPublic: profile.isPublic,
      profileImage: profile.profileImage,
      nickname: profile.nickname,
      universityName: profile.universityName,
      contact: profile.contact,
      bio: profile.bio,
      tags: tags.map((tag) => TagResponseDto.ofTag(tag))
    };
  }
}
