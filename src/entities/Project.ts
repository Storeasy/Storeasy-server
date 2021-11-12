import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Page } from "./Page";
import { User } from "./User";
import { ProjectColor } from "./ProjectColor";
import { ProjectTag } from "./ProjectTag";

@Index("user_id", ["userId"], {})
@Index("project_color_id", ["projectColorId"], {})
@Entity("project", { schema: "storeasy" })
export class Project {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "title", length: 30 })
  title: string;

  @Column("varchar", { name: "description", nullable: true, length: 150 })
  description: string | null;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("int", { name: "project_color_id", nullable: true })
  projectColorId: number | null;

  @Column("datetime", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("datetime", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Page, (page) => page.project)
  pages: Page[];

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => ProjectColor, (projectColor) => projectColor.projects, {
    onDelete: "SET NULL",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_color_id", referencedColumnName: "id" }])
  projectColor: ProjectColor;

  @OneToMany(() => ProjectTag, (projectTag) => projectTag.project)
  projectTags: ProjectTag[];
}
