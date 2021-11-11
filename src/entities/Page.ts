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
import { LikePage } from "./LikePage";
import { Project } from "./Project";
import { PageImage } from "./PageImage";
import { PageTag } from "./PageTag";

@Index("project_id", ["projectId"], {})
@Entity("page")
export class Page {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("varchar", { name: "content", length: 3000 })
  content: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("bigint", { name: "project_id", nullable: true })
  projectId: string | null;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToMany(() => LikePage, (likePage) => likePage.page)
  likePages: LikePage[];

  @ManyToOne(() => Project, (project) => project.pages, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "project_id", referencedColumnName: "id" }])
  project: Project;

  @OneToMany(() => PageImage, (pageImage) => pageImage.page)
  pageImages: PageImage[];

  @OneToMany(() => PageTag, (pageTag) => pageTag.page)
  pageTags: PageTag[];
}
