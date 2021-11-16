import { Column, Entity } from "typeorm";

@Entity("recommend_consluting_question", { schema: "storeasy" })
export class RecommendConslutingQuestion {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "content", length: 255 })
  content: string;
}
