import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './controllers/auth/auth.module';
import { environment } from 'src/environments/environment';
import { ImagesModule } from './controllers/images/images.module';
import { JwtAuthGuard, RolesGuard } from '@guards';
import { Module } from '@nestjs/common';
import { SchedulesModule } from './schedules/schedules.module';
import { TeamsModule } from './controllers/teams/teams.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(environment.database),
    TeamsModule,
    ImagesModule,
    SchedulesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AppModule {}
