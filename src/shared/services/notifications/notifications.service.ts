import { getAppUrl } from '@common/functions';
import { EnumTypeEntities } from '@enums/type-entities.enum';
import { EnumTypeImagesId } from '@enums/type-images-id.enum';
import { EnumTypeNotificationsId } from '@enums/type-notifications-id.enum';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '@repositories/notification.repository';
import { TeamRepository } from '@repositories/team.repository';
import { NotificationsGateway } from 'src/gateways/notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    private notificationsRepository: NotificationRepository,
    private notificationsGateway: NotificationsGateway,
    private teamRepository: TeamRepository,
  ) {}

  async sendConfirmMatchNotification(
    userId: number,
    localTeamId: number,
    visitingTeamId: number,
  ) {
    const { localTeam, visitingTeam } = await this.getTeamsPayload(
      localTeamId,
      visitingTeamId,
    );
    const createdAt = new Date();
    const userIdsLocalTeam: number[] = [localTeam.userId];
    const userIdsVisitingTeam: number[] = [visitingTeam.userId];

    const { identifiers } = await this.notificationsRepository.insert([
      // send notification to local team
      ...userIdsLocalTeam.map((id) => ({
        typeNotificationId: EnumTypeNotificationsId.CONFIRM_MATCH,
        userId: id,
        teamId: visitingTeamId,
        payload: {
          fromUserId: userId,
          fromTeamId: localTeamId,
        } as any,
        created_at: createdAt,
      })),
      // send notification to visiting team
      ...userIdsVisitingTeam.map((id) => ({
        typeNotificationId: EnumTypeNotificationsId.CONFIRM_MATCH,
        userId: id,
        teamId: localTeamId,
        payload: {
          fromUserId: userId,
          fromTeamId: visitingTeamId,
        } as any,
        created_at: createdAt,
      })),
    ]);

    const localTeamNotificationIds = identifiers.slice(
      0,
      userIdsLocalTeam.length,
    );
    const visitingTeamNotificationIds = identifiers.slice(
      userIdsLocalTeam.length,
    );

    this.confirmMatchNotification(
      userIdsLocalTeam,
      userIdsLocalTeam.map((_, index) => ({
        createdAt,
        teamName: visitingTeam.name,
        image: visitingTeam.image,
        id: localTeamNotificationIds[index].id,
      })),
    );

    this.confirmMatchNotification(
      userIdsVisitingTeam,
      userIdsVisitingTeam.map((_, index) => ({
        createdAt,
        teamName: localTeam.name,
        image: localTeam.image,
        id: visitingTeamNotificationIds[index].id,
      })),
    );
  }

  private async confirmMatchNotification(
    userIds: number[],
    payload: Array<{
      createdAt: Date;
      id: number;
      image: string;
      teamName: string;
    }>,
  ) {
    try {
      let index = 0;
      const totalizers =
        await this.notificationsRepository.unreadTotalizerByUsers(userIds);
      for (const userId of userIds) {
        const unreads = totalizers.find((u) => u.userId === userId);
        if (unreads)
          this.notificationsGateway.server
            .to(`${userId}`)
            .emit('unread-totalizer', unreads.total);

        this.notificationsGateway.server.to(`${userId}`).emit('new', {
          ...payload[index++],
        });
      }
    } catch (e) {
      console.error('erro', e);
    }
  }

  private async getTeamsPayload(
    localTeamId: number,
    visitingTeamId: number,
  ): Promise<{
    localTeam: { id: number; image: string; name: string; userId: number };
    visitingTeam: { id: number; image: string; name: string; userId: number };
  }> {
    const data = await this.teamRepository
      .createQueryBuilder('t')
      .select('t.name', 'name')
      .addSelect('t.id', 'id')
      .addSelect('t.user_id', 'userId')
      .addSelect(`CONCAT('${getAppUrl()}', i.path)`, 'image')
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
      .where('t.id IN(:...teamIds)', { teamIds: [localTeamId, visitingTeamId] })
      .getRawMany();

    return {
      localTeam: data.find((t) => t.id === localTeamId),
      visitingTeam: data.find((t) => t.id === visitingTeamId),
    };
  }
}
