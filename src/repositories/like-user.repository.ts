import { LikeUser } from "src/entities/LikeUser";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(LikeUser)
export class LikeUserRepository extends Repository<LikeUser> {
  
}