import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvValidation } from './interface/env-vlidation.interface';

@Injectable()
export class EnvService {
  constructor(
    private readonly configService: ConfigService<IEnvValidation, true>,
  ) {}

  get port(): number {
    return this.configService.get('port', { infer: true });
  }
}
