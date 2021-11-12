import { Column, Entity } from "typeorm";

@Entity("auth", { schema: "storeasy" })
export class Auth {
  @Column("varchar", { primary: true, name: "email", length: 255 })
  email: string;

  @Column("char", { name: "code", nullable: true, length: 6 })
  code: string | null;

  @Column("int", { name: "attempt_count", default: () => "'0'" })
  attemptCount: number;

  @Column("datetime", {
    name: "request_time",
    default: () => "CURRENT_TIMESTAMP",
  })
  requestTime: Date;
}
