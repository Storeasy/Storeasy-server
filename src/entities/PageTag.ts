import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Page } from './Page';
import { Tag } from './Tag';
import { UserTag } from './UserTag';

@Entity('page_tag')
export class PageTag {
  @Column('bigint', { primary: true, name: 'page_id' })
  pageId: number;

  @Column('bigint', { primary: true, name: 'tag_id' })
  tagId: number;

  @Column('int', { name: 'order_num', nullable: true })
  orderNum: number | null;

  @ManyToOne(() => Page, (page) => page.pageTags, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'page_id', referencedColumnName: 'id' }])
  page: Page;

  @ManyToOne(() => Tag, (tag) => tag.pageTags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'id' }])
  tag: Tag;

  @ManyToOne(() => UserTag, (userTag) => userTag.pageTags, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'tag_id', referencedColumnName: 'tagId' }])
  userTag: UserTag;
}
