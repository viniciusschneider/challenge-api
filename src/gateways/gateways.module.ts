import { Jwt } from '@config-modules/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationRepository } from '@repositories/notification.repository';
import { NotificationsGateway } from './notifications.gateway';

@Module({
  imports: [Jwt.config(), TypeOrmModule.forFeature([NotificationRepository])],
  providers: [NotificationsGateway],
  exports: [NotificationsGateway],
})
export class GatewaysModule {}
