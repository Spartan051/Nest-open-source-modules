import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as Redis } from '@liaoliaots/nestjs-redis';

@Module({})
export class RedisModule {
  static forRoot() {
    return {
      module: RedisModule,
      imports: [
        Redis.forRoot({
          config: {
            host: 'localhost',
            port: 6379,
          },
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
        Redis.forRoot({
          config: {
            host: 'localhost',
            port: 6379,
          },
        }),
      ],
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
