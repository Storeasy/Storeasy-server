import { registerAs } from "@nestjs/config";

export default registerAs('mail', () =>  ({
  host: process.env.MAIL_HOST,
  user: process.env.MAIL_USER,
  password: process.env.MAIL_PASSWORD,
  from: process.env.MAIL_FROM,
  transport: process.env.MAIL_TRANSPORT,
}));