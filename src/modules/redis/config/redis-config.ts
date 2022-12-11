import { Injectable } from '@nestjs/common';
import {
  RedisOptionsFactory,
  RedisModuleOptions,
} from '@liaoliaots/nestjs-redis';
import { EnvService } from 'src/modules/config/env.service';

@Injectable()
export class RedisConfig implements RedisOptionsFactory {
  constructor(private readonly envService: EnvService) {}
  createRedisOptions(): RedisModuleOptions {
    console.log(this.envService.redisHost);
    console.log(this.envService.redisPort);
    console.log(this.envService.redisPassword);
    return {
      config: {
        host: this.envService.redisHost,
        port: this.envService.redisPort,
        password: this.envService.redisPassword,
      },
    };
  }
}
