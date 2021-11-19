import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './Payment';

@Entity('coverletter_consulting')
export class CoverletterConsulting {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', { name: 'company_name', length: 255 })
  companyName: string;

  @Column('varchar', { name: 'question', length: 255 })
  question: string;

  @Column('text', { name: 'answer' })
  answer: string;

  @Column('text', { name: 'consulting', nullable: true })
  consulting: string | null;

  @ManyToMany(() => Payment, (payment) => payment.coverletterConsultings)
  payments: Payment[];
}
