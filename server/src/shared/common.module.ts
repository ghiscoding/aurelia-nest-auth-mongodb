import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DateScalar } from './graphql/scalars/date.scalar';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  providers: [DateScalar],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
