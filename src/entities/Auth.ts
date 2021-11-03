import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User";

@Index("email", ["email"], { unique: true })
@Entity("auth", { schema: "haecareer" })
export class Auth {
  @Column("bigint", { primary: true, name: "user_id" })
  userId: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("char", { name: "code", nullable: true, length: 6 })
  code: string | null;

  @Column("int", { name: "attempt_count", default: () => "'0'" })
  attemptCount: number;

  @CreateDateColumn()
  requestTime: Date;

  @OneToOne(() => User, (user) => user.auth, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;
}
