import { Auth } from "src/entities/Auth";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {
  public async findOneByEmail(email: string) {
    return await this.findOne({email});
  }
}