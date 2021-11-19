import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class SignupRequestDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'testpassword',
    description: '비밀번호',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '홍길동',
    description: '이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2000-01-01',
    description: '생년월일',
  })
  @IsDateString()
  birthDate: string;

  @ApiProperty({
    example: 2018,
    description: '입학년도',
  })
  @IsNumber()
  admissionYear: number;

  @ApiProperty({
    example: '성신여자대학교',
    description: '학교명',
  })
  @IsString()
  universityName: string;

  @ApiProperty({
    example: '컴퓨터공학과',
    description: '학교명',
  })
  @IsString()
  department: string;
}
