import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from "@nestjs/common";
import { Enum, EnumType } from 'ts-jenum';
import { Exclude, Expose } from 'class-transformer';

@Enum()
export class ResponseStatus extends EnumType<ResponseStatus>() {
  static LOGIN_SUCCESS = new ResponseStatus(HttpStatus.OK, "로그인 성공");
  static LOGIN_FAIL = new ResponseStatus(HttpStatus.UNAUTHORIZED, "로그인 실패");
  static SIGNUP_SUCCESS = new ResponseStatus(HttpStatus.CREATED, "회원가입 성공");
  static CHECK_EMAIL_SUCCESS = new ResponseStatus(HttpStatus.OK, "이메일 중복 확인 성공");
  static CHECK_EMAIL_FAIL = new ResponseStatus(HttpStatus.CONFLICT, "이메일 중복 확인 실패");
  static INVALID_AUTH_TOKEN = new ResponseStatus(HttpStatus.UNAUTHORIZED, "올바르지 않은 토큰입니다");
  
  @Exclude() private readonly _httpStatus: HttpStatus;
  @Exclude() private readonly _message: string;
  private constructor(httpStatus: HttpStatus, message: string) {
    super();
    this._httpStatus = httpStatus;
    this._message = message;
  }

  @ApiProperty()
  @Expose()
  get httpStatus(): HttpStatus {
    return this._httpStatus;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }
}