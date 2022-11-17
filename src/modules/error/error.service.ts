import { Injectable } from '@nestjs/common';
import { CreateErrorDto } from './dto/create-error.dto';
import { UpdateErrorDto } from './dto/update-error.dto';

@Injectable()
export class ErrorService {
  create(createErrorDto: CreateErrorDto) {
    return 'This action adds a new error';
  }

  findAll() {
    return `This action returns all error`;
  }

  findOne(id: number) {
    return `This action returns a #${id} error`;
  }

  update(id: number, updateErrorDto: UpdateErrorDto) {
    return `This action updates a #${id} error`;
  }

  remove(id: number) {
    return `This action removes a #${id} error`;
  }
}
