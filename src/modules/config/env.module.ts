import { Module } from '@nestjs/common';
import { EnvService } from './env.service';

@Module({})
export class EnvModule {
  static forRoot() {
    return {
      module: EnvModule,
      providers: [EnvService],
      exports: [EnvService],
      global: true,
    };
  }
}
