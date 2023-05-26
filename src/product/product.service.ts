import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/order/dtos/place-order.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { User } from 'src/users/users.entity';
import { In, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private transactionService: TransactionService,
  ) {}

  async create(pName: string, price: number, user: User) {
    let product = { pName, price, user: user };
    product = this.productRepo.create(product);

    const p = await this.productRepo.save(product);

    const resData = {
      ...p,
      userId: p.user.id,
    };

    delete resData.user;

    return resData;
  }

  async findByIds(Ids: number[]) {
    return await this.productRepo.findBy({
      id: In(Ids),
    });
  }

  async checkAndDecreaseQuantity(cart: CartItem[]) {
    // TRANSACTION : START
    const queryRunner = await this.transactionService.startTransaction();

    try {
      const result = await Promise.all(
        cart.map(async (cartProduct) => {
          const product = await queryRunner.manager.findOneBy(Product, {
            id: cartProduct.pId,
          });

          if (!product) {
            throw new BadRequestException('product not found');
          }

          if (product.quantity < cartProduct.quantity) {
            throw new BadRequestException('out of stock');
          }

          product.quantity = product.quantity - cartProduct.quantity;
          await queryRunner.manager.save(Product, product);
          return true;
        }),
      );

      // TRANSACTION : COMMIT

      queryRunner.commitTransaction();
    } catch (exception: any) {
      // TRANSACTION : ROLLBACK
      queryRunner.rollbackTransaction();

      throw exception;
    }
  }
}
