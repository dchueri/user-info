import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('User Info Api')
    .setDescription('Converte.me Challenge')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document)
  await app.listen(3000);
}
bootstrap();
