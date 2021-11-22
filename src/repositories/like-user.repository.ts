import { LikeUser } from "src/entities/LikeUser";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(LikeUser)
export class LikeUserRepository extends Repository<LikeUser> {
  public async findAllUsersByUserId(userId: number) {
    return await this.createQueryBuilder('likeUser')
      .where('likeUser.sender = :userId', { userId: userId })
      .leftJoinAndSelect('likeUser.receiverUser', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .getMany();
  }
}