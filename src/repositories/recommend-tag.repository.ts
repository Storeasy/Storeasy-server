import { RecommendTag } from 'src/entities/RecommendTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(RecommendTag)
export class RecommendTagRepository extends Repository<RecommendTag> {
  public async findAll() {
    return await this.createQueryBuilder('recommendTag')
      .leftJoinAndSelect('recommendTag.tag', 'tag')
      .getMany();
  }
}
