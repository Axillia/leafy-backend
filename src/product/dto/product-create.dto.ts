import { IsNumber, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  photo: string;

  @IsNumber()
  condition: number;

  @IsNumber()
  location: number;
}
