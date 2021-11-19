import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity('notification')
export class Notification {
  @Column('bigint', { primary: true, name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @Column('tinyint', { name: 'type' })
  type: number;

  @Column('varchar', { name: 'content', length: 255 })
  content: string;

  @CreateDateColumn()
  sendTime: Date;

  @ManyToOne(() => User, (user) => user.notifications, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
