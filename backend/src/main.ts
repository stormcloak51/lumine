import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

export interface Env {
  // Add any Worker-specific bindings here
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.enableCors({
  //   origin: 'http://localhost:3000', 
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });
  await app.listen(process.env.PORT);
}
bootstrap();
