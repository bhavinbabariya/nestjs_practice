import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    if (true) throw new UnauthorizedException('invalid');

    return 'Hello World!';
  }
}
