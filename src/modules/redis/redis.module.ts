import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisModule as Redis } from '@liaoliaots/nestjs-redis';

@Module({
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
})
export class RedisModule {}
