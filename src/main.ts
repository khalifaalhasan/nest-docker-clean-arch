import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import mustache from 'mustache-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser('my-secret-key'));

  // set vieews
  app.set('views', './src/views');
  app.set('view engine', 'html');
  app.engine('html', mustache());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
