import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RequestRepository } from './request.repository';
import { RequestCreateDto } from './dto/request-create.dto';
import { User } from '../user/user.entity';
import { Request } from './request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestRepository)
    private requestRepository: RequestRepository,
  ) {}

  async createRequest(
    requestCreateDto: RequestCreateDto,
    user: User,
  ): Promise<Request> {
    return await this.requestRepository.createRequest(requestCreateDto, user);
  }

  async getRequestsByOwner(user: User): Promise<Request[]> {
    return await this.requestRepository.getRequestsByOwner(user);
  }

  async getRequestsByProductOwner(user: User): Promise<Request[]> {
    return await this.requestRepository.getRequestsByProductOwner(user);
  }
}
