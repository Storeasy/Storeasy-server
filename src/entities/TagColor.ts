import { Column, Entity, Index, OneToMany } from 'typeorm';
import { UserTag } from './UserTag';

@Entity('tag_color')
export class TagColor {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'value', unique: true, length: 30 })
  value: string;

  @OneToMany(() => UserTag, (userTag) => userTag.tagColor)
  userTags: UserTag[];
}
