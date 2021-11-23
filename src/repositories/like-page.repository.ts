import { LikePage } from "src/entities/LikePage";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(LikePage)
export class LikePageRepository extends Repository<LikePage> {
  public async existsBySenderAndPageId(sender: number, pageId: number) {
    const likePage = await this.findOne({sender, pageId});
    if(likePage) {
      return true;
    }
    return false;
  }

  public async findAllPagesByUserId(userId: number) {
    return await this.createQueryBuilder('likePage')
      .where('likePage.sender = :userId', { userId: userId })
      .leftJoinAndSelect('likePage.page', 'page')
      .leftJoinAndSelect('page.project', 'project')
      .getMany();
  }

  public async findPageByUserIdAndPageId(userId: number, pageId: number) {
    return await this.createQueryBuilder('likePage')
      .where('likePage.sender = :userId', { userId: userId })
      .andWhere('likePage.pageId = :pageId', { pageId: pageId })
      .leftJoinAndSelect('likePage.page', 'page')
      .leftJoinAndSelect('page.project', 'project')
      .getOne();
  }
}