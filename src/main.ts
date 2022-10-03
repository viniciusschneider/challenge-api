import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { AppModule } from './app.module';
import * as express from 'express';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';

export let app: INestApplication;
async function bootstrap() {
  app = await NestFactory.create(AppModule, { cors: true });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use('/public', express.static(join(__dirname, '..', 'public')));
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
