import { Test, TestingModule } from '@nestjs/testing';
import { ExeptionService } from '../exeption.service';

describe('ExeptionService', () => {
  let service: ExeptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExeptionService],
    }).compile();

    service = module.get<ExeptionService>(ExeptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
