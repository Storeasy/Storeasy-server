import { Profile } from 'src/entities/Profile';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async findOneJoinUser(userId: number) {
    return await this.findOne({
      where: {
        userId: userId,
      },
      relations: ['user'],
    });
  }
}
