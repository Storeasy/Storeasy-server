import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Project } from './Project';

@Entity('project_color')
export class ProjectColor {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'value', unique: true, length: 30 })
  value: string;

  @OneToMany(() => Project, (project) => project.projectColor)
  projects: Project[];
}
