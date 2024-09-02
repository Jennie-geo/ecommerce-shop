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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Post('creates')
  @ApiResponse({
    status: 201,
    description: 'Product created an authenticated user sucessfully.',
    type: ProductDto,
  })
  @UseGuards(AuthGuard)
  async createProduct(@Body() createProductDto: any, @Request() req) {
    const userId = req.user.id;
    return this.productService.createProduct(createProductDto, userId);
  }

  @Get('approved')
  @ApiResponse({
    status: 201,
    description: 'Product retrieved successfully.',
    type: ProductDto,
  })
  async displayApprovedProducts() {
    return this.productService.findAllApprovedProducts();
  }
}
