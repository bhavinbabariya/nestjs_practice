import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { InsertUser } from 'src/decorators/user.decorator';
import { BuyerGuard } from 'src/users/buyer.guard';
import { SellerGuard } from 'src/users/seller.guard';
import { User } from 'src/users/users.entity';
import { PlaceOrderDto } from './dtos/place-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  // POST : /order/place

  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ description: 'order placed successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @HttpCode(200)
  @Post('place')
  @UseGuards(AuthGuard, BuyerGuard)
  placeOrder(@Body() body: PlaceOrderDto, @InsertUser() user: User) {
    return this.orderService.placeOrder(body.cart, user, body.address);
  }

  // GET : /order/show

  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ description: 'success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get('/show')
  @UseGuards(AuthGuard, SellerGuard)
  showOrder(@InsertUser() user: User) {
    return this.orderService.showOrder(user);
  }

  // POST : /order/update

  @ApiBearerAuth('Authorization')
  @ApiOkResponse({ description: 'success' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @Patch('/update')
  @UseGuards(AuthGuard, SellerGuard)
  async updateOrder(@Body() body: UpdateOrderDto) {
    const updatedOrder = await this.orderService.update(body);
    return { success: true, order: updatedOrder };
  }
}
