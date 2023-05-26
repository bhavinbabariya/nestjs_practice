import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from 'src/product/product.service';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CartItem } from './dtos/place-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
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

  async placeOrder(cart: CartItem[], user: User, address: string) {
    // Transaction : START
    const queryRunner = await this.transactionService.startTransaction();
    try {
      const order = queryRunner.manager.create(Order);
      order.address = address;
      order.user = user;

      const placedOrder = await queryRunner.manager.save(Order, order);

      await this.productService.checkAndDecreaseQuantity(cart);

      const orderDetails = cart.map((cartItem) =>
        this.orderDetailsRepo.create({
          orderId: placedOrder.id,
          productId: cartItem.pId,
          quantity: cartItem.quantity,
        }),
      );
      await queryRunner.manager.save(OrderDetails, orderDetails);

      // Transaction : COMMIT
      await this.transactionService.commitTransaction(queryRunner);

      return { success: true, orderId: placedOrder.id };
    } catch (error) {
      // Transaction : ROLLBACK
      await this.transactionService.rollbackTransaction(queryRunner);

      throw error;
    }
  }

  async showOrder(user: User) {
    // create query Builer
    const queryBuilder = this.orderRepo.createQueryBuilder('order');

    const orders = await queryBuilder
      .leftJoinAndSelect('order.products', 'product')
      .leftJoin('product.user', 'user')
      .where('user.id = :id', { id: user.id })
      .getMany();

    return orders;
  }

  async update(updateOrder: UpdateOrderDto) {
    // find
    const order = await this.orderRepo.findOneBy({ id: updateOrder.id });

    if (!order) throw new BadRequestException('Order Not Found');

    // update
    return await this.orderRepo.save({
      ...order,
      ...updateOrder,
    });
  }
}
