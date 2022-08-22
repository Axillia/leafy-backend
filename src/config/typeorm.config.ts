import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'ec2-3-224-184-9.compute-1.amazonaws.com',
  url: process.env.TYPEORM_URI,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE || 'leafy',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
