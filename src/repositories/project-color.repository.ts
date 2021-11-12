import { ProjectColor } from "src/entities/ProjectColor";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(ProjectColor)
export class ProjectColorRepository extends Repository<ProjectColor> {
  
}