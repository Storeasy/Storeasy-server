import { PageImage } from 'src/entities/PageImage';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(PageImage)
export class PageImageRepository extends Repository<PageImage> {
  public async findAllByPageId(pageId: number) {
    return await this.find({
      where: { pageId: pageId },
    });
  }

  public async deleteAllByPageId(pageId: number) {
    return this.createQueryBuilder('pageImage')
      .delete()
      .where('pageId = :pageId', { pageId: pageId })
      .execute();
  }
}