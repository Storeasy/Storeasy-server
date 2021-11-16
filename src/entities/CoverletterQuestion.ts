import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CoverletterAnswer } from "./CoverletterAnswer";
import { User } from "./User";

@Index("user_id", ["userId"], {})
@Entity("coverletter_question", { schema: "storeasy" })
export class CoverletterQuestion {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "content", length: 255 })
  content: string;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToMany(
    () => CoverletterAnswer,
    (coverletterAnswer) => coverletterAnswer.question
  )
  coverletterAnswers: CoverletterAnswer[];

  @ManyToOne(() => User, (user) => user.coverletterQuestions, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
