import { RecommendTag } from "src/entities/RecommendTag";

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
}