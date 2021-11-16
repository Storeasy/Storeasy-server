import { Column, Entity, OneToMany } from "typeorm";
import { UserAgreement } from "./UserAgreement";

@Entity("agreement", { schema: "storeasy" })
export class Agreement {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "title", length: 255 })
  title: string;

  @Column("varchar", { name: "content", length: 255 })
  content: string;

  @OneToMany(() => UserAgreement, (userAgreement) => userAgreement.agreement)
  userAgreements: UserAgreement[];
}
