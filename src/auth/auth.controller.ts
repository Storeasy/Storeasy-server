import { Controller, Get, Request, Post, UseGuards, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup.request.dto';
import { Public } from 'src/decorators/public.decorators';
import { NotLoggedInGuard } from './guard/not-logged-in.guard';
import { ResponseEntity } from 'src/config/res/response-entity';
import { LoginResponseDto } from './dto/login.response.dto';
import { ResponseStatus } from 'src/config/res/response-status';

@Public()
@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): ResponseEntity<LoginResponseDto> {
    const data = this.authService.login(req.user);
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
}
