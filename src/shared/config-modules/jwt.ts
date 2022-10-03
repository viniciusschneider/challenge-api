import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/environments/environment';

export class Jwt {
  static config() {
    return JwtModule.register({
      secret: environment.secret,
      signOptions: { expiresIn: '60s' },
    });
  }
}
