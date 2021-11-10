import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Page } from "./Page";
import { ProjectColor } from "./ProjectColor";

@Index("project_color_id", ["projectColorId"], {})
@Entity("project")
export class Project {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

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

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToMany(() => Page, (page) => page.project)
  pages: Page[];

  @ManyToOne(() => ProjectColor, (projectColor) => projectColor.projects, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_color_id", referencedColumnName: "id" }])
  projectColor: ProjectColor;
}
