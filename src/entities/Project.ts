import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Page } from './Page';
import { User } from './User';
import { ProjectColor } from './ProjectColor';
import { ProjectTag } from './ProjectTag';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('bigint', { name: 'user_id' })
  userId: number;

  @Column('varchar', { name: 'title', length: 30 })
  title: string;

  @Column('varchar', { name: 'description', nullable: true, length: 150 })
  description: string | null;

  @Column('date', { name: 'start_date' })
  startDate: string;

  @Column('date', { name: 'end_date' })
  endDate: string;

  @Column('tinyint', { name: 'is_public', width: 1, default: () => "'1'" })
  isPublic: boolean;

  @Column('int', { name: 'project_color_id', nullable: true })
  projectColorId: number | null;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToMany(() => Page, (page) => page.project)
  pages: Page[];

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;

  @ManyToOne(() => ProjectColor, (projectColor) => projectColor.projects, {
    onDelete: 'SET NULL',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'project_color_id', referencedColumnName: 'id' }])
  projectColor: ProjectColor;

  @OneToMany(() => ProjectTag, (projectTag) => projectTag.project)
  projectTags: ProjectTag[];
}
