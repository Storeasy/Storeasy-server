import { Column, Entity } from "typeorm";

@Entity("project_tag", { schema: "haecareer" })
export class ProjectTag {
  @Column("bigint", { primary: true, name: "project_id" })
  projectId: string;

  @Column("bigint", { primary: true, name: "tag_id" })
  tagId: string;

  @Column("int", { name: "order_num", nullable: true })
  orderNum: number | null;
}
