import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";

@Index("tag_id", ["tagId"], {})
@Entity("profile_tag", { schema: "haecareer" })
export class ProfileTag {
  @Column("bigint", { primary: true, name: "user_id" })
  userId: string;

  @Column("bigint", { primary: true, name: "tag_id" })
  tagId: string;

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
