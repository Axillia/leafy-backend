import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'pgAdmin',
  database: 'leafy',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
