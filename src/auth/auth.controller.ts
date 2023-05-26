import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiAcceptedResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginUserDto } from 'src/users/dtos/login-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiCreatedResponse({ description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('/signup')
  async signUp(@Body() body: CreateUserDto) {
    const user = await this.authService.signUp(
      body.email,
      body.password,
      body.role,
    );
    return user;
  }

  @ApiAcceptedResponse({ description: 'login successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @HttpCode(200)
  @Post('/signin')
  async signIn(@Body() body: LoginUserDto) {
    return this.authService.signIn(body.email, body.password);
  }
}
