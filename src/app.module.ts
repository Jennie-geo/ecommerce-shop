import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Persons } from './entity/person.entity';
import { Admin } from './entity/admin.entity';
import { Products } from './entity/product.entity';
import { AdminsController } from './admins/admins.controller';
import { AdminsService } from './admins/admins.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PersonsService } from './persons/persons.service';
import { PersonsController } from './persons/persons.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserAuthModule } from './userauth/auth.module';
import { ProductsModule } from './products/products.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Admin, Persons, Products],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Admin, Persons]),
    AuthModule,
    UserAuthModule,
    ProductsModule,
  ],
  controllers: [
    AuthController,
    AppController,
    AdminsController,
    PersonsController,
  ],
  providers: [
    AuthService,
    AppService,
    PersonsService,
    AdminsService,
    JwtService,
  ],
})
export class AppModule {}
