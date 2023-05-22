import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/users.entity';

export const InsertUser = createParamDecorator(
  (data: string, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
