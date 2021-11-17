import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Payment } from './Payment';

@Entity('source_consulting')
export class SourceConsulting {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('varchar', { name: 'company_name', length: 255 })
  companyName: string;

  @Column('varchar', { name: 'question', length: 255 })
  question: string;

  @Column('varchar', { name: 'request', length: 255 })
  request: string;

  @Column('text', { name: 'consulting', nullable: true })
  consulting: string | null;

  @ManyToMany(() => Payment, (payment) => payment.sourceConsultings)
  payments: Payment[];
}
