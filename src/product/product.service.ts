import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { In, Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
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
    return this.productRepo.findBy({
      id: In(Ids),
    });
  }
}
