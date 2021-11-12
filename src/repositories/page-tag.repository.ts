import { PageTag } from "src/entities/PageTag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PageTag)
export class PageTagRepository extends Repository<PageTag> {
  public async deleteAllByPageId(pageId: number) {
    return this.createQueryBuilder('pageTag')
      .delete()
      .where('pageId = :pageId', { pageId: pageId })
      .execute();
  }
}