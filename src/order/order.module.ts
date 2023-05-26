import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Product } from 'src/product/product.entity';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/users/users.module';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderDetails } from './order_details.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetails]),
    AuthModule,
    UsersModule,
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
