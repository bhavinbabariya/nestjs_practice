import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { normalLogger, writeLog } from 'src/utils';

// All remaining exception will be catched here
@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internal Server Error';
    let logPath = 'other';

    // Handle HttpException
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;

      // If validator throws error then catch
      const res: any = exception.getResponse();
      if ('message' in res) {
        msg = res.message;
      }
      logPath = 'http';
    }

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: msg,
    };

    // writeLog(logPath, { exception, path: exception.stack });
    normalLogger.error({
      timestamp: new Date().toLocaleTimeString(),
      exception,
      path: exception.stack,
    });
    res.status(status).json(body);
  }
}
