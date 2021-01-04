import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error = typeof response === 'string' ? { message: exceptionResponse } : (exceptionResponse as Record<string, unknown>);

    if (response && response.hasOwnProperty('status')) {
      response.status(statusCode).json({
        ...error,
        path: request.url,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
