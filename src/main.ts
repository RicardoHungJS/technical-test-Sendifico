import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config({ path: process.cwd() + '/.env' });

async function bootstrap() {
  const logger = new Logger('MAIN');
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  logger.log(
    `The environment is ${process.env.ENVIRONMENT}, running on http://localhost:${port}`,
  );
}
bootstrap();
