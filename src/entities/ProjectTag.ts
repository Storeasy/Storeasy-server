import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Project } from "./Project";
import { Tag } from "./Tag";
import { UserTag } from "./UserTag";

@Index("tag_id", ["tagId"], {})
@Entity("project_tag", { schema: "storeasy" })
export class ProjectTag {
  @Column("bigint", { primary: true, name: "project_id" })
  projectId: number;

  @Column("bigint", { primary: true, name: "tag_id" })
  tagId: number;

  @Column("int", { name: "order_num", nullable: true })
  orderNum: number | null;

  @ManyToOne(() => Project, (project) => project.projectTags, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;

  @ManyToOne(() => Tag, (tag) => tag.projectTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;

  @ManyToOne(() => UserTag, (userTag) => userTag.projectTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "tagId" }])
  userTag: UserTag;
}
