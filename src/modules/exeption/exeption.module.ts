import { Module } from '@nestjs/common';
import { EXEPTION_PROVIDER_TOKEN } from './constants';
import { ExeptionService } from './exeption.service';
import { IExeptionConfig } from './interface';

@Module({})
export class ExeptionModule {
  static forRoot(errorConfig: IExeptionConfig) {
    return {
      module: ExeptionModule,
      providers: [
        {
          provide: EXEPTION_PROVIDER_TOKEN,
          useValue: { language: errorConfig.language.toUpperCase() },
        },
        ExeptionService,
      ],
      exports: [ExeptionService],
      global: true,
    };
  }

  static forFeature(errorConfig: IExeptionConfig) {
    return {
      module: ExeptionModule,
      providers: [
        {
          provide: EXEPTION_PROVIDER_TOKEN,
          useValue: { language: errorConfig.language.toUpperCase() },
        },
        ExeptionService,
      ],
      exports: [ExeptionService],
    };
  }
}
