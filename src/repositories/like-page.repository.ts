import { LikePage } from "src/entities/LikePage";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(LikePage)
export class LikePageRepository extends Repository<LikePage> {
  
}