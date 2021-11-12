import { UserTag } from "src/entities/UserTag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(UserTag)
export class UserTagRepository extends Repository<UserTag> {

}