import { resolve } from 'path';
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<string>('PORT');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Parse api file from provided document
  const apiFile = readFileSync(
    resolve(process.cwd(), './doc/api.yaml'),
    'utf-8',
  );
  const schema = parse(apiFile);

  SwaggerModule.setup('api', app, schema);

  await app.listen(PORT);
}
bootstrap();
