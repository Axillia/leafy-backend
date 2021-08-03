import { IsString } from 'class-validator';

export class LocationCreateDto {
  @IsString()
  name: string;
}
