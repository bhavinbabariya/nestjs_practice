import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SellerGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest();

    if (req.user?.role === 'seller') {
      return true;
    }

    throw new UnauthorizedException('Not Permission to access other resource');
  }
}
