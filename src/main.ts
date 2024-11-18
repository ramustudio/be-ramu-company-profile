import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'], 
});

  app.useStaticAssets(
    join(__dirname, '..', 'node_modules', 'swagger-ui-dist'),
    {
      prefix: '/swagger-static',
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Ramu Studio')
    .setDescription('API documentation for BE Ramu')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.warn(`Application is running on: http://localhost:${port}`);
  Logger.warn(`Swagger docs available at: http://localhost:${port}/docs`);
}
bootstrap();
