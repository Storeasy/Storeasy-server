import { Body, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login.response.dto';
import { SignupRequestDto } from './dto/signup.request.dto';
import { University } from 'src/entities/University';
import { UserRepository } from 'src/repositories/user.repository';
import { sign } from 'crypto';
import { ResponseStatus } from 'src/config/res/response-status';
import { AgreementResponseDto } from './dto/agreement.response.dto';
import { AgreementRepository } from 'src/repositories/agreement.repository';
import { UserAgreementRepository } from 'src/repositories/user-agreement.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly agreementRepository: AgreementRepository,
    private readonly userAgreementRepository: UserAgreementRepository,
    @InjectRepository(University) private univRepository: Repository<University>,
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
    const access_token = this.jwtService.sign(payload);

    return {
      access_token: access_token,
    }
  }

  async signup(signupRequestDto: SignupRequestDto) {
    await this.checkEmail(signupRequestDto.email);

    const hashedPassword = await bcrypt.hash(signupRequestDto.password, 12);

    const user = this.userRepository.create();
    user.email = signupRequestDto.email;
    user.password = hashedPassword;
    user.name = signupRequestDto.name;
    user.birthDate = signupRequestDto.birthDate;
    user.admissionYear = signupRequestDto.admissionYear;
    user.universityName = signupRequestDto.universityName;
    user.department = signupRequestDto.department;
  
    await this.userRepository.save(user);

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
}
