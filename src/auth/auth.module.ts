import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './strategy/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { UserRepository } from 'src/repositories/user.repository';
import { UserAgreementRepository } from 'src/repositories/user-agreement.repository';
import { AgreementRepository } from 'src/repositories/agreement.repository';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([
      User, 
      Auth, 
      LikeIssue, 
      Page, 
      Project, 
      ProjectColor, 
      PageImage,
      PageTag,
      Tag,
      ProfileTag,
      TagColor,
      UserTag,
      LikeUser,
      Profile,
      University,
      UserAgreement,
      Agreement,
      UserRepository,
      AgreementRepository,
      UserAgreementRepository,
    ]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
