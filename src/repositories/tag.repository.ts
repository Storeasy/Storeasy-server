import { Tag } from "src/entities/Tag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  public async existsByName(name: string): Promise<Boolean> {
    const tag = await this.findOne({name});
    if (!tag) {
      return false;
    }
    return true;
  }

  public async findOneByName(name: string) {
    return await this.findOne({
      where: {
        name: name
      }, 
      relations: ['tagColor']});
  }

  public async findByIds(ids: number[]) {
    return await this.createQueryBuilder()
      .whereInIds(ids)
      .getMany();
  }
}