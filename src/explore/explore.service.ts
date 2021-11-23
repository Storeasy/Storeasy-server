import { Injectable } from '@nestjs/common';
import { PageImageRepository } from 'src/repositories/page-image.repository';
import { PageTagRepository } from 'src/repositories/page-tag.repository';
import { PageRepository } from 'src/repositories/page.repository';
import { ProfileTagRepository } from 'src/repositories/profile-tag.repository';
import { ProfileRepository } from 'src/repositories/profile.repository';

@Injectable()
export class ExploreService {
  constructor(
    private readonly pageRepository: PageRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly pageImageRepository: PageImageRepository,
    private readonly pageTagRepository: PageTagRepository,
    private readonly profileTagRepository: ProfileTagRepository,
  ) {}

  public async getRecommendPages(userId: number) {
    
  }
}
