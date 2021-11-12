import { PartialType } from "@nestjs/swagger";
import { CreatePageRequestDto } from "./create-page.request.dto";

export class UpdatePageRequestDto extends PartialType(CreatePageRequestDto) {
  
}