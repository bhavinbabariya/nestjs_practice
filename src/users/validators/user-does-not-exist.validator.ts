import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'userDoesNotExistValidation', async: false })
class UserDoesNotExistWithEmailConstraint
  implements ValidatorConstraintInterface
{
  validate(email: any) {
    if (email === 'aaa@gmail.com') return true;

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
