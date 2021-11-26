import { PageTag } from 'src/entities/PageTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PageTag)
export class PageTagRepository extends Repository<PageTag> {
  public async findAllPagesByTagIdAndUserId(tagId: number, userId: number) {
    return await this.createQueryBuilder('pageTag')
      .where('pageTag.tagId = :tagId', { tagId: tagId })
      .leftJoinAndSelect('pageTag.page', 'page')
      .andWhere('page.userId = :userId', { userId: userId })
      .getMany();
  }

  public async findAllByPageId(pageId: number) {
    return await this.find({
      where: { pageId: pageId },
      order: {
        orderNum: "ASC",
      }
    });
  }

  public async findAllPagesByTagId(tagId: number) {
    return await this.createQueryBuilder('pageTag')
      .where('pageTag.tagId = :tagId', { tagId: tagId })
      .leftJoinAndSelect('pageTag.page', 'page')
      .leftJoinAndSelect('page.project', 'project')
      .andWhere('page.isPublic = true')
      .getMany();
  }

  public async findAllTagsByPageId(pageId: number) {
    return await this.query(
      `
      select * from page_tag
      left join tag on page_tag.tag_id = tag.id
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
