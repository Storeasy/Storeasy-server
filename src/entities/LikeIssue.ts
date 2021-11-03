import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Page } from "./Page";

@Index("page_id", ["pageId"], {})
@Index("sender", ["sender"], {})
@Entity("like_issue", { schema: "haecareer" })
export class LikeIssue {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("bigint", { name: "sender" })
  sender: string;

  @Column("bigint", { name: "page_id" })
  pageId: string;

  @ManyToOne(() => User, (user) => user.likeIssues, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "sender", referencedColumnName: "id" }])
  senderUser: User;

  @ManyToOne(() => Page, (page) => page.likeIssues, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "page_id", referencedColumnName: "id" }])
  page: Page;
}