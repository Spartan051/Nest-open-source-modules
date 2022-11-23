import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { EnvService } from './modules/config/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('open-source')
    .setDescription('Document API')
    .setVersion('1.0')
    .addTag('open-source')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // call env service
  const envService = app.get(EnvService);

  await app.listen(envService.port);
}
bootstrap();
