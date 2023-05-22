import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    // if (new BadRequestException() instanceof TypeORMError) {
    //   console.log(true);
    // } else {
    //   console.log(false);
    // }
    // if (true) throw new BadRequestException('invalid');

    return 'Hello World!';
  }
}
