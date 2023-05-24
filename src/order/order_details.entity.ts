import { Product } from 'src/product/product.entity';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class OrderDetails {
  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @Column({ default: 1 })
  quantity: number;
}
