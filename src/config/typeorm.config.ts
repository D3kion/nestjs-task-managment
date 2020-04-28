import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'qwerty12+',
  database: 'taskmanagement',
  entities: [__dirname + '/../../dist/**/*.entity.js'],
  synchronize: true,
};
