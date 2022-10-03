import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationRepository } from '@repositories/notification.repository';
import { TeamRepository } from '@repositories/team.repository';
import { GatewaysModule } from 'src/gateways/gateways.module';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [NotificationsService],
  imports: [
    TypeOrmModule.forFeature([NotificationRepository, TeamRepository]),
    GatewaysModule,
  ],
  exports: [NotificationsService],
})
export class NotificationsModule {}
