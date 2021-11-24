import { Test, TestingModule } from '@nestjs/testing';
import { ExploreService } from './explore.service';

describe('ExploreService', () => {
  let service: ExploreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExploreService],
    }).compile();

    service = module.get<ExploreService>(ExploreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
