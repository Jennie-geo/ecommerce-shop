import { IsNotEmpty, IsString } from 'class-validator';
export class SigninUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;
}
