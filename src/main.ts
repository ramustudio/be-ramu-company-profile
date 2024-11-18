import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Ramu Studio')
    .setDescription('API documentation for BE Ramu')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);
  const port = process.env.PORT;
  await app.listen(port);
  Logger.warn(`Application is running on: http://localhost:${port}`);
  Logger.warn(`Swagger docs available at: http://localhost:${port}/docs`);
}
bootstrap();
