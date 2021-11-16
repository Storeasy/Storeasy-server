import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity("profile", { schema: "storeasy" })
export class Profile {
  @Column("bigint", { primary: true, name: "user_id" })
  userId: number;

  @Column("varchar", { name: "profile_image", nullable: true, length: 255 })
  profileImage: string | null;

  @Column("varchar", { name: "nickname", nullable: true, length: 20 })
  nickname: string | null;

  @Column("varchar", { name: "university_name", length: 255 })
  universityName: string;

  @Column("varchar", { name: "department", length: 255 })
  department: string;

  @Column("varchar", { name: "contact", nullable: true, length: 255 })
  contact: string | null;

  @Column("varchar", { name: "bio", nullable: true, length: 255 })
  bio: string | null;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
