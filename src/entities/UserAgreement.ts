import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Agreement } from "./Agreement";

@Index("agreement_id", ["agreementId"], {})
@Entity("user_agreement", { schema: "storeasy" })
export class UserAgreement {
  @Column("bigint", { primary: true, name: "user_id" })
  userId: number;

  @Column("int", { primary: true, name: "agreement_id" })
  agreementId: number;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.userAgreements, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Agreement, (agreement) => agreement.userAgreements, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "agreement_id", referencedColumnName: "id" }])
  agreement: Agreement;
}
