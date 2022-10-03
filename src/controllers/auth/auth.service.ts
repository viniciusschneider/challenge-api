import { Injectable } from '@nestjs/common';
import { IUserLogin } from './interfaces/user-login.interface';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async getUserToLogin(email: string): Promise<IUserLogin | undefined> {
    const user: any = await this.userRepository.findOne({
      select: ['id', 'email', 'password', 'role', 'name'],
      where: { email },
    });

    return user;
  }

  login(user: IUserLogin): { token: string } {
    delete user.password;
    return { token: this.jwtService.sign({ ...user }, { expiresIn: '30d' }) };
  }
}
