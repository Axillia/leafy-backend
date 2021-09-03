import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductCreateDto } from './dto/product-create.dto';
import { User } from '../user/user.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(
    productCreateDto: ProductCreateDto,
    user: User,
  ): Promise<Product> {
    const { name, description, photo, location, condition, category } =
      productCreateDto;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.photo = photo;
    product.user = user.id;
    product.location = location;
    product.condition = condition;
    product.posted_date = new Date();
    product.category = category;

    return await product.save();
  }

  async getProductByID(id: number): Promise<Product> {
    await this.createQueryBuilder()
      .update(Product)
      .set({ view_count: () => 'view_count + 1' })
      .where('product.id = :id', { id: id })
      .execute();

    const query = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product.location', 'location')
      .leftJoinAndSelect('product.condition', 'condition')
      .where('product.id = :id', { id: id });

    return await query.getOne();
  }
}
