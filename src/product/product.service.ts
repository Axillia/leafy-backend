import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import { ProductCreateDto } from './dto/product-create.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  async createProduct(productCreateDto: ProductCreateDto): Promise<Product> {
    return await this.productRepository.createProduct(productCreateDto);
  }

  async getAllProduct(): Promise<Product[]> {
    return await this.productRepository.getAllProduct();
  }

  async getProductByID(id: number): Promise<Product> {
    const product = await this.productRepository.findOne(id, {
      relations: ['user', 'condition', 'location'],
    });

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
