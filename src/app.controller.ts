import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiHeader({
    name: 'authorization',
    description: 'Authorization header',
  })
  // @ApiBearerAuth('authorization')
  // @UseGuards(AuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
