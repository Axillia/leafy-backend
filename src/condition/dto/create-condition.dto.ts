import { IsString } from 'class-validator';

export class CreateConditionDto {
  @IsString()
  name: string;

  @IsString()
  label_icon: string;

  @IsString()
  label_color: string;
}
