import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/repositories/auth.repository';

@Injectable()
export class MailService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly mailerService: MailerService,
  ) {}

  async sendAuthMail(to: string) {
    const code = this.createCode();
    await this.mailerService.sendMail({
      to: to,
      subject: 'hello',
      template: './email-auth',
      context: {
        code: code,
      },
    });

    await this.authRepository.save({
      email: to,
      code: code,
      attemptCount: 0,
    });
  }

  createCode(): string {
    let code = '';
    for (let i = 0; i < 6; i++) {
      const num = Math.floor(Math.random() * 10).toString();
      code += num;
    }
    return code;
  }
}
