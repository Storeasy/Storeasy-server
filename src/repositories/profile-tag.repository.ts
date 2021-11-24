import { ProfileTag } from 'src/entities/ProfileTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProfileTag)
export class ProfileTagRepository extends Repository<ProfileTag> {
  public async findOneByUserId(userId: number) {
    return await this.findOne({
      where: { userId: userId },
      order: {
        orderNum: "ASC",
      }
    });
  }

  public async findAllByUserId(userId: number) {
    return await this.find({
      where: { userId: userId },
    });
  }

  public async findAllByUserIdJoinTag(userId: number) {
    return await this.createQueryBuilder('profileTag')
      .where('profileTag.userId = :userId', { userId: userId })
      .leftJoinAndSelect('profileTag.tag', 'tag')
      .orderBy('profileTag.orderNum')
      .getMany();
  }

  public async deleteAllByUserId(userId: number) {
    return this.createQueryBuilder('profileTag')
      .delete()
      .where('userId = :userId', { userId: userId })
      .execute();
  }
}
