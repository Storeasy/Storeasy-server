import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageImage } from 'src/entities/PageImage';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProjectTagRepository } from 'src/repositories/project-tag.repository';
import { ProjectRepository } from 'src/repositories/project.repository';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserTagRepository,
      ProjectRepository,
      ProjectTagRepository,
      PageRepository,
      PageImageRepository,
      PageTagRepository,
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
