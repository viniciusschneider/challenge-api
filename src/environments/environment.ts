import { entities } from "@entities";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const environment = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities,
    synchronize: true,
  } as TypeOrmModuleOptions,
  secret: 'test'
};