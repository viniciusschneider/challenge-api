import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token: string = context
      .getArgs()[0]
      ?.handshake?.headers?.authorization?.split(' ')[1];

    try {
      const user = this.jwtService.verify(token);
      if (!user) throw new Error();
      else return true;
    } catch (e) {
      throw new WsException('Unauthorized');
    }
  }
}
