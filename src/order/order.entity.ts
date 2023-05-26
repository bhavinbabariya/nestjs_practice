import { Product } from 'src/product/product.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Column,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 'pending' })
  status: string;

  @Column({ nullable: false })
  address: string;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToMany(() => Product, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinTable({
    name: 'order_details',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products?: Product[];
}
