import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup.request.dto';
import { Public } from 'src/decorators/public.decorators';
import { ResponseEntity } from 'src/config/res/response-entity';
import { LoginResponseDto } from './dto/login.response.dto';
import { ResponseStatus } from 'src/config/res/response-status';
import { AgreementResponseDto } from './dto/agreement.response.dto';
import { MailService } from 'src/mail/mail.service';
import { CheckAuthCodeRequestDto } from './dto/check-auth-code.request.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('인증')
@Public()
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @ApiOperation({ summary: '로그인' })
  @ApiOkResponse({ type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<ResponseEntity<LoginResponseDto>> {
    console.log(req);
    const data = await this.authService.login(req.user);
    return ResponseEntity.OK_WITH(ResponseStatus.LOGIN_SUCCESS, data);
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiCreatedResponse()
  @Post('signup')
  async signup(
    @Body() signupRequestDto: SignupRequestDto,
  ): Promise<ResponseEntity<string>> {
    await this.authService.signup(signupRequestDto);
    return ResponseEntity.OK(ResponseStatus.SIGNUP_SUCCESS);
  }

  @ApiOperation({ summary: '이메일 중복 확인' })
  @ApiOkResponse()
  @Get('check-email/:email')
  async checkEmail(@Param('email') email: string) {
    await this.authService.checkEmail(email);
    return ResponseEntity.OK(ResponseStatus.CHECK_EMAIL_SUCCESS);
  }

  @ApiOperation({ summary: '약관 목록 조회' })
  @ApiOkResponse({ type: AgreementResponseDto })
  @Get('agreements')
  async getAgreements(): Promise<ResponseEntity<AgreementResponseDto[]>> {
    const data = await this.authService.getAgreements();
    return ResponseEntity.OK_WITH(
      ResponseStatus.READ_ALL_AGREEMENTS_SUCCESS,
      data,
    );
  }

  @ApiOperation({ summary: '약관 상세 조회' })
  @ApiOkResponse({ type: AgreementResponseDto })
  @Get('agreements/:agreementId')
  async getAgreement(
    @Param('agreementId') agreementId: number,
  ): Promise<ResponseEntity<AgreementResponseDto>> {
    const data = await this.authService.getAgreement(agreementId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_AGREEMENT_SUCCESS, data);
  }

  @ApiOperation({ summary: '이메일 인증 번호 전송' })
  @ApiOkResponse()
  @Get('mail/:to')
  async sendAuthMail(@Param('to') to: string) {
    await this.mailService.sendAuthMail(to);
    return ResponseEntity.OK(ResponseStatus.SEND_AUTH_MAIL_SUCCESS);
  }

  @ApiOperation({ summary: '이메일 인증 번호 확인' })
  @ApiCreatedResponse()
  @Post('mail')
  async checkAuthCode(
    @Body() checkAuthCodeRequestDto: CheckAuthCodeRequestDto,
  ) {
    await this.authService.checkAuthCode(checkAuthCodeRequestDto);
    return ResponseEntity.OK(ResponseStatus.CHECK_AUTH_CODE_SUCCESS);
  }
}
