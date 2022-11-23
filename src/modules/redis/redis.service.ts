import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async getValue(key: string): Promise<string> {
    return await this.redis.get(key);
  }

  async setValue<T>(key: string, value: T): Promise<boolean> {
    return !!(await this.redis.set(key, JSON.stringify(value)));
  }

  async setValueWhitExpiry<T>(
    key: string,
    value: T,
    duration: string,
  ): Promise<boolean> {
    return !!(await this.redis.set(key, JSON.stringify(value), 'EX', duration));
  }

  async deleteValue(key: string): Promise<boolean> {
    return !!(await this.redis.del(key));
  }
}
