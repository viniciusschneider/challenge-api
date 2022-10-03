import { EntityRepository, Repository } from 'typeorm';
import { NotificationEntity } from '@entities/notification.entity';
import { EnumTypeNotificationsId } from '@enums/type-notifications-id.enum';
import { IConfirmMatchNotification } from '@interfaces/confirm-match-notification.interface';
import { EnumTypeEntities } from '@enums/type-entities.enum';
import { EnumTypeImagesId } from '@enums/type-images-id.enum';
import { getAppUrl } from '@common/functions';
import { ListOldDto } from 'src/gateways/dtos/list-old.dto';
import { ListOldItem } from 'src/gateways/reponses/list-old.response';
import { WsException } from '@nestjs/websockets';

@EntityRepository(NotificationEntity)
export class NotificationRepository extends Repository<NotificationEntity> {
  async confirmMatch({
    fromId,
    localTeamId,
    to,
    visitingTeamId,
  }: IConfirmMatchNotification) {
    const notification = await this.save({
      typeNotificationId: EnumTypeNotificationsId.CONFIRM_MATCH,
      userId: to,
      fromId,
      localTeamId,
      visitingTeamId,
    });

    return notification;
  }

  async listNotifications(
    userId,
    { page, limit, timestamp }: ListOldDto,
  ): Promise<ListOldItem[]> {
    return (await this.createQueryBuilder('n')
      .select('n.id', 'id')
      .addSelect('t.name', 'teamName')
      .addSelect('n.created_at', 'createdAt')
      .addSelect('n.read', 'read')
      .addSelect(`CONCAT('${getAppUrl()}', i.path)`, 'image')
      .leftJoin('teams', 't', 't.id = n.team_id')
      .leftJoin(
        'images',
        'i',
        `
          i.entity_id = t.id
          and i.type_image_id = :typeImageId
          and i.entity_type = :entityType
        `,
        {
          entityType: EnumTypeEntities.TEAM,
          typeImageId: EnumTypeImagesId.TEAM_LOGO,
        },
      )
      .where({ userId })
      .andWhere('n.created_at <= :date', { date: new Date(timestamp) })
      .orderBy('n.created_at', 'DESC')
      .limit(limit)
      .offset((page - 1) * limit)
      .getRawMany()) as ListOldItem[];
  }

  async unreadTotalizer(userId: number): Promise<number> {
    return await this.count({
      where: { userId, read: false },
    });
  }

  async readNotification(
    userId: number,
    notificationId: number,
  ): Promise<void> {
    const notification = await this.findOne({ userId, id: notificationId });
    if (!notification) throw new WsException('notificationId is invalid');

    await this.update({ id: notificationId }, { read: true });
  }

  async unreadTotalizerByUsers(
    userIds: number[],
  ): Promise<Array<{ userId: number; total: number }>> {
    return await this.createQueryBuilder('n')
      .select('user_id', 'userId')
      .addSelect('COUNT(*)', 'total')
      .where('user_id IN (:...userIds)', { userIds })
      .andWhere({ read: false })
      .groupBy('user_id')
      .getRawMany();
  }
}
