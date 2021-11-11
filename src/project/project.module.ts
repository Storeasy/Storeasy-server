import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectColorRepository } from 'src/repositories/project-color.repository';
import { ProjectRepository } from 'src/repositories/project.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectRepository,
      ProjectColorRepository,
      UserRepository,
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
