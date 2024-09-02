import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/entity/admin.entity';
import { AdminDto } from './dto/admins.dto';
import { Products } from 'src/entity/product.entity';
import { Status } from 'src/enum/product.enum';
import { Persons } from 'src/entity/person.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Persons)
    private personsRepository: Repository<Persons>,
  ) {}

  async create(adminDto: AdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(adminDto);
    return await this.adminRepository.save(admin);
  }

  async findOne(email: string) {
    const user = await this.adminRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findAllProducts() {
    const products = await this.productsRepository.find();
    if (products.length === 0) {
      throw new NotFoundException();
    }

    return products;
  }

  async findOneProduct(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product does not exist');

    return product;
  }

  async updateProductStatus(
    productId: number,
    status: string,
  ): Promise<Products> {
    const product = await this.productsRepository.findOne({
      where: { id: productId, status: Status.PENDING },
    });

    if (!product) throw new NotFoundException('Product not found');

    const newStatus = status.toUpperCase() as Status;

    product.status = newStatus;
    return await this.productsRepository.save(product);
  }

  async findAllUsers() {
    const persons = await this.personsRepository.find();
    if (persons.length === 0) {
      throw new NotFoundException();
    }

    return persons;
  }

  async banUser(id: number, ban: boolean, adminId: number) {
    const admin = await this.adminRepository.findOne({
      where: { id: adminId },
    });
    if (!admin) {
      throw new UnauthorizedException(
        'You are not an admin, so you are not authorized to ban/unban a user',
      );
    }
    const person = await this.personsRepository.findOne({
      where: { id },
    });
    if (!person) {
      throw new NotFoundException('User not found');
    }
    person.is_banned = ban;

    return await this.personsRepository.save(person);
  }
}
