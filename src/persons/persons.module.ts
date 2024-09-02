import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { Persons } from '../entity/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persons])],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService, PersonsModule],
})
export class PersonsModule {}
