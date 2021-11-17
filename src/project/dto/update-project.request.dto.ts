import { PartialType } from '@nestjs/swagger';
import { CreateProjectRequestDto } from './create-project.request.dto';

export class UpdateProjectRequestDto extends PartialType(
  CreateProjectRequestDto,
) {}
