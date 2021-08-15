import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  photo: string;

  @IsNumber()
  condition: number;

  @IsNumber()
  location: number;
}
