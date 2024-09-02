import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { ProductsModule } from 'src/products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entity/admin.entity';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), ProductsModule, PersonsModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
