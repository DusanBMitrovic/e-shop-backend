import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductType } from './ProductType';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  numberOnStock: number;

  @Column()
  description: String;

  @Column()
  price: number;

  @ManyToOne(
    type => ProductType,
    productType => productType.products,
    {
      cascade: true
    }
  )
  productType: ProductType;
}
