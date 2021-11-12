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
import { MailModule } from './mail/mail.module';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { TagModule } from './tag/tag.module';
import { S3Service } from './s3/s3.service';
import { S3Module } from './s3/s3.module';
import { ProjectModule } from './project/project.module';
import { PageModule } from './page/page.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env',
    }), 
    MorganModule,
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    MailModule,
    ProfileModule,
    TagModule,
    S3Module,
    ProjectModule,
    PageModule,
  ],
  controllers: [AuthController, ProfileController],
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
    },
    S3Service,
  ],
})
export class AppModule {}
