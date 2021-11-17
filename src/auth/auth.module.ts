import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './strategy/constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repositories/user.repository';
import { UserAgreementRepository } from 'src/repositories/user-agreement.repository';
import { AgreementRepository } from 'src/repositories/agreement.repository';
import { MailModule } from 'src/mail/mail.module';
import { AuthRepository } from 'src/repositories/auth.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { CoverletterAnswer } from 'src/entities/CoverletterAnswer';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([
      CoverletterAnswer,
      UserRepository,
      ProfileRepository,
      AgreementRepository,
      UserAgreementRepository,
      AuthRepository,
    ]),
    MailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
