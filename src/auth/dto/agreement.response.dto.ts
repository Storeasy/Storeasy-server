import { ApiProperty, PickType } from "@nestjs/swagger";
import { Agreement } from "src/entities/Agreement";

export class AgreementResponseDto {
  @ApiProperty({
    example: 1,
    description: "약관 ID"
  })
  id: number;

  @ApiProperty({
    example: "약관 내용입니다.",
    description: "약관 내용"
  })
  content: string;
}