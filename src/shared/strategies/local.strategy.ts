import { AuthService } from "src/controllers/auth/auth.service";
import { HttpMessages } from "@common/http-messages";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { IUserLogin } from "src/controllers/auth/interfaces/user-login.interface";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    });
  }

  async validate(email, password): Promise<IUserLogin> {
    const user = await this.authService.getUserToLogin(email);

    if (!user || !bcrypt.compareSync(password, user.password)) 
      throw new UnauthorizedException(HttpMessages.INVALID_CREDENTIALS);

    return user;
  }
}
