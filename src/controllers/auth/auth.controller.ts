import { AuthService } from './auth.service';
import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { IUserLogin } from './interfaces/user-login.interface';
import { LocalGuard } from '@guards';
import { Public } from '@decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Request() { user }: { user: IUserLogin }) {
    return this.authService.login(user);
  }
}
