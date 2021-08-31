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
import { RequestStatus } from './request-status.enum';

@Entity()
export class Request extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn()
  product: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  request_by: number;

  @Column()
  status: RequestStatus;
}
