import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './Product';
import { Order } from './Order';

@Entity()
export class ProductToOrder {
  @PrimaryGeneratedColumn()
  public productToOrderId!: number;

  @Column()
  public orderId!: number;

  @Column()
  public productId!: number;

  @Column()
  public numberToOrder!: number;

  @ManyToOne(
    type => Product,
    product => product.productToOrder
  )
  public product!: Product;

  @ManyToOne(
    type => Order,
    order => order.productToOrder
  )
  public order!: Order;
}
