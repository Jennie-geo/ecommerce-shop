import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsService } from 'src/persons/persons.service';
import { Persons } from 'src/entity/person.entity';
import { Products } from 'src/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persons, Products]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  providers: [AuthService, PersonsService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class UserAuthModule {}
