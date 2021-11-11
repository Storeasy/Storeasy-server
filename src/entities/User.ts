import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { LikePage } from "./LikePage";
import { LikeUser } from "./LikeUser";
import { Profile } from "./Profile";
import { ProfileTag } from "./ProfileTag";
import { University } from "./University";
import { UserAgreement } from "./UserAgreement";
import { UserTag } from "./UserTag";
import { IsEmail } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Page } from "./Page";
import { Project } from "./Project";

@Index("email", ["email"], { unique: true })
@Index("university_id", ["universityId"], {})
@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

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

  @Column("int", { name: "university_id" })
  universityId: number;

  @Column("varchar", { name: "university_name", length: 255})
  universityName: string;

  @Column("varchar", { name: "department", length: 255 })
  department: string;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(() => LikePage, (likePage) => likePage.senderUser)
  likePages: LikePage[];

  @OneToMany(() => LikeUser, (likeUser) => likeUser.senderUser)
  likeUsers: LikeUser[];

  @OneToMany(() => LikeUser, (likeUser) => likeUser.receiverUser)
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
