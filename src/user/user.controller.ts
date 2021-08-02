import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './user-create.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  userCreate(
    @Body(ValidationPipe) userCreateDto: UserCreateDto,
  ): Promise<User> {
    return this.userService.createUser(userCreateDto);
  }
}
