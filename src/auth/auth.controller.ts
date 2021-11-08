import { Controller, Get, Request, Post, UseGuards, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
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

@Public()
@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<ResponseEntity<LoginResponseDto>> {
    const data = await this.authService.login(req.user);
    return ResponseEntity.OK_WITH(ResponseStatus.LOGIN_SUCCESS, data);
  }

  @Post('signup')
  async signup(@Body() signupRequestDto: SignupRequestDto): Promise<ResponseEntity<String>> {
    await this.authService.signup(signupRequestDto);
    return ResponseEntity.OK(ResponseStatus.SIGNUP_SUCCESS);
  }

  @Get('check-email/:email')
  async checkEmail(@Param('email') email: string) {
    await this.authService.checkEmail(email);
    return ResponseEntity.OK(ResponseStatus.CHECK_EMAIL_SUCCESS);
  }

  @Get('agreements')
  async getAgreements(): Promise<ResponseEntity<AgreementResponseDto[]>> {
    const data = await this.authService.getAgreements();
    return ResponseEntity.OK_WITH(ResponseStatus.READ_ALL_AGREEMENTS_SUCCESS, data);
  }

  @Get('agreements/:agreementId')
  async getAgreement(@Param('agreementId') agreementId: number): Promise<ResponseEntity<AgreementResponseDto>> {
    const data = await this.authService.getAgreement(agreementId);
    return ResponseEntity.OK_WITH(ResponseStatus.READ_AGREEMENT_SUCCESS, data);
  }

  @Get('mail/:to')
  async sendAuthMail(@Param('to') to: string) {
    await this.mailService.sendAuthMail(to);
    return ResponseEntity.OK(ResponseStatus.SEND_AUTH_MAIL_SUCCESS);
  }

  @Get('mail')
  async checkAuthCode(@Body() checkAuthCodeRequestDto: CheckAuthCodeRequestDto) {
    await this.authService.checkAuthCode(checkAuthCodeRequestDto);
    return ResponseEntity.OK(ResponseStatus.CHECK_AUTH_CODE_SUCCESS);
  }
}
