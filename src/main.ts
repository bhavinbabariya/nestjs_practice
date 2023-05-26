import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppExceptionFilter } from './filter/appException.filter';
import { TypeOrmExceptionFilter } from './filter/typeormException.filter';
import { createLogDir } from './utils';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // USE : EXCEPTION FILTER
  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  const configService = app.get(ConfigService);
  const PORT = +configService.get('PORT', 5000);

  // Authentication to use swagger documentation
  app.use(
    ['/docs'],
    basicAuth({
      challenge: true,
      users: {
        root: 'root',
      },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('E-Commerce Application')
    .setDescription('created by Bhavin Babariya')
    .addBearerAuth(
      {
        type: 'http',
        description: 'This is Bearer auth',
        scheme: 'bearer',
        bearerFormat: 'Token',
        in: 'Header', // Must add
      },
      'Authorization',
    )
    .setVersion('v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // await createLogDir();
  await app.listen(PORT);
}

bootstrap();
