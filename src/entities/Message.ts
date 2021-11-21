import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { MessageRoom } from './MessageRoom';
import { User } from './User';

@Entity('message')
export class Message {
  @Column('bigint', { primary: true, name: 'id' })
  id: number;

  @Column('bigint', { name: 'room_id' })
  roomId: number;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'content', length: 255 })
  content: string;

  @CreateDateColumn()
  sendTime: Date;

  @ManyToOne(() => MessageRoom, (messageRoom) => messageRoom.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'room_id', referencedColumnName: 'id' }])
  room: MessageRoom;

  @ManyToOne(() => User, (user) => user.messages, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
