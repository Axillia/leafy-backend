import {
  IsEmail,
  IsMobilePhone,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class UserCreateDto {
  @IsEmail()
  email: string;

  @IsMobilePhone()
  phone: string;

  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  )
  password: string;

  @IsString()
  f_name: string;

  @IsString()
  l_name: string;

  @IsNumber()
  location_id: number;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
