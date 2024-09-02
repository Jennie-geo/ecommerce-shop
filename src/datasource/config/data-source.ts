import { DataSource } from 'typeorm';
// import { Admin } from 'src/entity/admin.entity';
// import { Person } from 'src/entity/person.entity';
// import { Product } from 'src/entity/product.entity';
import { config } from 'dotenv';

config(); // Load environment variables

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/datasource/migrations/**/*.ts'], //['src/database/migrations/**/*.ts'],
  synchronize: false,
});
