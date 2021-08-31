import { Product } from '../product.entity';

export class PaginateProductResult {
  data: Product[];
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}
