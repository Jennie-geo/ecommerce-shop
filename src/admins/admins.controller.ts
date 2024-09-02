import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminsService } from './admins.service';
import { AdminDto } from './dto/admins.dto';
import { Admin } from 'src/entity/admin.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductDto } from 'src/products/dto/product.dto';
import { PersonDto } from 'src/persons/dto/person.dto';

@ApiTags('admins')
@Controller('admins')
export class AdminsController {
  constructor(private adminService: AdminsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Admin has been successfully created.',
    type: AdminDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() adminDto: AdminDto): Promise<Admin> {
    return this.adminService.create(adminDto);
  }

  @Get('products')
  @ApiResponse({
    status: 200,
    description: 'Products retrieved successfully.',
  })
  @UseGuards(AuthGuard)
  async findAll() {
    return this.adminService.findAllProducts();
  }

  @Patch('products/:id/status/update')
  @ApiResponse({
    status: 200,
    description: 'Product approved successfully.',
    type: ProductDto,
  })
  @UseGuards(AuthGuard)
  async approveProduct(
    @Param('id') productId: number,
    @Body('status') status: string,
  ) {
    const product = await this.adminService.findOneProduct(productId);

    const productStatusUpdate = await this.adminService.updateProductStatus(
      product.id,
      status,
    );

    return productStatusUpdate;
  }

  @Get('users')
  @ApiResponse({
    status: 200,
    description: 'Users retrieved sucessfully.',
    type: PersonDto,
  })
  @UseGuards(AuthGuard)
  async findAllUser() {
    return this.adminService.findAllUsers();
  }

  @Patch('users/:id/is-ban')
  @ApiResponse({
    status: 200,
    description: 'Users has been ban from accessing any endpoint.',
  })
  @UseGuards(AuthGuard)
  async banUser(
    @Param('id') id: number,
    @Body('ban') ban: boolean,
    @Request() req,
  ) {
    const adminId = req.admin.id;
    return this.adminService.banUser(id, ban, adminId);
  }
}
