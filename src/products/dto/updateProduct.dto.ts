import { ApiProperty } from '@nestjs/swagger';
export class UpdateProductDto {
  @ApiProperty({
    description: 'Update product unique identifier',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Update Product name',
    example: 'Olive Soap',
  })
  name: string;

  @ApiProperty({
    description: 'Update The description of the product',
    example: 'Good for your body, with 99.9 skin protection.',
  })
  description: string;

  @ApiProperty({
    description: 'Update The price of the product',
    example: 19.99,
  })
  price: number;

  @ApiProperty({
    description: '  Update The quantity of the product in stock',
    example: 100,
  })
  quantity: number;

  @ApiProperty({
    description: 'Update The image of the product',
    example: 'https://testimage.com',
  })
  image: string;
}
