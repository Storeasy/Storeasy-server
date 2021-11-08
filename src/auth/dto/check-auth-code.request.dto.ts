import { PickType } from "@nestjs/swagger";
import { Auth } from "src/entities/Auth";

export class CheckAuthCodeRequestDto extends PickType(Auth, [
  'email',
  'code',
] as const) {}