import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppExceptionFilter } from './filter/appException.filter';
import { TypeOrmExceptionFilter } from './filter/typeormException.filter';
import * as path from 'path';
import * as fs from 'fs';

async function createLogDir() {
  // log/typeorm, log/http
  const typeorm_log = path.join('.', 'log', 'typeorm');
  const http_log = path.join('.', 'log', 'http');

  // Create directories if they don't exist
  if (!fs.existsSync(typeorm_log)) {
    fs.mkdirSync(typeorm_log, { recursive: true });
  }
  if (!fs.existsSync(http_log)) {
    fs.mkdirSync(http_log, { recursive: true });
  }
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  const configService = app.get(ConfigService);
  const PORT = +configService.get('PORT', 5000);

  const config = new DocumentBuilder()
    .setTitle('E-Commerce Application')
    .setDescription('created by Bhavin Babariya')
    .addBearerAuth(
      {
        type: 'http',

        description: 'This is Bearer auth',

        scheme: 'bearer',

        bearerFormat: 'Token',
      },

      'Authorization',
    )
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await createLogDir();
  await app.listen(PORT);
}

bootstrap();
