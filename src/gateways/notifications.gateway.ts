import { WsAuthGuard } from '@guards/ws-auth.guard';
import { ITokenPayload } from '@interfaces/token-payload.interface';
import {
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ListOldDto } from './dtos/list-old.dto';
import { WsExceptionFilter } from '../shared/filters/ws-exception.filter';
import { NotificationRepository } from '@repositories/notification.repository';
import { ReadNotificationDto } from './dtos/read-notification.dto';
import { ListOldResponse } from './reponses/list-old.response';

@UsePipes(new ValidationPipe())
@UseGuards(WsAuthGuard)
@UseFilters(new WsExceptionFilter())
@WebSocketGateway({ cors: true, namespace: 'notifications' })
export class NotificationsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private jwtService: JwtService,
    private notificationRepository: NotificationRepository,
  ) {}

  handleConnection(client: Socket) {
    try {
      const user: ITokenPayload = this.jwtService.verify(
        client.handshake.headers.authorization.split(' ')[1],
      );
      client.data = { user };
      client.join(`${user.id}`);
    } catch (e) {
      client.disconnect();
    }
  }

  @SubscribeMessage('list-old')
  async handleMessage(
    @MessageBody() data: ListOldDto,
    @ConnectedSocket() client: Socket,
  ): Promise<ListOldResponse> {
    const items = await this.notificationRepository.listNotifications(
      client.data.user.id,
      data,
    );
    return { items, timestamp: data.timestamp };
  }

  @SubscribeMessage('find-unread-totalizer')
  async unreadTotalier(@ConnectedSocket() client: Socket): Promise<number> {
    return await this.notificationRepository.unreadTotalizer(
      client.data.user.id,
    );
  }

  @SubscribeMessage('read-notification')
  async readNotification(
    @ConnectedSocket() client: Socket,
    @MessageBody() { notificationId }: ReadNotificationDto,
  ) {
    const userId = client.data.user.id;
    await this.notificationRepository.readNotification(userId, notificationId);
    client.to(`${userId}`).emit('read-notification', notificationId);
    this.server
      .to(`${userId}`)
      .emit(
        'unread-totalizer',
        await this.notificationRepository.unreadTotalizer(userId),
      );
  }
}
