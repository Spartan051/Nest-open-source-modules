import { Injectable } from '@nestjs/common';
import { EnvService } from 'src/modules/config/env.service';

@Injectable()
export class AppService {
  constructor(private readonly envService: EnvService) {}
  async getHello(): Promise<number> {
    return this.envService.port;
  }
}
