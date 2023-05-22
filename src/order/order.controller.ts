import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { InsertUser } from 'src/decorators/user.decorator';
import { BuyerGuard } from 'src/users/buyer.guard';
import { User } from 'src/users/users.entity';
import { PlaceOrderDto } from './dtos/place-order.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOkResponse({ description: 'order placed successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Post('place')
  @UseGuards(AuthGuard, BuyerGuard)
  placeOrder(@Body() body: PlaceOrderDto, @InsertUser() user: User) {
    return this.orderService.placeOrder(body.cart, user);
  }
}
