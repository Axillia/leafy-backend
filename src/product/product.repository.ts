import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductCreateDto } from './dto/product-create.dto';
import { User } from '../user/user.entity';
import { PaginationDto } from './dto/pagination.dto';
import { PaginateProductResult } from './dto/paginate-product-result';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

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

  async getAllProduct(
    paginationDto: PaginationDto,
    filterDto: GetProductsFilterDto,
  ): Promise<PaginateProductResult> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;
    const { location, category } = filterDto;

    const query = this.createQueryBuilder('product')
      .orderBy('product.id', 'DESC')
      .leftJoinAndSelect('product.location', 'location')
      .leftJoinAndSelect('product.condition', 'condition')
      .offset(skippedItems)
      .limit(paginationDto.limit);

    if (location) {
      query.andWhere('product.location = :location', { location });
    }

    if (category) {
      query.andWhere('product.category = :category', { category });
    }

    const totalCount = await query.getCount();
    let totalPages = Math.floor(totalCount / paginationDto.limit);
    if (totalCount % paginationDto.limit > 0) {
      totalPages++;
    }

    const products = await query.getMany();

    return {
      totalCount,
      totalPages: totalPages,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: products,
    };
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
