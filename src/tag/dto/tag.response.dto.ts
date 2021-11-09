import { RecommendTag } from "src/entities/RecommendTag";
import { Tag } from "src/entities/Tag";

export class TagResponseDto {
  id: number;
  tagName: string;
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
      id: parseInt(tag.id),
      tagName: tag.name,
      tagColor: tag.tagColor.value
    }
  }
}