import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      
    ]),
  ],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}
