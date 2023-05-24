import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();
    let token: string = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      token = token.split(' ')[1];
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT.SECRET'),
      });

      req['user'] = payload.user;
    } catch {
      throw new UnauthorizedException('token not verified');
    }

    return true;
  }
}
