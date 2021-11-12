import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PageTag } from "./PageTag";
import { ProfileTag } from "./ProfileTag";
import { ProjectTag } from "./ProjectTag";
import { RecommendTag } from "./RecommendTag";
import { UserTag } from "./UserTag";

@Index("name", ["name"], { unique: true })
@Entity("tag", { schema: "storeasy" })
export class Tag {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 20 })
  name: string;

  @OneToMany(() => PageTag, (pageTag) => pageTag.tag)
  pageTags: PageTag[];

  @OneToMany(() => ProfileTag, (profileTag) => profileTag.tag)
  profileTags: ProfileTag[];

  @OneToMany(() => ProjectTag, (projectTag) => projectTag.tag)
  projectTags: ProjectTag[];

  @OneToOne(() => RecommendTag, (recommendTag) => recommendTag.tag)
  recommendTag: RecommendTag;

  @OneToMany(() => UserTag, (userTag) => userTag.tag)
  userTags: UserTag[];
}
