import { IsEnum, IsNumber } from 'class-validator';
import { RequestStatus } from '../request-status.enum';

export class RequestCreateDto {
  @IsNumber()
  product: number;

  @IsEnum(RequestStatus)
  status: RequestStatus;
}
