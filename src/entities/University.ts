import { Column, Entity, Index, OneToMany } from "typeorm";
import { User } from "./User";

@Index("name", ["name"], { unique: true })
@Entity("university", { schema: "haecareer" })
export class University {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 255 })
  name: string;

  @OneToMany(() => User, (user) => user.university)
  users: User[];
}
