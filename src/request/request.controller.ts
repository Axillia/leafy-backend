import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestService } from './request.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/user.entity';
import { RequestCreateDto } from './dto/request-create.dto';
import { Request } from './request.entity';

@Controller('request')
@UseGuards(AuthGuard())
export class RequestController {
  constructor(private requestService: RequestService) {}

  @Get()
  async getRequestsByOwner(@GetUser() user: User) {
    return await this.requestService.getRequestsByOwner(user);
  }

  @Get('/product')
  async getRequestsByProductOwner(@GetUser() user: User) {
    return await this.requestService.getRequestsByProductOwner(user);
  }

  @Post()
  async createRequest(
    @GetUser() user: User,
    @Body(ValidationPipe) requestCreateDto: RequestCreateDto,
  ): Promise<Request> {
    return await this.requestService.createRequest(requestCreateDto, user);
  }
}
