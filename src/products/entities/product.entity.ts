import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCondition } from '../enums';

@Entity('products')
class Product {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('text', { unique: true })
  slug: string;

  @Column('text')
  brand: string;

  @Column('text')
  color: string;

  @Column('float', { default: 0 })
  price: number;

  @Column('text')
  description: string;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column({
    type: 'text',
    array: true,
    default: [ProductCondition.new]
  })
  condition: ProductCondition[];

  @Column({
    type: 'int', 
    nullable: true,
    default: 0,
  })
  stock: number;

  @Column({ type: 'bool', default: false })
  published?: boolean;

  @Column('text')
  category: string;

  @Column({
    type: 'text',
    array: true,
    default: []
  })
  tags?: string[];

  @Column({
    type: 'text',
    nullable: true,
    default: String(new Date().getTime()),
  })
  createdAt: string;

  @Column({
    type: 'text',
    nullable: true,
    default: String(new Date().getTime()),
  })
  updatedAt: string;
}

export default Product;