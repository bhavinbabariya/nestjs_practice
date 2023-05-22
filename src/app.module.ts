import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GlobalModule } from './global.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { BuyerGuard } from './users/buyer.guard';
import { OrderModule } from './order/order.module';
import { SellerGuard } from './users/seller.guard';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    UsersModule,
    ProductModule,
    OrderModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService, SellerGuard, BuyerGuard],
  exports: [SellerGuard, BuyerGuard],
})
export class AppModule {}
