import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductCreateDto } from './dto/product-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { PaginateProductResult } from './dto/paginate-product-result';
import { PaginationDto } from './dto/pagination.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard())
  async createProduct(
    @GetUser() user: User,
    @Body(ValidationPipe) productCreateDto: ProductCreateDto,
  ): Promise<Product> {
    return await this.productService.createProduct(productCreateDto, user);
  }

  @Get('/all')
  async getAllProduct(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginateProductResult> {
    return await this.productService.getAllProduct(paginationDto);
  }

  @Get('/:id')
  getProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.getProductByID(id);
  }
}
