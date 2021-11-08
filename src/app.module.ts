import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from '../ormconfig';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MorganModule,
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("combined"),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
