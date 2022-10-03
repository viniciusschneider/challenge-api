import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '@repositories/address.repository';
import { MatchRepository } from '@repositories/match.repository';
import { TeamRepository } from '@repositories/team.repository';
import { NotificationsModule } from 'src/shared/services/notifications/notifications.module';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService],
  imports: [
    TypeOrmModule.forFeature([
      AddressRepository,
      MatchRepository,
      TeamRepository,
    ]),
    NotificationsModule,
  ],
})
export class MatchesModule {}
