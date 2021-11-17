import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagColorRepository } from 'src/repositories/tag-color.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TagRepository,
      TagColorRepository,
      UserRepository,
      UserTagRepository,
    ]),
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
