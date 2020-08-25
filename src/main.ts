import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true });
  app.setGlobalPrefix('api');
  // Validate
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  // Swagger
  const options = new DocumentBuilder()
  .setTitle('Example')
  .setDescription('The API description')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  await app.listen(3000);
  console.log(`Runing in port 3000`);
}
bootstrap();
