import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { TimeoutInterceptor } from './shared/interceptors/timeout.interceptor';
import { setupSwagger } from './swagger';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app, port);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new TimeoutInterceptor(),
    new LoggingInterceptor()
  );
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
