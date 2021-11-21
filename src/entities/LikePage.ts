import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Page } from './Page';

@Entity('like_page')
export class LikePage {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('bigint', { name: 'sender' })
  sender: number;

  @Column('bigint', { name: 'page_id' })
  pageId: number;

  @CreateDateColumn()
  createdAt: Date | null;

  @ManyToOne(() => User, (user) => user.likePages, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'sender', referencedColumnName: 'id' }])
  sender2: User;

  @ManyToOne(() => Page, (page) => page.likePages, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'page_id', referencedColumnName: 'id' }])
  page: Page;
}
