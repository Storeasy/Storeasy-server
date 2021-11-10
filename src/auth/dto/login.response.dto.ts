import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginResponseDto {
  @ApiProperty({
    example: "어쩌구저쩌구 토큰 값",
    description: "Access Token 값"
  })
  @IsString()
  accessToken: string;
}