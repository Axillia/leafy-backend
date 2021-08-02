import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user-create.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async userCreate(userCreateDto: UserCreateDto): Promise<User> {
    const { email, phone, password, f_name, l_name, location_id, bio, avatar } =
      userCreateDto;

    const user = new User();
    user.email = email;
    user.phone = phone;
    user.salt = await bcrypt.genSalt();
    user.password = await UserRepository.hashPassword(password, user.salt);
    user.f_name = f_name;
    user.l_name = l_name;
    user.location_id = location_id;
    user.bio = bio;
    user.avatar = avatar;
    user.points = 0;
    user.membership_date = new Date();
    return await user.save();
  }

  private static async hashPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
