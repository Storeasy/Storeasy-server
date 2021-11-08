import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from '../ormconfig';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { AuthController } from './auth/auth.controller';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailModule } from './mail/mail.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }), 
    MorganModule,
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    MailModule,
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
