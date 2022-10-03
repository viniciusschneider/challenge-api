import { Column, Entity } from 'typeorm';
import { EntityPattern } from './patterns/entity.pattern';

@Entity({
  name: 'type_notifications',
})
export class TypeNotificationEntity extends EntityPattern {
  @Column()
  name: string;
}
