import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './User';

@Entity('university')
export class University {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.university)
  users: User[];
}
