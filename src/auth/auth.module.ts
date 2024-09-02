import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Admin } from 'src/entity/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AdminsService } from 'src/admins/admins.service';
import { jwtConstants } from './constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entity/product.entity';
import { Persons } from 'src/entity/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Products, Persons]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [AuthService, AdminsService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
