import { ProjectTag } from 'src/entities/ProjectTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProjectTag)
export class ProjectTagRepository extends Repository<ProjectTag> {
  public async deleteAllByProjectId(projectId: number) {
    return this.createQueryBuilder('projectTag')
      .delete()
      .where('projectId = :projectId', { projectId: projectId })
      .execute();
  }
}
