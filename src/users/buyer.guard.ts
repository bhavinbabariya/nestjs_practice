import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class BuyerGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();

    if (req.user?.role === 'buyer') {
      return true;
    }

    throw new UnauthorizedException('Not Permission to access other resource');
  }
}
