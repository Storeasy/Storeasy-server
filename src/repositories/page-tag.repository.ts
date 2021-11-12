import { PageTag } from "src/entities/PageTag";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PageTag)
export class PageTagRepository extends Repository<PageTag> {
  
}