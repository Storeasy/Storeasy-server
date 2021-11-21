import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { Enum, EnumType } from 'ts-jenum';
import { Exclude, Expose } from 'class-transformer';

@Enum()
export class ResponseStatus extends EnumType<ResponseStatus>() {
  static LOGIN_SUCCESS = new ResponseStatus(HttpStatus.CREATED, '로그인 성공');
  static LOGIN_FAIL = new ResponseStatus(
    HttpStatus.UNAUTHORIZED,
    '로그인 실패',
  );
  static SIGNUP_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '회원가입 성공',
  );
  static CHECK_EMAIL_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '이메일 중복 확인 성공',
  );
  static CHECK_EMAIL_FAIL = new ResponseStatus(
    HttpStatus.CONFLICT,
    '이메일 중복 확인 실패',
  );
  static INVALID_AUTH_TOKEN = new ResponseStatus(
    HttpStatus.UNAUTHORIZED,
    '올바르지 않은 토큰입니다',
  );
  static READ_ALL_AGREEMENTS_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '약관 목록 조회 성공',
  );
  static READ_AGREEMENT_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '약관 상세 조회 성공',
  );
  static AGREEMENT_NOT_FOUND = new ResponseStatus(
    HttpStatus.NOT_FOUND,
    '해당 약관을 찾을 수 없습니다',
  );
  static SEND_AUTH_MAIL_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '이메일 인증 번호 전송 성공',
  );
  static CHECK_AUTH_CODE_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '이메일 인증 번호 확인 성공',
  );
  static CHECK_AUTH_CODE_FAIL = new ResponseStatus(
    HttpStatus.BAD_REQUEST,
    '이메일 인증 번호 확인 실패',
  );
  static AUTH_NOT_FOUND = new ResponseStatus(
    HttpStatus.BAD_REQUEST,
    '인증 정보를 찾을 수 없습니다',
  );
  static READ_ALL_RECOMMEND_TAGS_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '추천 태그 조회 성공',
  );
  static CREATE_TAG_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '태그 등록 성공',
  );
  static CREATE_PROFILE_TAG_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '프로필 태그 설정 성공',
  );
  static READ_PROFILE_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '프로필 조회 성공',
  );
  static PROFILE_NOT_FOUND = new ResponseStatus(
    HttpStatus.NOT_FOUND,
    '해당 프로필을 찾을 수 없습니다',
  );
  static UPDATE_PROFILE_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '프로필 수정 성공',
  );
  static INVALID_FILE_ERROR = new ResponseStatus(
    HttpStatus.BAD_REQUEST,
    '이미지 파일만 업로드할 수 있습니다',
  );
  static CREATE_PROJECT_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '프로젝트 생성 성공',
  );
  static UPDATE_PROJECT_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '프로젝트 수정 성공',
  );
  static DELETE_PROJECT_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '프로젝트 삭제 성공',
  );
  static READ_ALL_PROJECT_COLORS_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '프로젝트색 목록 조회 성공',
  );
  static PROJECT_NOT_FOUND = new ResponseStatus(
    HttpStatus.NOT_FOUND,
    '해당 프로젝트를 찾을 수 없습니다',
  );
  static UPDATE_PROJECT_FAIL_FORBIDDEN = new ResponseStatus(
    HttpStatus.FORBIDDEN,
    '본인의 프로젝트가 아닙니다',
  );
  static DELETE_PROJECT_FAIL_FORBIDDEN = new ResponseStatus(
    HttpStatus.FORBIDDEN,
    '본인의 프로젝트가 아닙니다',
  );
  static READ_ALL_TAG_COLORS_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '태그색 목록 조회 성공',
  );
  static CREATE_PAGE_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '페이지 생성 성공',
  );
  static UPDATE_PAGE_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '페이지 수정 성공',
  );
  static DELETE_PAGE_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '페이지 삭제 성공',
  );
  static PAGE_NOT_FOUND = new ResponseStatus(
    HttpStatus.NOT_FOUND,
    '해당 페이지를 찾을 수 없습니다',
  );
  static UPDATE_PAGE_FAIL_FORBIDDEN = new ResponseStatus(
    HttpStatus.FORBIDDEN,
    '본인의 페이지가 아닙니다',
  );
  static DELETE_PAGE_FAIL_FORBIDDEN = new ResponseStatus(
    HttpStatus.FORBIDDEN,
    '본인의 페이지가 아닙니다',
  );
  static READ_PAGE_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '페이지 상세 조회 성공',
  );
  static UPLOAD_PROFILE_IMAGE_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '프로필 이미지 업로드 성공',
  );
  static UPLOAD_PROFILE_IMAGE_FAIL = new ResponseStatus(
    HttpStatus.BAD_REQUEST,
    '프로필 이미지 업로드 실패',
  );
  static UPLOAD_PAGE_IMAGES_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '페이지 이미지 업로드 성공',
  );
  static UPLOAD_PAGE_IMAGES_FAIL = new ResponseStatus(
    HttpStatus.BAD_REQUEST,
    '페이지 이미지 업로드 실패',
  );
  static READ_ALL_STORY_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '스토리 조회 성공',
  );
  static READ_ALL_USER_TAG_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '사용자 태그 목록 조회 성공',
  );
  static READ_ALL_PAGES_SUCCESS = new ResponseStatus(
    HttpStatus.OK,
    '페이지 목록 조회 성공',
  );
  static PROFILE_IS_NOT_PUBLIC = new ResponseStatus(
    HttpStatus.FORBIDDEN,
    '프로필 조회 실패',
  );
  static PROJECT_IS_NOT_PUBLIC = new ResponseStatus(
    HttpStatus.FORBIDDEN,
    '프로젝트 조회 실패',
  );
  static PAGE_IS_NOT_PUBLIC = new ResponseStatus(
    HttpStatus.FORBIDDEN,
    '페이지 조회 실패',
  );
  static LIKE_USER_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '사용자 좋아요 성공',
  );
  static LIKE_PAGE_SUCCESS = new ResponseStatus(
    HttpStatus.CREATED,
    '페이지 좋아요 성공',
  );

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
