import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { typeOrmLogger } from 'src/utils';
import { TypeORMError } from 'typeorm';

// All exception related Typeorm will be catched here
@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const body = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      message: 'Internal Server error',
    };

    // writeLog('typeorm', { exception, path: exception.stack });
    typeOrmLogger.error({
      exception,
      path: exception.stack,
    });

    res.status(500).json(body);
  }
}
