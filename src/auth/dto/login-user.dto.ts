import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class SigninAdminDto {
  @ApiProperty({
    description: 'The email of the admin',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The password of the admin',
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}
