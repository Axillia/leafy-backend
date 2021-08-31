import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CategoryCreateDto } from './dto/category-create.dto';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async createCategory(
    categoryCreateDto: CategoryCreateDto,
  ): Promise<Category> {
    return await this.categoryRepository.createCategory(categoryCreateDto);
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.parent IS NULL')
      .getMany();

    return categories;
  }

  async getSubCategories(parent_id: number): Promise<Category[]> {
    const subCategories = await this.categoryRepository
      .createQueryBuilder('category')
      .where('category.parent = :parent_id', { parent_id: parent_id })
      .getMany();

    return subCategories;
  }
}