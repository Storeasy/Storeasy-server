import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TagRequestDto {
  @ApiProperty({
    example : "tagName",
    description: "태그 이름"
  })
  @IsString()
  name: string;
}