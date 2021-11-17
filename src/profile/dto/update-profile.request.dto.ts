export class UpdateProfileRequestDto {
  profileImage?: string;
  readonly nickname?: string;
  readonly tagIds?: string;
  readonly contact?: string;
  readonly bio?: string;
}
