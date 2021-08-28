import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  reporter: number;

  @Column()
  reason: string;

  @Column({ default: 0 })
  message: string;
}
