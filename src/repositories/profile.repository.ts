import { Profile } from "src/entities/Profile";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Profile)
export class profileRepository extends Repository<Profile> {

}