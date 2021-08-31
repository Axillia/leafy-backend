import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreateDto } from './dto/category-create.dto';
import { Category } from './category.entity';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async createCategory(
    @Body(ValidationPipe) categoryCreateDto: CategoryCreateDto,
  ): Promise<Category> {
    return await this.categoryService.createCategory(categoryCreateDto);
  }

  @Get()
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:id')
  async getSubCategories(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Category[]> {
    return await this.categoryService.getSubCategories(id);
  }
}
