import { IsNumber, IsOptional } from 'class-validator';

export class GetProductsFilterDto {
  @IsNumber()
  @IsOptional()
  category: number;

  @IsNumber()
  @IsOptional()
  location: number;
}
