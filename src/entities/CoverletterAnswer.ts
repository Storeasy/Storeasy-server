import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { CoverletterQuestion } from "./CoverletterQuestion";

@Index("question_id", ["questionId"], {})
@Index("user_id", ["userId"], {})
@Entity("coverletter_answer", { schema: "storeasy" })
export class CoverletterAnswer {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("bigint", { name: "question_id" })
  questionId: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("varchar", { name: "company_name", length: 255 })
  companyName: string;

  @Column("text", { name: "content" })
  content: string;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.coverletterAnswers, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(
    () => CoverletterQuestion,
    (coverletterQuestion) => coverletterQuestion.coverletterAnswers,
    { onDelete: "CASCADE", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "question_id", referencedColumnName: "id" }])
  question: CoverletterQuestion;
}
