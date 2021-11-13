import { Project } from "src/entities/Project";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Project)
export class ProjectRepository extends Repository<Project> {
  public async findAllByUserId(userId: number) {
    return await this.find({
      where: { userId: userId },
      relations: ['projectColor']
    });
  }
}