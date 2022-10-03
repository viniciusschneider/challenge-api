import { environment } from 'src/environments/environment';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ITokenPayload } from '@interfaces';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.secret,
    });
  }

  async validate(user: ITokenPayload): Promise<ITokenPayload> {
    return user;
  }
}
