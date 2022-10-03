import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Jwt } from '@config-modules/jwt';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { LocalStrategy } from 'src/shared/strategies/local.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@repositories/user.repository';

@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserRepository]), Jwt.config()],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
