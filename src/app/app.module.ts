import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import envValidation from 'src/modules/config/env-validation';
import { EnvModule } from 'src/modules/config/env.module';
import { ErrorModule } from 'src/modules/error/error.module';
import { Languages } from 'src/shared/enums';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './src/modules/config/env/development.env',
      isGlobal: true,
      cache: true,
      validationSchema: envValidation,
    }),
    EnvModule,
    ErrorModule.forRoot({ language: Languages.FA }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
