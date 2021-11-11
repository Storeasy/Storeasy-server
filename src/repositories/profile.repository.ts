import { Profile } from "src/entities/Profile";
import { ProfileTag } from "src/entities/ProfileTag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async findOneByUserId(userId: number) {
    return await this.findOne({
      where: {
        userId: userId,
      },
      relations: ['user']
    });
  }
}