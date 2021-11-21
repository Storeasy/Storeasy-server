import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Message } from './Message';
import { User } from './User';

@Entity('message_room')
export class MessageRoom {
  @Column('bigint', { primary: true, name: 'id' })
  id: number;

  @Column('bigint', { name: 'sender', nullable: true })
  sender: number | null;

  @Column('bigint', { name: 'receiver', nullable: true })
  receiver: number | null;

  @Column('datetime', { name: 'last_message_time', nullable: true })
  lastMessageTime: Date | null;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @ManyToOne(() => User, (user) => user.messageRooms, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'sender', referencedColumnName: 'id' }])
  sender2: User;

  @ManyToOne(() => User, (user) => user.messageRooms2, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'receiver', referencedColumnName: 'id' }])
  receiver2: User;
}
