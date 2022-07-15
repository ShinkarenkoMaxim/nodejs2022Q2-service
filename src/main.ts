import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';
import { parse } from 'yaml';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { resolve } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Parse api file from provided document
  const apiFile = readFileSync(
    resolve(process.cwd(), './doc/api.yaml'),
    'utf-8',
  );
  const schema = parse(apiFile);

  SwaggerModule.setup('api', app, schema);

  await app.listen(4000);
}
bootstrap();
