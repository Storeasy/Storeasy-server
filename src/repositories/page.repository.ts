import { Page } from "src/entities/Page";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {
  public async findOneByPageId(pageId: number) {
    return await this.createQueryBuilder('page')
      .leftJoinAndSelect('page.project', 'project')
      .getOne();
  }

  public async findAllSinglePageByUserId(userId: number) {
    return await this.find({
      where: {
        userId: userId,
        projectId: null,
      }
    });
  }
}