import { IsNumber, IsString } from 'class-validator';

export class CommentCreateDto {
  @IsNumber()
  product: number;

  @IsString()
  question: string;
}
