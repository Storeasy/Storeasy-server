import { PickType } from '@nestjs/swagger';
import { User } from 'src/entities/User';

// export class SignupRequestDto extends PickType(User, [
//   'email', 
//   'password',
//   'name',
//   'birthDate',
//   'admissionYear',
//   'universityName',
//   'department',
// ] as const) {}

export class SignupRequestDto {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  admissionYear: number;
  universityName: string;
  department: string;
}