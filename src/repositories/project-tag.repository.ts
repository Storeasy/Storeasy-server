import { ProjectTag } from 'src/entities/ProjectTag';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(ProjectTag)
export class ProjectTagRepository extends Repository<ProjectTag> {
  public async findAllJoinQuery(projectId: number) {
    return await this.query(
      `
      select * from project_tag
      left join tag on project_tag.tag_id = tag.id
      left join user_tag on project_tag.tag_id = user_tag.tag_id
      left join tag_color on user_tag.tag_color_id = tag_color.id
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
