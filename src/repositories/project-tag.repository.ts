import { ProjectTag } from 'src/entities/ProjectTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProjectTag)
export class ProjectTagRepository extends Repository<ProjectTag> {
  public async findAllByProjectId(projectId: number) {
    return await this.find({
      where: { projectId: projectId },
    });
  }

  public async findAllTagsByProjectId(projectId: number) {
    return await this.query(
      `
      select * from project_tag
      left join tag on project_tag.tag_id = tag.id
      where project_id = ?`,
      [projectId],
    );
  }

  public async deleteAllByProjectId(projectId: number) {
    return this.createQueryBuilder('projectTag')
      .delete()
      .where('projectTag.projectId = :projectId', { projectId: projectId })
      .execute();
  }
}
