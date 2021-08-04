import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductCreateDto } from './dto/product-create.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async createProduct(
    @Body(ValidationPipe) productCreateDto: ProductCreateDto,
  ): Promise<Product> {
    return await this.productService.createProduct(productCreateDto);
  }

  @Get('/all')
  async getAllProduct(): Promise<Product[]> {
    return await this.productService.getAllProduct();
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductByID(id);
  }
}
