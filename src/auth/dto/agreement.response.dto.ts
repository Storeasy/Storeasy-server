import { PickType } from "@nestjs/swagger";
import { Agreement } from "src/entities/Agreement";

export class AgreementResponseDto extends PickType(Agreement, [
  'id',
  'content'
] as const) {

}