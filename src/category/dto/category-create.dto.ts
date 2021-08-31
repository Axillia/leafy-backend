import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CategoryCreateDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  parent: number;
}
