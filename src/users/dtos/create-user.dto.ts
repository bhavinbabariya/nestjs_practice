import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserDoesNotExistWithEmail } from '../validators/user-does-not-exist.validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Email of user',
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @UserDoesNotExistWithEmail({ message: 'User already exists' })
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: 'user@123',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty({
    type: String,
    description: 'Role of user either buyer or seller',
    example: 'buyer',
  })
  @IsNotEmpty()
  @IsString()
  readonly role: 'buyer' | 'seller';
}
