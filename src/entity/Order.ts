import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  //   @Column()
  datetime: string;

  @Column()
  customerName: string;

  @Column()
  customerAddress: string;

  @Column()
  zipCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  napomena: string;

  @ManyToMany(
    type => Product,
    product => product.orders,
    {
      cascade: true
    }
  )
  @JoinTable()
  products: Product[];
}
