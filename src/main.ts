import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const appPort = configService.get('APP_PORT');

  const logger = new Logger();

  // Bootstrap app
  await app.listen(appPort);
  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
}
bootstrap();
