import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PersonsService } from './persons.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonDto } from './dto/person.dto';
import { UpdateProductDto } from 'src/products/dto/updateProduct.dto';
import { AuthGuard } from 'src/userauth/auth.guard';

@ApiTags('persons')
@Controller('users')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: PersonDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createPersonDto: PersonDto) {
    return this.personsService.create(createPersonDto);
  }
  @Get('products')
  @UseGuards(AuthGuard)
  findAll(@Request() req) {
    const userId = req.user.id;
    return this.personsService.findAll(userId);
  }

  @Patch('product/:id/update')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.personsService.updateProduct(id, updateProductDto, userId);
  }

  @Delete('product/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.personsService.removeProduct(id, userId);
  }
}
