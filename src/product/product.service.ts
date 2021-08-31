import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductCreateDto } from './dto/product-create.dto';
import { User } from '../user/user.entity';
import { PaginationDto } from './dto/pagination.dto';
import { PaginateProductResult } from './dto/paginate-product-result';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(
    productCreateDto: ProductCreateDto,
    user: User,
  ): Promise<Product> {
    return await this.productRepository.createProduct(productCreateDto, user);
  }

  async getAllProduct(
    paginationDto: PaginationDto,
  ): Promise<PaginateProductResult> {
    const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

    const totalCount = await this.productRepository.count();
    let totalPages = Math.floor(totalCount / paginationDto.limit);
    if (totalCount % paginationDto.limit > 0) {
      totalPages++;
    }

    const products = await this.productRepository
      .createQueryBuilder('product')
      .orderBy('product.id', 'DESC')
      .leftJoinAndSelect('product.location', 'location')
      .leftJoinAndSelect('product.condition', 'condition')
      .offset(skippedItems)
      .limit(paginationDto.limit)
      .getMany();

    return {
      totalCount,
      totalPages: totalPages,
      page: paginationDto.page,
      limit: paginationDto.limit,
      data: products,
    };
  }

  async getProductByID(id: number): Promise<Product> {
    const product = await this.productRepository.getProductByID(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
