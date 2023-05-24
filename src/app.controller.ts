import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { OrderService } from './order/order.service';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private orderService: OrderService,
  ) {}

  // @ApiHeader({
  //   name: 'authorization',
  //   description: 'Authorization header',
  // })

  @ApiBearerAuth('Authorization')
  // @UseGuards(AuthGuard)
  @Get()
  getHello() {
    return this.appService.getHello();
    // return this.orderService.showOrder();
  }
}
