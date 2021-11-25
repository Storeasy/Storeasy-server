import { ApiProperty } from '@nestjs/swagger';
import { Tag } from 'src/entities/Tag';
import { TagColor } from 'src/entities/TagColor';
import { UserTag } from 'src/entities/UserTag';

export class TagResponseDto {
  @ApiProperty({
    example: 1,
    description: '태그 ID',
  })
  id: number;

  @ApiProperty({
    example: '울랄라',
    description: '태그명',
  })
  tagName: string;

  @ApiProperty({
    example: '#123456',
    description: '태그색',
  })
  tagColor: string;

  public static ofTag(tag: Tag): TagResponseDto {
    return {
      id: +tag.id,
      tagName: tag.name,
      tagColor: 'defalut',
    };
  }

  public static ofTagColor(tag: Tag, tagColor: TagColor): TagResponseDto {
    return {
      id: +tag.id,
      tagName: tag.name,
      tagColor: tagColor.value,
    };
  }

  public static ofPageTag(pageTag: any): TagResponseDto {
    return {
      id: +pageTag.id,
      tagName: pageTag.name,
      tagColor: pageTag.value,
    };
  }

  public static ofProjectTag(projectTag: any): TagResponseDto {
    return {
      id: +projectTag.id,
      tagName: projectTag.name,
      tagColor: projectTag.value,
    };
  }

  public static ofUserTag(userTag: UserTag): TagResponseDto {
    return {
      id: +userTag.tagId,
      tagName: userTag.tag.name,
      tagColor: userTag.tagColor.value,
    };
  }
}
