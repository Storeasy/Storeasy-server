import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { User } from 'src/entities/User';
import { Auth } from 'src/entities/Auth';
import { LikeIssue } from 'src/entities/LikeIssue';
import { Page } from 'src/entities/Page';
import { Agreement } from 'src/entities/Agreement';
import { LikeUser } from 'src/entities/LikeUser';
import { PageImage } from 'src/entities/PageImage';
import { PageTag } from 'src/entities/PageTag';
import { Profile } from 'src/entities/Profile';
import { ProfileTag } from 'src/entities/ProfileTag';
import { Project } from 'src/entities/Project';
import { ProjectColor } from 'src/entities/ProjectColor';
import { Tag } from 'src/entities/Tag';
import { TagColor } from 'src/entities/TagColor';
import { University } from 'src/entities/University';
import { UserAgreement } from 'src/entities/UserAgreement';
import { UserTag } from 'src/entities/UserTag';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from 'src/repositories/auth.repository';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthRepository,
    ]),
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('MAIL_HOST'),
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('MAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'mail/templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
