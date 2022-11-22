import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  EN_DEFAULT_NOT_FOUND_MESSAGE,
  EN_NOT_FOUND_MESSAGE,
  ERROR_PROVIDER_TOKEN,
  FA_DEFAULT_NOT_FOUND_MESSAGE,
  FA_FORBIDDEN_MESSAGE,
  FA_NOT_FOUND_MESSAGE,
} from './constants';
import { Languages } from './enums';
import { IErrorConfig } from './interface';

@Injectable()
export class ErrorService {
  constructor(
    @Inject(ERROR_PROVIDER_TOKEN) private readonly errorConfig: IErrorConfig,
  ) {}

  private throwDefaultMessage<T extends new (n: string) => {}>(
    exeption: T,
    enDefaultMessage: string,
    faDefaultMessage: string,
  ): never {
    switch (this.errorConfig.language) {
      case Languages.FA:
        throw new exeption(faDefaultMessage);

      case Languages.EN:
        throw new exeption(enDefaultMessage);

      default:
        throw new exeption(enDefaultMessage);
    }
  }

  private throwConcatedMessage<T extends new (n: string) => {}>(
    exeption: T,
    target: string,
    enMessage: string,
    faMessage: string,
  ): never {
    switch (this.errorConfig.language) {
      case Languages.FA:
        throw new exeption(target.concat(' ', faMessage));
      case Languages.EN:
        throw new exeption(target.concat(' ', enMessage));
      default:
        throw new exeption(enMessage);
    }
  }

  private throwSlicedMessage<T extends new (n: string) => {}>(
    exeption: T,
    message: string,
    target: string,
    index: number,
  ): never {
    throw new exeption(
      message.slice(0, index).concat(target, message.slice(index)),
    );
  }

  notFoundError(target?: string): never {
    if (!target)
      this.throwDefaultMessage(
        NotFoundException,
        EN_DEFAULT_NOT_FOUND_MESSAGE,
        FA_DEFAULT_NOT_FOUND_MESSAGE,
      );

    this.throwConcatedMessage(
      NotFoundException,
      target,
      EN_NOT_FOUND_MESSAGE,
      FA_NOT_FOUND_MESSAGE,
    );
  }

  customNotFoundError(message: string): never {
    throw new NotFoundException(message);
  }

  forbiddenError(target?: string) {
    if (!target)
      this.throwDefaultMessage(
        ForbiddenException,
        EN_DEFAULT_NOT_FOUND_MESSAGE,
        FA_DEFAULT_NOT_FOUND_MESSAGE,
      );

    switch (this.errorConfig.language) {
      case Languages.FA:
        this.throwSlicedMessage(
          ForbiddenException,
          FA_FORBIDDEN_MESSAGE,
          target,
          11,
        );
      case Languages.EN:
        throw new ForbiddenException(target.concat(' ', EN_NOT_FOUND_MESSAGE));
      default:
        throw new ForbiddenException(EN_DEFAULT_NOT_FOUND_MESSAGE);
    }
  }

  customForbiddenError(message: string) {
    throw new ForbiddenException(message);
  }

  InternalServerError(): never {
    throw new InternalServerErrorException();
  }

  customInternalServerError(message: string): never {
    throw new InternalServerErrorException(message);
  }
}
