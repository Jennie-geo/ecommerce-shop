import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'Product unique identifier',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Product name',
    example: 'Olive Soap',
  })
  name: string;

  @ApiProperty({
    description: 'The description of the product',
    example: 'Good for your body, with 99.9 skin protection.',
  })
  description: string;

  @ApiProperty({
    description: 'The price of the product',
    example: 19.99,
  })
  price: number;

  @ApiProperty({
    description: 'The quantity of the product in stock',
    example: 100,
  })
  quantity: number;

  @ApiProperty({
    description: 'The image of the product',
    example: 'https://testimage.com',
  })
  image: string;

  @ApiProperty({
    description: 'The status of the product',
    example: 'PENDING',
  })
  status: string;
}
