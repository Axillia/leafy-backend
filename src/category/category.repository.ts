import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryCreateDto } from './dto/category-create.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(
    categoryCreateDto: CategoryCreateDto,
  ): Promise<Category> {
    const { name, parent } = categoryCreateDto;

    const category = new Category();
    category.name = name;
    category.parent = parent;

    return await category.save();
  }
}
