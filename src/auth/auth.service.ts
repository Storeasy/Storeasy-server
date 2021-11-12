import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login.response.dto';
import { SignupRequestDto } from './dto/signup.request.dto';
import { UserRepository } from 'src/repositories/user.repository';
import { ResponseStatus } from 'src/config/res/response-status';
import { AgreementResponseDto } from './dto/agreement.response.dto';
import { AgreementRepository } from 'src/repositories/agreement.repository';
import { UserAgreementRepository } from 'src/repositories/user-agreement.repository';
import { CheckAuthCodeRequestDto } from './dto/check-auth-code.request.dto';
import { AuthRepository } from 'src/repositories/auth.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly agreementRepository: AgreementRepository,
    private readonly userAgreementRepository: UserAgreementRepository,
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneByEmail(email);
    if (!user) {
      return null;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }
    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const payload = { username: user.email, sub: user.id};
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken: accessToken,
    }
  }

  async signup(signupRequestDto: SignupRequestDto) {
    // 이메일 중복 확인
    await this.checkEmail(signupRequestDto.email);

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(signupRequestDto.password, 12);

    // 유저 생성, 저장  
    const user = await this.userRepository.save({
      email: signupRequestDto.email,
      password: hashedPassword,
      name: signupRequestDto.name,
      birthDate: signupRequestDto.birthDate,
      admissionYear: signupRequestDto.admissionYear,
      universityName: signupRequestDto.universityName,
      department: signupRequestDto.department
    });

    // 프로필 생성, 저장
    await this.profileRepository.save({
      userId: user.id,
      nickname: user.name,
      profileImage: 'https://storeasy.s3.ap-northeast-2.amazonaws.com/profileImages/profile_image.png',
    });

    // 유저 약관 동의 생성, 저장
    const agreements = await this.agreementRepository.findAll();
    await Promise.all(
      agreements.map((agreement) => {
        this.userAgreementRepository.save({
          user: user,
          agreement: agreement
        });
      })
    );
  }

  async checkEmail(email: string) {
    if (await this.userRepository.existsByEmail(email)) {
      throw new ConflictException(ResponseStatus.CHECK_EMAIL_FAIL);
    }
  }

  async getAgreements(): Promise<AgreementResponseDto[]> {
    return await this.agreementRepository.findAll();;
  }
  
  async getAgreement(agreementId: number): Promise<AgreementResponseDto> {
    const agreement = await this.agreementRepository.findOneByAgreementId(agreementId);
    if (!agreement) {
      throw new NotFoundException(ResponseStatus.AGREEMENT_NOT_FOUND);
    }
    return agreement;
  }

  async checkAuthCode(checkAuthCodeRequestDto: CheckAuthCodeRequestDto) {
    const auth = await this.authRepository.findOneByEmail(checkAuthCodeRequestDto.email);
    if (!auth) {
      throw new NotFoundException(ResponseStatus.AUTH_NOT_FOUND);
    }
    if (auth.code != checkAuthCodeRequestDto.code) {
      auth.attemptCount++;
      await this.authRepository.save(auth);
      throw new BadRequestException(ResponseStatus.CHECK_AUTH_CODE_FAIL);
    }
  }
}
