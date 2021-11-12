import { Page } from "src/entities/Page";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Page)
export class PageRepository extends Repository<Page> {
  
}