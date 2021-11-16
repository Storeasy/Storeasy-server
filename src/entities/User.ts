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
import { CoverletterAnswer } from "./CoverletterAnswer";
import { CoverletterQuestion } from "./CoverletterQuestion";
import { LikePage } from "./LikePage";
import { LikeUser } from "./LikeUser";
import { Message } from "./Message";
import { MessageRoom } from "./MessageRoom";
import { Notification } from "./Notification";
import { Page } from "./Page";
import { Payment } from "./Payment";
import { Profile } from "./Profile";
import { ProfileTag } from "./ProfileTag";
import { Project } from "./Project";
import { UserAgreement } from "./UserAgreement";
import { University } from "./University";
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

  @Column("tinyint", { name: "is_public", width: 1, default: () => "'1'" })
  isPublic: boolean;

  @Column("tinyint", {
    name: "message_acceptable",
    width: 1,
    default: () => "'1'",
  })
  messageAcceptable: boolean;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @OneToMany(
    () => CoverletterAnswer,
    (coverletterAnswer) => coverletterAnswer.user
  )
  coverletterAnswers: CoverletterAnswer[];

  @OneToMany(
    () => CoverletterQuestion,
    (coverletterQuestion) => coverletterQuestion.user
  )
  coverletterQuestions: CoverletterQuestion[];

  @OneToMany(() => LikePage, (likePage) => likePage.sender2)
  likePages: LikePage[];

  @OneToMany(() => LikeUser, (likeUser) => likeUser.sender2)
  likeUsers: LikeUser[];

  @OneToMany(() => LikeUser, (likeUser) => likeUser.receiver2)
  likeUsers2: LikeUser[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => MessageRoom, (messageRoom) => messageRoom.sender2)
  messageRooms: MessageRoom[];

  @OneToMany(() => MessageRoom, (messageRoom) => messageRoom.receiver2)
  messageRooms2: MessageRoom[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Page, (page) => page.user)
  pages: Page[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => ProfileTag, (profileTag) => profileTag.user)
  profileTags: ProfileTag[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => UserAgreement, (userAgreement) => userAgreement.user)
  userAgreements: UserAgreement[];

  @ManyToOne(() => University, (university) => university.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "university_id", referencedColumnName: "id" }])
  university: University;

  @OneToMany(() => UserTag, (userTag) => userTag.user)
  userTags: UserTag[];
}
