import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import * as dotenv from 'dotenv';

dotenv.config();
// const config: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: process.env.DB_HOST,
//   port: 3306,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_SCHEMA,
//   entities: [
//     __dirname + '/../**/*.entity.{js,ts}'
//     // __dirname + '../entities/*.entity.{js,ts}'
//     // __dirname + '../entities/*.{js,ts}'
//     // __dirname + '/../**/index.ts'
//     // __dirname + '/../**/*.{js,ts}'
//   ],
//   migrations: [__dirname + '/src/database/migrations/*.ts'],
//   cli: { migrationsDir: 'src/database/migrations' },
//   autoLoadEntities: true,
//   charset: 'utf8mb4',
//   synchronize: false,
//   logging: true,
//   keepConnectionAlive: true,
//   namingStrategy: new SnakeNamingStrategy(),
// };

// export = config;