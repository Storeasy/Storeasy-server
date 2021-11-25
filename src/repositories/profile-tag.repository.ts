import { ProfileTag } from 'src/entities/ProfileTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProfileTag)
export class ProfileTagRepository extends Repository<ProfileTag> {
  public async findAllProfilesByTagId(tagId: number) {
    return await this.createQueryBuilder('profileTag')
      .where('profileTag.tagId = :tagId', { tagId: tagId })
      .leftJoinAndSelect('profileTag.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .andWhere('profile.isPublic = 1')
      .getMany();
  }

  public async findOneByUserId(userId: number) {
    return await this.findOne({
      where: { userId: userId },
      order: {
        orderNum: "ASC",
      },
    });
  }

  public async findAllUsersByTagIdExceptUserId(tagId: number, userId: number) {
    return await this.createQueryBuilder('profileTag')
      .where('profileTag.tagId = :tagId', { tagId: tagId })
      .andWhere('profileTag.userId != :userId', { userId: userId })
      .leftJoinAndSelect('profileTag.user', 'user')
      .andWhere('user.isPublic = 1')
      .getMany();
  }

  public async findAllPagesByTagIdJoinQuery(tagId: number) {
    return await this.query(
      `select * from profile_tag
      left join profile on profile.user_id = profile_tag.user_id
      left join page on page.user_id = profile.user_id
      where tag_id = ?
      order by page.created_at desc`,
      [tagId],
    );
  }

  public async findAllTagsByUserId(userId: number) {
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
