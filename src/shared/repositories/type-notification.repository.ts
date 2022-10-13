import { EntityRepository, Repository } from 'typeorm';
import { TypeNotificationEntity } from '@entities/type-notification.entity';

@EntityRepository(TypeNotificationEntity)
export class TypeNotificationRepository extends Repository<TypeNotificationEntity> {}
