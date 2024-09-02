import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class AuthService {
  constructor(
    private personsService: PersonsService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.personsService.findOne(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email, name: user.name };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
