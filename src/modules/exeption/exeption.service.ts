import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EXEPTION_PROVIDER_TOKEN, DYNAMIC_MESSAGE } from './constants';
import { EnMessages, FaMessages, Languages } from './enums';
import { IExeptionArgs, IExeptionConfig } from './interface';

@Injectable()
export class ExeptionService {
  constructor(
    @Inject(EXEPTION_PROVIDER_TOKEN)
    private readonly errorConfig: IExeptionConfig,
  ) {}

  private throwDefaultMessage(
    exeption: IExeptionArgs,
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

  private throwConcatedMessage(
    exeption: IExeptionArgs,
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

  private throwDynamicMessage(
    exeption: IExeptionArgs,
    message: string,
    target: string,
  ): never {
    throw new exeption(message.replace(DYNAMIC_MESSAGE, target));
  }

  notFoundError(target?: string): never {
    if (!target)
      this.throwDefaultMessage(
        NotFoundException,
        EnMessages.DEFAULT_NOT_FOUND,
        FaMessages.DEFAULT_NOT_FOUND,
      );

    this.throwConcatedMessage(
      NotFoundException,
      target,
      EnMessages.NOT_FOUND,
      FaMessages.NOT_FOUND,
    );
  }

  customNotFoundError(message: string): never {
    throw new NotFoundException(message);
  }

  forbiddenError(target?: string) {
    if (!target)
      this.throwDefaultMessage(
        ForbiddenException,
        EnMessages.DEFAULT_FORBIDDEN,
        FaMessages.DEFAULT_FORBIDDEN,
      );

    switch (this.errorConfig.language) {
      case Languages.FA:
        this.throwDynamicMessage(
          ForbiddenException,
          FaMessages.FORBIDDEN,
          target,
        );
      case Languages.EN:
        this.throwDynamicMessage(
          ForbiddenException,
          EnMessages.FORBIDDEN,
          target,
        );
      default:
        throw new ForbiddenException(EnMessages.DEFAULT_FORBIDDEN);
    }
  }

  customForbiddenError(message: string) {
    throw new ForbiddenException(message);
  }

  badRequestError(): never {
    this.throwDefaultMessage(
      BadRequestException,
      EnMessages.DEFAULT_BAD_REQUEST,
      FaMessages.DEFAULT_BAD_REQUEST,
    );
  }

  customBadRequestError(message: string): never {
    throw new BadRequestException(message);
  }

  internalServerError(): never {
    this.throwDefaultMessage(
      InternalServerErrorException,
      EnMessages.INTERNAL_SERVER,
      FaMessages.INTERNAL_SERVER,
    );
  }

  customInternalServerError(message: string): never {
    throw new InternalServerErrorException(message);
  }
}
