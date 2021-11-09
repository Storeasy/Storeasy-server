import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Tag } from "./Tag";

@Index("tag_id", ["tagId"], { unique: true })
@Entity("recommend_tag", { schema: "haecareer" })
export class RecommendTag {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("bigint", { name: "tag_id", unique: true })
  tagId: string;

  @OneToOne(() => Tag, (tag) => tag.recommendTag, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;
}
