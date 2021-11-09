import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/entities/Tag';
import { TagColor } from 'src/entities/TagColor';
import { tagColorRepository } from 'src/repositories/tag-color.repository';
import { TagRepository } from 'src/repositories/tag.repository';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TagRepository,
      tagColorRepository,
    ])
  ],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
