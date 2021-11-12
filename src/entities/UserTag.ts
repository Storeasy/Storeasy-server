import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";
import { TagColor } from "./TagColor";

@Index("tag_color_id", ["tagColorId"], {})
@Index("tag_id", ["tagId"], {})
@Entity("user_tag")
export class UserTag {
  @Column("bigint", { primary: true, name: "user_id" })
  userId: number;

  @Column("bigint", { primary: true, name: "tag_id" })
  tagId: number;

  @Column("int", { name: "order_num", nullable: true })
  orderNum: number | null;

  @Column("int", { name: "tag_color_id", nullable: true })
  tagColorId: number | null;

  @ManyToOne(() => User, (user) => user.userTags, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Tag, (tag) => tag.userTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;

  @ManyToOne(() => TagColor, (tagColor) => tagColor.userTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_color_id", referencedColumnName: "id" }])
  tagColor: TagColor;
}
