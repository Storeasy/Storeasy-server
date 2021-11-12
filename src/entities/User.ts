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
import { LikePage } from "./LikePage";
import { LikeUser } from "./LikeUser";
import { Page } from "./Page";
import { Profile } from "./Profile";
import { ProfileTag } from "./ProfileTag";
import { Project } from "./Project";
import { University } from "./University";
import { UserAgreement } from "./UserAgreement";
import { UserTag } from "./UserTag";

@Index("email", ["email"], { unique: true })
@Index("university_id", ["universityId"], {})
@Entity("user", { schema: "storeasy" })
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 255 })
  password: string;

  @Column("varchar", { name: "name", length: 20 })
  name: string;

  @Column("date", { name: "birth_date" })
  birthDate: string;

  @Column("year", { name: "admission_year" })
  admissionYear: number;

  @Column("varchar", { name: "university_name", length: 255 })
  universityName: string;

  @Column("int", { name: "university_id", nullable: true })
  universityId: number | null;

  @Column("varchar", { name: "department", length: 255 })
  department: string;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("datetime", { name: "deleted_at", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => LikePage, (likePage) => likePage.sender2)
  likePages: LikePage[];

  @OneToMany(() => LikeUser, (likeUser) => likeUser.sender2)
  likeUsers: LikeUser[];

  @OneToMany(() => LikeUser, (likeUser) => likeUser.receiver2)
  likeUsers2: LikeUser[];

  @OneToMany(() => Page, (page) => page.user)
  pages: Page[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => ProfileTag, (profileTag) => profileTag.user)
  profileTags: ProfileTag[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @ManyToOne(() => University, (university) => university.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "university_id", referencedColumnName: "id" }])
  university: University;

  @OneToMany(() => UserAgreement, (userAgreement) => userAgreement.user)
  userAgreements: UserAgreement[];

  @OneToMany(() => UserTag, (userTag) => userTag.user)
  userTags: UserTag[];
}
