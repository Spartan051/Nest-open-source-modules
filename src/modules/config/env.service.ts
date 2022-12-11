import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './types';

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService<Env, true>) {}

  get port(): number {
    return this.configService.get('port', { infer: true });
  }

  get redisHost(): string {
    return this.configService.get('redis_host', { infer: true });
  }

  get redisPassword(): string {
    return this.configService.get('redis_password', { infer: true });
  }

  get redisPort(): number {
    return this.configService.get('redis_port', { infer: true });
  }
}
