import { ApiProperty } from "@nestjs/swagger";
import { Page } from "src/entities/Page";
import { PageImage } from "src/entities/PageImage";
import { Profile } from "src/entities/Profile";
import { TagResponseDto } from "src/tag/dto/tag.response.dto";

export class LikePageResponseDto {
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
    example: true,
    description: '좋아요 여부',
  })
  isLiked: boolean;

  @ApiProperty({
    example: true,
    description: '공개 여부',
  })
  isPublic: boolean;

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
    example: 1,
    description: '페이지 ID',
  })
  pageId: number;

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
    description: '이미지 URL',
  })
  images?: string[];

  @ApiProperty({
    example: 1,
    description: '이미지 개수',
  })
  imageCount?: number;

  public static ofLikePage(
    profile: Profile,
    page: Page,
    images: PageImage[],
    tags: any[],
  ): LikePageResponseDto {
    return {
      userId: +page.userId,
      profileImage: profile.profileImage,
      nickname: profile.nickname,
      isPublic: null,
      isLiked: true,
      projectId: page.project == null ? null : +page.project.id,
      projectTitle: page.project == null ? null : page.project.title,
      pageId: +page.id,
      title: page.title,
      content: page.content,
      startDate: page.startDate,
      endDate: page.endDate,
      imageCount: null,
      images: images.map((image) => image.imageUrl),
      tags: tags.map((tag) => TagResponseDto.ofPageTag(tag)),
    };
  }

  public static ofLikePageSimple(
    profile: Profile,
    page: Page,
    imageCount: number,
    tags: any[],
  ): LikePageResponseDto {
    return {
      userId: +page.userId,
      profileImage: profile.profileImage,
      nickname: profile.nickname,
      isPublic: null,
      isLiked: true,
      projectId: page.project == null ? null : +page.project.id,
      projectTitle: page.project == null ? null : page.project.title,
      pageId: +page.id,
      title: page.title,
      content: page.content,
      startDate: page.startDate,
      endDate: page.endDate,
      imageCount: imageCount,
      images: null,
      tags: tags.map((tag) => TagResponseDto.ofPageTag(tag)),
    };
  }
}