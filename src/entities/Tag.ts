import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PageTag } from "./PageTag";
import { ProfileTag } from "./ProfileTag";
import { RecommendTag } from "./RecommendTag";
import { TagColor } from "./TagColor";
import { UserTag } from "./UserTag";

@Index("name", ["name"], { unique: true })
@Index("tag_color_id", ["tagColorId"], {})
@Entity("tag")
export class Tag {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "name", unique: true, length: 20 })
  name: string;

  @Column("int", { name: "tag_color_id", nullable: true })
  tagColorId: number | null;

  @OneToMany(() => PageTag, (pageTag) => pageTag.tag)
  pageTags: PageTag[];

  @OneToMany(() => ProfileTag, (profileTag) => profileTag.tag)
  profileTags: ProfileTag[];

  @ManyToOne(() => TagColor, (tagColor) => tagColor.tags, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "tag_color_id", referencedColumnName: "id" }])
  tagColor: TagColor;

  @OneToMany(() => UserTag, (userTag) => userTag.tag)
  userTags: UserTag[];

  @OneToOne(() => RecommendTag, (recommendTag) => recommendTag.tag)
  recommendTag: RecommendTag;
}
