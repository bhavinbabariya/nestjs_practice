import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CartItem } from './dtos/place-order.dto';
import { Order } from './order.entity';
import { OrderDetails } from './order_details.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepo: Repository<OrderDetails>,
    private productService: ProductService,
    private transactionService: TransactionService,
  ) {}

  async placeOrder(cart: CartItem[], user: User) {
    // Transaction : START
    const queryRunner = await this.transactionService.startTransaction();

    try {
      const order = queryRunner.manager.create(Order);
      order.user = user;
      const placedOrder = await queryRunner.manager.save(Order, order);

      const products2 = await this.productService.findByIds(
        cart.map((product) => product.pId),
      );

      if (cart.length !== products2.length) {
        throw new BadRequestException('product not found');
      }

      const OrderDetails = cart.map((cartItem) =>
        this.orderDetailsRepo.create({
          orderId: placedOrder.id,
          productId: cartItem.pId,
          quantity: cartItem.quantity,
        }),
      );

      this.orderDetailsRepo.save(OrderDetails);

      await this.transactionService.commitTransaction(queryRunner);

      return { success: true, orderId: placedOrder.id };
    } catch (error) {
      await this.transactionService.rollbackTransaction(queryRunner);

      throw error;
    }
  }
}
