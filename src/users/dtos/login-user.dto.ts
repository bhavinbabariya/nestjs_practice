import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'Email of user',
    example: 'abc@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    example: 'user@123',
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
