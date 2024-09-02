import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persons } from '../entity/person.entity';
import { Repository } from 'typeorm';
import { PersonDto } from './dto/person.dto';
import { Products } from 'src/entity/product.entity';
import { UpdateProductDto } from 'src/products/dto/updateProduct.dto';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Persons)
    private personsRepository: Repository<Persons>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
  ) {}

  async create(personDto: PersonDto): Promise<Persons> {
    try {
      const person = this.personsRepository.create(personDto);
      return await this.personsRepository.save(person);
    } catch (error) {
      console.log('ERROR', error);
      return error;
    }
  }
  async findOne(email: string) {
    const person = await this.personsRepository.findOne({ where: { email } });

    if (!person) throw new NotFoundException('User not found');

    return person;
  }
  async findAll(id: number) {
    const user = await this.personsRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const products = await this.productsRepository.find({
      where: { person: { id: user.id } },
      relations: ['person'],
    });
    if (products.length === 0) {
      throw new NotFoundException('Product not found');
    }
    const userProduct = products.filter(
      (product) => product.person.id === user.id,
    );

    return userProduct;
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
    userId: number,
  ) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['person'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.person.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to update this product',
      );
    }

    if (product.status === 'REJECTED') {
      throw new NotFoundException(
        'Your product can not be updated now beacuse it has been rejected.',
      );
    }
    Object.assign(product, updateProductDto);

    return this.productsRepository.save(product);
  }

  async removeProduct(id: number, userId: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['person'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    if (product.person.id !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this product',
      );
    }

    return await this.productsRepository.delete(id);
  }
}
