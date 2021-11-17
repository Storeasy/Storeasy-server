import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CoverletterQuestion } from './CoverletterQuestion';
import { User } from './User';

@Entity('coverletter_answer')
export class CoverletterAnswer {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @Column('bigint', { name: 'question_id' })
  coverletterQuestionId: number;

  @Column('varchar', { name: 'title', length: 255 })
  title: string;

  @Column('varchar', { name: 'company_name', length: 255 })
  companyName: string;

  @Column('text', { name: 'content' })
  content: string;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.coverletterAnswers, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(
    () => CoverletterQuestion,
    (coverletterQuestion) => coverletterQuestion.coverletterAnswers,
    { onDelete: 'CASCADE', onUpdate: 'NO ACTION' },
  )
  @JoinColumn([{ name: 'coverletter_question_id', referencedColumnName: 'id' }])
  coverletterQuestion: CoverletterQuestion;
}
