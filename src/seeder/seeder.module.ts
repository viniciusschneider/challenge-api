import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeImageRepository } from '@repositories/type-image.repository';
import { TypeLeagueRepository } from '@repositories/type-league.repository';
import { TypeNotificationRepository } from '@repositories/type-notification.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSportRepository } from '@repositories/type-sport.repository';
import { UserRepository } from '@repositories/user.repository';

@Module({
  providers: [SeederService],
  imports: [
    TypeOrmModule.forFeature([
      TypeImageRepository,
      TypeLeagueRepository,
      TypeNotificationRepository,
      TypeSportRepository,
      UserRepository,
    ]),
  ],
})
export class SeederModule {}
