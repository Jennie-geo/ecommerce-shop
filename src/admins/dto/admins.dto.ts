import { ApiProperty } from '@nestjs/swagger';

export class AdminDto {
  @ApiProperty({
    description: 'The unique identifier of the admin',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the admin',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'The email of the admin',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'TO check if the user is admin',
    example: true,
  })
  is_admin: boolean;

  @ApiProperty({
    description: 'The password of the admin',
    example: 'password123',
  })
  password: string;
}
