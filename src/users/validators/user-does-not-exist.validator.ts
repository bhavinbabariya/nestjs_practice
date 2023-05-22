import { Inject, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersService } from '../users.service';

@Injectable()
@ValidatorConstraint({ name: 'userDoesNotExistValidation', async: false })
export class UserDoesNotExistWithEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(@Inject(UsersService) private userService: UsersService) {}
  async validate(email: any) {
    const user = await this.userService.findOneByEmail(email);

    if (user) return true;

    return false;
  }

  defaultMessage() {
    return 'User already exists';
  }
}

export function UserDoesNotExistWithEmail(
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'userDoesNotExistValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserDoesNotExistWithEmailConstraint,
    });
  };
}
