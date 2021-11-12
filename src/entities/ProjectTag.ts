import { Column, Entity } from "typeorm";

@Entity("project_tag")
export class ProjectTag {
  @Column("bigint", { primary: true, name: "project_id" })
  projectId: number;

  @Column("bigint", { primary: true, name: "tag_id" })
  tagId: number;

  @Column("int", { name: "order_num", nullable: true })
  orderNum: number | null;
}
