import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors();
  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);
  Logger.warn("Running in: http://localhost:" + port);
}
bootstrap();
