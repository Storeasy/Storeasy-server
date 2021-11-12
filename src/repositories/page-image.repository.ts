import { PageImage } from "src/entities/PageImage";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(PageImage)
export class PageImageRepository extends Repository<PageImage> {
  
}