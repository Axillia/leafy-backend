import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private authRepository: AuthRepository,
  ) {}

  async login(authCredentialsDto: AuthCredentialsDto) {
    return this.authRepository.validationPassword(authCredentialsDto);
  }
}