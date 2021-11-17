import { User } from 'src/entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findOneByEmail(email: string) {
    return await this.findOne({ email });
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findOne({ email });
    if (!user) {
      return false;
    }
    return true;
  }
}
