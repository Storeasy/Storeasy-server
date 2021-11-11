import { ApiOperation, ApiProperty } from "@nestjs/swagger";

export class LoginRequestDto {
  @ApiProperty({
    example: "test@test.com",
    description: "이메일"
  })
  email: string;

  @ApiProperty({
    example: "testpassword",
    description: "비밀번호"
  })
  password: string;
}