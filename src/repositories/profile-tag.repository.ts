import { ProfileTag } from "src/entities/ProfileTag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ProfileTag)
export class ProfileTagRepository extends Repository<ProfileTag> {
  async findByUserId(userId: number) {
    return await this.createQueryBuilder('profileTag')
      .where('profileTag.userId = :userId', { userId: userId })
      .leftJoinAndSelect('profileTag.tag', 'tag')
      .innerJoinAndSelect('tag.tagColor', 'tagColor')
      .orderBy('profileTag.orderNum')
      .getMany();
  }
}