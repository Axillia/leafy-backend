import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductCreateDto } from './dto/product-create.dto';
import { User } from '../user/user.entity';
import { PaginationDto } from './dto/pagination.dto';
import { PaginateProductResult } from './dto/paginate-product-result';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';

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
    filterDto: GetProductsFilterDto,
  ): Promise<PaginateProductResult> {
    return await this.productRepository.getAllProduct(paginationDto, filterDto);
  }

  async getProductByID(id: number): Promise<Product> {
    const product = await this.productRepository.getProductByID(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
