import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Entity("auth", { schema: "haecareer" })
export class Auth {
  @Column("varchar", { primary: true, name: "email"})
  email: string;

  @Column("char", { name: "code", nullable: true, length: 6 })
  code: string | null;

  @Column("int", { name: "attempt_count", default: () => "'0'" })
  attemptCount: number;

  @CreateDateColumn()
  requestTime: Date;

}
