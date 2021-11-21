import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Agreement } from './Agreement';

@Entity('user_agreement')
export class UserAgreement {
  @Column('bigint', { primary: true, name: 'user_id' })
  userId: string;

  @Column('int', { primary: true, name: 'agreement_id' })
  agreementId: number;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.userAgreements, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => Agreement, (agreement) => agreement.userAgreements, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'agreement_id', referencedColumnName: 'id' }])
  agreement: Agreement;
}
