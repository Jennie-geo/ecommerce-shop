import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @ApiProperty({
    description: 'The unique identifier of the product owner or buyer',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the person',
    example: 'Jessy Adams',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the person',
    example: 'jessy.adams@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the person',
    example: 'password123',
  })
  password: string;
}
