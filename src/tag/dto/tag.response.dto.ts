import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { PageTag } from "src/entities/PageTag";
import { RecommendTag } from "src/entities/RecommendTag";
import { Tag } from "src/entities/Tag";
import { TagColor } from "src/entities/TagColor";

export class TagResponseDto {
  @ApiProperty({
    example: 1,
    description: "태그 ID"
  })
  id: number;

  @ApiProperty({
    example: "울랄라",
    description: "태그명"
  })
  tagName: string;

  @ApiProperty({
    example: "#123456",
    description: "태그색"
  })
  tagColor: string;

  public static ofTag(tag: Tag): TagResponseDto {
    return {
      id: tag.id,
      tagName: tag.name,
      tagColor: "defalut"
    }
  }

  public static ofTagColor(tag: Tag, tagColor: TagColor): TagResponseDto {
    return {
      id: tag.id,
      tagName: tag.name,
      tagColor: tagColor.value
    }
  }

  public static ofPageTag(pageTag: any): TagResponseDto {
    return {
      id: pageTag.id,
      tagName: pageTag.name,
      tagColor: pageTag.value
    }
  }
}