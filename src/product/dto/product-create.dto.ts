import { IsNumber, IsString } from 'class-validator';

export class ProductCreateDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  photo: string;

  @IsNumber()
  user: number;

  @IsNumber()
  condition: number;

  @IsNumber()
  location: number;
}
