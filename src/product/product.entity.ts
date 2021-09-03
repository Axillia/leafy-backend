import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Condition } from '../condition/condition.entity';
import { Location } from '../location/location.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    default:
      'https://leafy-assets.s3.ap-southeast-1.amazonaws.com/default-product-photo.png',
  })
  photo: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: number;

  @ManyToOne(() => Condition, (condition) => condition.id)
  @JoinColumn()
  condition: number;

  @ManyToOne(() => Location, (location) => location.id)
  @JoinColumn()
  location: number;

  @Column()
  posted_date: Date;

  @Column({ default: true })
  status: boolean;

  @Column({ default: 0 })
  view_count: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn()
  category: number;
}
