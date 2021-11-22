import { LikePage } from "src/entities/LikePage";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(LikePage)
export class LikePageRepository extends Repository<LikePage> {
  public async findAllPagesByUserId(userId: number) {
    return await this.createQueryBuilder('likePage')
      .where('likePage.sender = :userId', { userId: userId })
      .leftJoinAndSelect('likePage.page', 'page')
      .leftJoinAndSelect('page.project', 'project')
      .getMany();
  }
}