import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Page } from './Page';

@Entity('page_image')
export class PageImage {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('bigint', { name: 'page_id' })
  pageId: number;

  @Column('varchar', { name: 'image_url', length: 255 })
  imageUrl: string;

  @Column('int', { name: 'order_num', nullable: true })
  orderNum: number | null;

  @ManyToOne(() => Page, (page) => page.pageImages, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'page_id', referencedColumnName: 'id' }])
  page: Page;
}
