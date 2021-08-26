import { IsString } from 'class-validator';

export class CommentUpdateDto {
  @IsString()
  answer: string;
}
