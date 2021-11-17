import { Tag } from 'src/entities/Tag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  public async existsByName(name: string): Promise<boolean> {
    const tag = await this.findOne({ name });
    if (!tag) {
      return false;
    }
    return true;
  }

  public async findOneByName(name: string) {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  }

  public async findByIds(ids: number[]) {
    return await this.createQueryBuilder('tag').whereInIds(ids).getMany();
  }
}
