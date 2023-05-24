import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TypeORMError, QueryFailedError } from 'typeorm';
import { typeOrmLogger } from './utils';

@Injectable()
export class AppService {
  getHello(): string {
    // if (new BadRequestException() instanceof TypeORMError) {
    //   console.log(true);
    // } else {
    //   console.log(false);
    // }
    if (true) throw new BadRequestException('Invalid');
    // if (true) throw new QueryFailedError('select * from employee', [0], 0);

    // throw new QueryFailedError('select * from undefined', [0], 0);

    return 'Hello World!';
  }
}
