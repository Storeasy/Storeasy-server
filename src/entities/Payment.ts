import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CoverletterConsulting } from './CoverletterConsulting';
import { User } from './User';
import { SourceConsulting } from './SourceConsulting';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @Column('tinyint', { name: 'type', width: 1 })
  type: number;

  @CreateDateColumn()
  paymentDate: Date | null;

  @Column('varchar', {
    name: 'responsibility_name',
    nullable: true,
    length: 255,
  })
  responsibilityName: string | null;

  @Column('varchar', {
    name: 'responsibility_info',
    nullable: true,
    length: 255,
  })
  responsibilityInfo: string | null;

  @ManyToMany(
    () => CoverletterConsulting,
    (coverletterConsulting) => coverletterConsulting.payments,
  )
  @JoinTable({
    name: 'payment_coverletter',
    joinColumns: [{ name: 'payment_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [
      { name: 'coverletter_id', referencedColumnName: 'id' },
    ],
    schema: 'storeasy',
  })
  coverletterConsultings: CoverletterConsulting[];

  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToMany(
    () => SourceConsulting,
    (sourceConsulting) => sourceConsulting.payments,
  )
  @JoinTable({
    name: 'payment_source',
    joinColumns: [{ name: 'payment_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'source_id', referencedColumnName: 'id' }],
    schema: 'storeasy',
  })
  sourceConsultings: SourceConsulting[];
}
