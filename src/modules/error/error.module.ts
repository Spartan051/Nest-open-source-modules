import { Module } from '@nestjs/common';
import { ERROR_PROVIDER_TOKEN } from './constants/error-provider-token.constants';
import { ErrorService } from './error.service';
import { IErrorConfig } from './interface';

@Module({})
export class ErrorModule {
  static forRoot(errorConfig: IErrorConfig) {
    return {
      module: ErrorModule,
      providers: [
        {
          provide: ERROR_PROVIDER_TOKEN,
          useValue: { language: errorConfig.language.toUpperCase() },
        },
        ErrorService,
      ],
      exports: [ErrorService],
      global: true,
    };
  }

  static forFeature(errorConfig: IErrorConfig) {
    return {
      module: ErrorModule,
      providers: [
        {
          provide: ERROR_PROVIDER_TOKEN,
          useValue: { language: errorConfig.language.toUpperCase() },
        },
        ErrorService,
      ],
      exports: [ErrorService],
    };
  }
}
