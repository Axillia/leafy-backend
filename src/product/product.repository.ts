import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductCreateDto } from './dto/product-create.dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(productCreateDto: ProductCreateDto): Promise<Product> {
    const { name, description, photo, user, location, condition } =
      productCreateDto;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.photo = photo;
    product.user = user;
    product.location = location;
    product.condition = condition;
    product.posted_date = new Date();

    return await product.save();
  }

  async getAllProduct(): Promise<Product[]> {
    const query = this.createQueryBuilder('product')
      .leftJoinAndSelect('product.user', 'user')
      .leftJoinAndSelect('product.location', 'location')
      .leftJoinAndSelect('product.condition', 'condition');

    return await query.getMany();
  }
}