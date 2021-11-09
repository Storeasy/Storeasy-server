import { TagColor } from "src/entities/TagColor";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TagColor)
export class tagColorRepository extends Repository<TagColor> {
  public async getRandomOne() {
    return this.createQueryBuilder('tagColor')
      .select()
      .orderBy('RAND()')
      .getOne();
  }
}