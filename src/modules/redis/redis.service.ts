import { Injectable } from '@nestjs/common';
import { ErrorService } from '../exeption/exeption.service';
import { UpdateRediDto } from './dto/update-redi.dto';

@Injectable()
export class RedisService {
  constructor(private readonly errorService: ErrorService) {}
  create() {
    this.errorService.internalServerError();
  }

  findAll() {
    return `This action returns all redis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} redi`;
  }

  update(id: number, updateRediDto: UpdateRediDto) {
    return `This action updates a #${id} redi`;
  }

  remove(id: number) {
    return `This action removes a #${id} redi`;
  }
}
