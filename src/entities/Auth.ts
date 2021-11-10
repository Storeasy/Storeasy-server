import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, UpdateDateColumn } from "typeorm";

@Entity("auth")
export class Auth {
  @Column("varchar", { primary: true, name: "email"})
  email: string;

  @Column("char", { name: "code", nullable: true, length: 6 })
  code: string | null;

  @Column("int", { name: "attempt_count", default: () => "'0'" })
  attemptCount: number;

  @CreateDateColumn()
  @UpdateDateColumn()
  requestTime: Date;

}
