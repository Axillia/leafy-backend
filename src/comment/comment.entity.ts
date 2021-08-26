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
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: number;

  @Column()
  question: string;

  @Column({ default: null })
  answer: string;
}
