import { PageTag } from 'src/entities/PageTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PageTag)
export class PageTagRepository extends Repository<PageTag> {
  public async findAllJoinQuery(pageId: number) {
    return await this.query(
      `
      select * from page_tag
      left join tag on page_tag.tag_id = tag.id
      left join user_tag on page_tag.tag_id = user_tag.tag_id
      left join tag_color on user_tag.tag_color_id = tag_color.id
      where page_id = ?`,
      [pageId],
    );
  }

  public async deleteAllByPageId(pageId: number) {
    return this.createQueryBuilder('pageTag')
      .delete()
      .where('pageId = :pageId', { pageId: pageId })
      .execute();
  }
}
