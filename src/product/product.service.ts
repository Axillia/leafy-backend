import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductCreateDto } from './dto/product-create.dto';
import { User } from '../user/user.entity';

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

  async getAllProduct(): Promise<Product[]> {
    return await this.productRepository.getAllProduct();
  }

  async getProductByID(id: number): Promise<Product> {
    const product = await this.productRepository.getProductByID(id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
