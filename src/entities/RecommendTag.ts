import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Tag } from "./Tag";

@Entity("recommend_tag", { schema: "storeasy" })
export class RecommendTag {
  @Column("bigint", { primary: true, name: "tag_id" })
  tagId: number;

  @OneToOne(() => Tag, (tag) => tag.recommendTag, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;
}
