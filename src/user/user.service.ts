import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(userCreateDto: UserCreateDto): Promise<User> {
    return this.userRepository.userCreate(userCreateDto);
  }
}
