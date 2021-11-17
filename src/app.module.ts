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
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
import { Project } from './entities/Project';
import { ProjectColor } from './entities/ProjectColor';
import { ProjectTag } from './entities/ProjectTag';
import { RecommendConslutingQuestion } from './entities/RecommendConslutingQuestion';
import { RecommendTag } from './entities/RecommendTag';
import { RefreshToken } from './entities/RefreshToken';
import { SourceConsulting } from './entities/SourceConsulting';
import { Tag } from './entities/Tag';
import { TagColor } from './entities/TagColor';
import { University } from './entities/University';
import { User } from './entities/User';
import { UserAgreement } from './entities/UserAgreement';
import { UserTag } from './entities/UserTag';
import { Agreement } from './entities/Agreement';
import { Auth } from './entities/Auth';
import { CoverletterAnswer } from './entities/CoverletterAnswer';
import { CoverletterConsulting } from './entities/CoverletterConsulting';
import { CoverletterQuestion } from './entities/CoverletterQuestion';
import { LikePage } from './entities/LikePage';
import { LikeUser } from './entities/LikeUser';
import { Message } from './entities/Message';
import { MessageRoom } from './entities/MessageRoom';
import { Page } from './entities/Page';
import { PageImage } from './entities/PageImage';
import { PageTag } from './entities/PageTag';
import { Payment } from './entities/Payment';
import { Profile } from './entities/Profile';
import { Notification } from './entities/Notification';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env',
    }),
    MorganModule,
    // TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_SCHEMA,
      entities: [
        Agreement,
        Auth,
        CoverletterAnswer,
        CoverletterConsulting,
        CoverletterQuestion,
        LikePage,
        LikeUser,
        Message,
        MessageRoom,
        Notification,
        Page,
        PageImage,
        PageTag,
        Payment,
        Profile,
        Project,
        ProjectColor,
        ProjectTag,
        RecommendConslutingQuestion,
        RecommendTag,
        RefreshToken,
        SourceConsulting,
        Tag,
        TagColor,
        University,
        User,
        UserAgreement,
        UserTag,
      ],
      autoLoadEntities: true,
      charset: 'utf8mb4',
      synchronize: false,
      logging: true,
      keepConnectionAlive: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    AuthModule,
    MailModule,
    ProfileModule,
    TagModule,
    S3Module,
    ProjectModule,
    PageModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('combined'),
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
