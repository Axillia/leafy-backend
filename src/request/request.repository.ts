import { EntityRepository, Repository } from 'typeorm';
import { Request } from './request.entity';
import { RequestCreateDto } from './dto/request-create.dto';
import { User } from '../user/user.entity';

@EntityRepository(Request)
export class RequestRepository extends Repository<Request> {
  async createRequest(requestCreateDto: RequestCreateDto, user: User) {
    const { product, status } = requestCreateDto;

    const request = new Request();
    request.product = product;
    request.status = status;
    request.request_by = user.id;

    return await request.save();
  }

  async getRequestsByOwner(user: User) {
    const query = this.createQueryBuilder('request')
      .leftJoinAndSelect('request.product', 'product')
      .where('request.request_by = :user_id', { user_id: user.id })
      .andWhere('request.status = :status', { status: 'PENDING' });

    return await query.getMany();
  }

  async getRequestsByProductOwner(user: User) {
    const query = this.createQueryBuilder('request')
      .leftJoinAndSelect('request.product', 'product')
      .where('product.user = :user_id', { user_id: user.id })
      .andWhere('request.status = :status', { status: 'PENDING' });

    return await query.getMany();
  }
}
