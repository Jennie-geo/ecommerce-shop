import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/admins/admins.service';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.adminsService.findOne(email);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email, name: user.name };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      is_admin: user.is_admin,
      access_token: await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      }),
    };
  }
}
