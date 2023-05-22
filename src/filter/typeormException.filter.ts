import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { TypeORMError } from 'typeorm';

async function writeHttpLog(data: any) {
  const LOGS_DIR = join(
    __dirname,
    '..',
    '..',
    'log',
    'typeorm',
    `${Date.now()}-log.json`,
  );

  try {
    await writeFile(LOGS_DIR, JSON.stringify(data));
  } catch (err) {
    return;
  }
}

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    console.log('inside typeorm');
    // if (exception instanceof TypeORMError) {
    //   console.log('inside filter : ', true);
    // } else console.log('inside filter : ', false);
    const body = {
      statusCode: 500,
      timestamp: new Date().toISOString(),
      message: 'Internal Server error',
    };

    console.log(exception);
    writeHttpLog(exception);
    res.json(body);
  }
}
