import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityPattern } from './patterns/entity.pattern';
import { TeamEntity } from './team.entity';
import { TypeNotificationEntity } from './type-notification.entity';
import { UserEntity } from './user.entity';

@Entity({
  name: 'notifications',
})
export class NotificationEntity extends EntityPattern {
  @Column({
    name: 'read',
    default: false,
  })
  read: boolean;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @ManyToOne(() => TypeNotificationEntity, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'type_notification_id',
    referencedColumnName: 'id',
  })
  typeNotification: TypeNotificationEntity;

  @Column({
    name: 'type_notification_id',
  })
  typeNotificationId: number;

  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({
    name: 'team_id',
    referencedColumnName: 'id',
  })
  team: TeamEntity;

  @Column({
    name: 'team_id',
  })
  teamId: number;

  @Column({
    name: 'payload',
    type: 'json',
  })
  payload: any;
}
