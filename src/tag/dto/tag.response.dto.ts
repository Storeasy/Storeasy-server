import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { RecommendTag } from "src/entities/RecommendTag";
import { Tag } from "src/entities/Tag";

export class TagResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  tagName: string;

  @ApiProperty()
  @IsString()
  tagColor: string;

  public static ofRecommendTag(recommendTag: RecommendTag): TagResponseDto {
    return {
      id: recommendTag.id,
      tagName: recommendTag.tag.name,
      tagColor: recommendTag.tag.tagColor.value
    }
  }

  public static ofTag(tag: Tag): TagResponseDto {
    return {
      id: +tag.id,
      tagName: tag.name,
      tagColor: tag.tagColor.value
    }
  }
}