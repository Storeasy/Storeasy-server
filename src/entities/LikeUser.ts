import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("receiver", ["receiver"], {})
@Index("sender", ["sender"], {})
@Entity("like_user", { schema: "haecareer" })
export class LikeUser {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "sender" })
  sender: string;

  @Column("bigint", { name: "receiver" })
  receiver: string;

  @ManyToOne(() => User, (user) => user.likeUsers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "sender", referencedColumnName: "id" }])
  senderUser: User;

  @ManyToOne(() => User, (user) => user.likeUsers2, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "receiver", referencedColumnName: "id" }])
  receiverUser: User;
}
