import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity('like_user')
export class LikeUser {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('bigint', { name: 'sender' })
  sender: number;

  @Column('bigint', { name: 'receiver' })
  receiver: number;

  @CreateDateColumn()
  createdAt: Date | null;

  @ManyToOne(() => User, (user) => user.likeUsers, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'sender', referencedColumnName: 'id' }])
  sender2: User;

  @ManyToOne(() => User, (user) => user.likeUsers2, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'receiver', referencedColumnName: 'id' }])
  receiver2: User;
}
