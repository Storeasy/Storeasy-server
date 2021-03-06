import { Page } from 'src/entities/Page';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {
  public async findAllByIds(pageIds: number[]) {
    return await this.createQueryBuilder('page')
      .whereInIds(pageIds)
      .leftJoinAndSelect('page.project', 'project')
      .leftJoinAndSelect('project.projectColor', 'projectColor')
      .orderBy('page.startDate', 'DESC')
      .getMany();
  }

  public async findStoreasyPages() {
    return await this.find({
      where: { userId: 17 },
      order: {
        createdAt: "DESC",
      },
      take: 3,
    });
  }

  public async findStoreasyPageByPageId(pageId: number) {
    return await this.findOne({
      where: { userId: 17, id: pageId }
    });
  }

  public async findAllByProjectId(projectId: number) {
    return await this.createQueryBuilder('page')
      .where('page.projectId = :projectId', { projectId: projectId })
      .leftJoinAndSelect('page.project', 'project')
      .leftJoinAndSelect('project.projectColor', 'projectColor')
      .orderBy('page.startDate', 'DESC')
      .getMany();
  }

  public async findAllRecentPages(userId: number) {
    return await this.find({
      where: { userId: !userId, isPublic: true },
      relations: ['project'],
      order: {
        createdAt: "DESC",
      },
      take: 100,
    });
  }

  public async findRecentPageByUserId(userId: number) {
    return await this.findOne({
      where: { userId: userId, isPublic: true },
      relations: ['project'],
      order: {
        createdAt: "DESC",
      }
    });
  }

  public async findOneByPageId(pageId: number) {
    return await this.createQueryBuilder('page')
    .where('page.id = :pageId', { pageId: pageId })
    .leftJoinAndSelect('page.project', 'project')
    .leftJoinAndSelect('project.projectColor', 'projectColor')
    .getOne();
  }

  public async findAllSinglePageByUserId(userId: number) {
    return await this.find({
      where: {
        userId: userId,
        projectId: null,
      },
    });
  }
}
