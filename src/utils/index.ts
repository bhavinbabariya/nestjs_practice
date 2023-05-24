import { join } from 'path';
import * as fs from 'fs';
import { writeFile, mkdir } from 'fs/promises';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export async function createLogDir() {
  // log/typeorm, log/http, log/other
  const typeorm_log = join('.', 'log', 'typeorm');
  const http_log = join('.', 'log', 'http');
  const other_log = join('.', 'log', 'other');

  // Create directories if they don't exist
  if (!fs.existsSync(typeorm_log)) {
    await mkdir(typeorm_log, { recursive: true });
  }
  if (!fs.existsSync(http_log)) {
    await mkdir(http_log, { recursive: true });
  }

  if (!fs.existsSync(other_log)) {
    await mkdir(other_log, { recursive: true });
  }
}

// function to write log
export async function writeLog(folderPath: string, data: Record<string, any>) {
  const LOGS_DIR = join(
    __dirname,
    '..',
    '..',
    'log',
    folderPath,
    `${Date.now()}-log.json`,
  );

  try {
    await writeFile(LOGS_DIR, JSON.stringify(data));
  } catch (err) {
    return;
  }
}

export const typeOrmLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.DailyRotateFile({
      datePattern: 'DD-MM-YYYY',
      filename: 'logs/typeorm/%DATE%.log',
      level: 'error',
    }),
  ],
});
export const normalLogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
});
