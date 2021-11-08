import { Body, ConflictException, Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
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

  login(user: User): LoginResponseDto {
    const payload = { username: user.email, sub: user.id};
    const access_token = this.jwtService.sign(payload);
    
    const data: LoginResponseDto = {
      access_token: access_token,
    }
    return data;
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
  }

  async checkEmail(email: string) {
    if (await this.userRepository.existsByEmail(email)) {
      throw new ConflictException(ResponseStatus.CHECK_EMAIL_FAIL);
    }
  }
}
