import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOkResponse({ description: 'success' })
  @Get('buyer')
  async findAllBuyer() {
    return await this.usersService.findAll('buyer');
  }

  @ApiOkResponse({ description: 'success' })
  @Get('seller')
  async findAllSeller() {
    return await this.usersService.findAll('seller');
  }
}
