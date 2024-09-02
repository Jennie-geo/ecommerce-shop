import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { AuthGuard } from 'src/userauth/auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createProduct(@Body() createProductDto: any, @Request() req) {
    const userId = req.user.id;
    return this.productService.createProduct(createProductDto, userId);
  }

  @Get('approved')
  async findAllUser() {
    return this.productService.findAllApprovedProducts();
  }
}
