import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserTag } from "./UserTag";

@Index("value", ["value"], { unique: true })
@Entity("tag_color", { schema: "storeasy" })
export class TagColor {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "value", unique: true, length: 30 })
  value: string;

  @OneToMany(() => UserTag, (userTag) => userTag.tagColor)
  userTags: UserTag[];
}
