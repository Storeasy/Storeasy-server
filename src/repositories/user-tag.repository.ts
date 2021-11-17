import { UserTag } from 'src/entities/UserTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserTag)
export class UserTagRepository extends Repository<UserTag> {
  public async findAllByUserId(userId: number) {
    return await this.find({
      where: { userId: userId },
      relations: ['tag', 'tagColor'],
    });
  }
}
