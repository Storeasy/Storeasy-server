import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExploreController } from './explore.controller';
import { ExploreService } from './explore.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      
    ]),
  ],
  controllers: [ExploreController],
  providers: [ExploreService]
})
export class ExploreModule {}
