import { Profile } from "src/entities/Profile";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  public async findOneByUserId(userId: number) {
    return this.findOne({
      where: {
        userId: userId,
      }
    });
  }
}