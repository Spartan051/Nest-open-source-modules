import { Test, TestingModule } from '@nestjs/testing';
import { ErrorController } from './error.controller';
import { ErrorService } from './error.service';

describe('ErrorController', () => {
  let controller: ErrorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ErrorController],
      providers: [ErrorService],
    }).compile();

    controller = module.get<ErrorController>(ErrorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
