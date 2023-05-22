import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    console.log('inside common');
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let msg = 'Internal Server Error';

    let log = true;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      msg = exception.message;
      log = true;

      // If custom validator throws error then fetch
      const res: any = exception.getResponse();
      if ('message' in res) {
        msg = res.message;
      }
    }

    const body = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message: msg,
    };

    if (log) this.writeHttpLog(body);

    res.json(body);
  }

  private async writeHttpLog(data: Record<string, any>) {
    const LOGS_DIR = join(
      __dirname,
      '..',
      '..',
      'log',
      'http',
      `${Date.now()}-log.json`,
    );

    try {
      await writeFile(LOGS_DIR, JSON.stringify(data));
    } catch (err) {
      return;
    }
  }
}
