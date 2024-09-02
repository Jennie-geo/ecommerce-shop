import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonLoginDto } from 'src/persons/dto/person.dto';
@ApiTags('user_auths')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('user-login')
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
    type: PersonLoginDto,
  })
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
