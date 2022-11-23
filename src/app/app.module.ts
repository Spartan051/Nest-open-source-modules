import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvModule } from 'src/modules/config/env.module';
import { RedisModule } from 'src/modules/redis/redis.module';
import { ExeptionModule } from 'src/modules/exeption/exeption.module';
import { Languages } from 'src/modules/exeption/enums';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/modules/exeption/exeption-filter';
import { EnvPath } from 'src/modules/config/enums';
import envDevelopmentValidation from 'src/modules/config/validation/env-development-validation';
import envProductionValidation from 'src/modules/config/validation/env-production-validation';

@Module({
  imports: [
    EnvModule,
    RedisModule,
    ExeptionModule.forRoot({ language: Languages.FA }),
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? EnvPath.DEVELOPMENT
          : EnvPath.PRODUCTION,
      validationSchema:
        process.env.NODE_ENV === 'development'
          ? envDevelopmentValidation
          : envProductionValidation,
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
