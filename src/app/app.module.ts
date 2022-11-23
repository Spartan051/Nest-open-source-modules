import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envValidation from 'src/modules/config/env-validation';
import { EnvModule } from 'src/modules/config/env.module';
import { RedisModule } from 'src/modules/redis/redis.module';
import { ExeptionModule } from 'src/modules/exeption/exeption.module';
import { Languages } from 'src/modules/exeption/enums';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/modules/exeption/exeption-filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/modules/config/env/development.env',
      isGlobal: true,
      cache: true,
      validationSchema: envValidation,
    }),
    EnvModule,
    ExeptionModule.forRoot({ language: Languages.FA }),
    RedisModule,
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
