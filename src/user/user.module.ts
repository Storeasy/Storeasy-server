import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTagRepository } from 'src/repositories/user-tag.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTagRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
