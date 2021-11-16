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
import { User } from "./User";
import { Project } from "./Project";
import { PageImage } from "./PageImage";
import { PageTag } from "./PageTag";

@Index("project_id", ["projectId"], {})
@Index("user_id", ["userId"], {})
@Entity("page", { schema: "storeasy" })
export class Page {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("bigint", { name: "user_id" })
  userId: number;

  @Column("varchar", { name: "title", length: 50 })
  title: string;

  @Column("varchar", { name: "content", length: 3000 })
  content: string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column("tinyint", { name: "is_public", width: 1, default: () => "'1'" })
  isPublic: boolean;

  @Column("bigint", { name: "project_id", nullable: true })
  projectId: string | null;

  @CreateDateColumn()
  createdAt: Date | null;

  @UpdateDateColumn()
  updatedAt: Date | null;

  @OneToMany(() => LikePage, (likePage) => likePage.page)
  likePages: LikePage[];

  @ManyToOne(() => User, (user) => user.pages, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

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
