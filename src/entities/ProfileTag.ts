import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";

@Index("tag_id", ["tagId"], {})
@Entity("profile_tag", { schema: "storeasy" })
export class ProfileTag {
  @Column("bigint", { primary: true, name: "user_id" })
  userId: number;

  @Column("bigint", { primary: true, name: "tag_id" })
  tagId: number;

  @Column("int", { name: "order_num", nullable: true })
  orderNum: number | null;

  @ManyToOne(() => User, (user) => user.profileTags, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Tag, (tag) => tag.profileTags, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_id", referencedColumnName: "id" }])
  tag: Tag;
}
