import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReportCreateDto {
  @IsNumber()
  product: number;

  @IsString()
  reason: string;

  @IsString()
  @IsOptional()
  message: string;
}
