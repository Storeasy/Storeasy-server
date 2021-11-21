import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikePageRepository } from 'src/repositories/like-page.repository';
import { LikeUserRepository } from 'src/repositories/like-user.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LikeUserRepository,
      LikePageRepository,
      UserRepository,
      PageRepository,
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}