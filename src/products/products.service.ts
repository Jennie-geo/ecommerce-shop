import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Persons } from 'src/entity/person.entity';
import { Products } from 'src/entity/product.entity';
import { Status } from 'src/enum/product.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private productRepository: Repository<Products>,
    @InjectRepository(Persons)
    private personsRepository: Repository<Persons>,
  ) {}
  async createProduct(
    createProductDto: any,
    userId: number,
  ): Promise<Products> {
    const person = await this.personsRepository.findOne({
      where: { id: userId },
    });
    if (!person) {
      throw new NotFoundException('User not found');
    }

    const product = this.productRepository.create({
      name: createProductDto.name,
      person,
      description: createProductDto.description,
      quantity: createProductDto.quantity,
      image: createProductDto.image,
      price: createProductDto.price,
    });

    return this.productRepository.save(product);
  }

  async findAllApprovedProducts() {
    const products = await this.productRepository.find();

    if (products.length === 0) {
      throw new NotFoundException('Product not found');
    }

    const approvedProducts = products.filter(
      (product) => product.status === Status.APPROVED,
    );
    if (approvedProducts.length === 0) {
      throw new NotFoundException('No approved product found');
    }

    return approvedProducts;
  }
}
