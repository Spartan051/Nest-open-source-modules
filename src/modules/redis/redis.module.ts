import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as Redis } from '@liaoliaots/nestjs-redis';
import { RedisConfig } from './config/redis-config';

@Module({})
export class RedisModule {
  static forRoot() {
    return {
      module: RedisModule,
      imports: [
        Redis.forRootAsync({
          useClass: RedisConfig,
        }),
      ],
      providers: [RedisService],
      exports: [RedisService],
      global: true,
    };
  }

  static forFeature() {
    return {
      module: RedisModule,
      imports: [
        Redis.forRootAsync({
          useClass: RedisConfig,
        }),
      ],
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
