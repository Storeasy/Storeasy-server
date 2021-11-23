import { Test, TestingModule } from '@nestjs/testing';
import { ExploreController } from './explore.controller';

describe('ExploreController', () => {
  let controller: ExploreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExploreController],
    }).compile();

    controller = module.get<ExploreController>(ExploreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
