import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class TagColorRequestDto {
  @ApiProperty({
    example : "tagName",
    description: "태그 이름"
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: "태그색 ID"
  })
  @IsNumber()
  tagColorId: number;
}