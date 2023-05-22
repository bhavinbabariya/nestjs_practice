import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Check,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  pName: string;

  @Column({ type: 'integer', nullable: false, unsigned: true, default: 0 })
  @Check(`"price" >= 0`)
  price: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
