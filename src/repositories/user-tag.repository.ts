import { UserTag } from 'src/entities/UserTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserTag)
export class UserTagRepository extends Repository<UserTag> {
  public async findAllByUserIdAndTagIds(userId: number, tagIds: number[]) {
    if (tagIds.length == 0) {
      return [];
    } else {
      return await this.createQueryBuilder('userTag')
      .where('userTag.userId = :userId', { userId: userId })
      .andWhere('userTag.tagId IN (:tagIds)', { tagIds: tagIds })
      .leftJoinAndSelect('userTag.tag', 'tag')
      .leftJoinAndSelect('userTag.tagColor', 'tagColor')
      .getMany();
    }  
  }

  public async findAllByUserId(userId: number) {
    return await this.find({
      where: { userId: userId },
      relations: ['tag', 'tagColor'],
      order: {
        orderNum: "ASC",
      }
    });
  }

  public async getOneMaxOrderNumByUserId(userId: number) {
    return await this.createQueryBuilder('userTag')
      .select('MAX(userTag.orderNum) as max')
      .where('userTag.userId = :userId', { userId: userId })
      .getRawOne();
  }

  public async findAllPagesByUserIdAndTagId(userId: number, tagId: number) {
    return await this.createQueryBuilder('userTag')
      .where('userTag.userId = :userId and userTag.tagId = :tagId', {
        userId: userId,
        tagId: tagId,
      })
      .leftJoinAndSelect('userTag.pageTags', 'pageTag')
      .leftJoinAndSelect('pageTag.page', 'page')
      .getOne();
  }
}
