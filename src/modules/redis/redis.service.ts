import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis, { RedisKey } from 'ioredis';
import { SetValues } from './types';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(key: RedisKey): Promise<string> {
    return await this.redis.get(key);
  }

  async set(key: RedisKey, value: SetValues): Promise<boolean> {
    return !!(await this.redis.set(key, value));
  }

  async setValueWhitExpiry(
    key: RedisKey,
    value: SetValues,
    duration: number | string,
  ): Promise<boolean> {
    return !!(await this.redis.set(key, value, 'EX', duration));
  }

  async deleteValue(key: RedisKey): Promise<boolean> {
    return !!(await this.redis.del(key));
  }
}
