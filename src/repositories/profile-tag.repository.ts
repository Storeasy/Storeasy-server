import { ProfileTag } from "src/entities/ProfileTag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ProfileTag)
export class ProfileTagRepository extends Repository<ProfileTag> {
  
}