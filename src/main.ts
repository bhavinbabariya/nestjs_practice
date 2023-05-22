import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppExceptionFilter } from './filter/appException.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AppExceptionFilter());

  const configService = app.get(ConfigService);
  const PORT = +configService.get('PORT', 5000);

  const config = new DocumentBuilder()
    .setTitle('E-Commerce Application')
    .setDescription('created by Bhavin Babariya')
    .setVersion('v1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}

bootstrap().catch((error) => {
  console.log('error : ', error);
});
