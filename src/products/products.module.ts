import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entity/product.entity';
import { Persons } from 'src/entity/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Persons])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [TypeOrmModule.forFeature([Products])],
})
export class ProductsModule {}
