import { Column, Entity } from 'typeorm';
import { EntityPattern } from './patterns/entity.pattern';

@Entity({
  name: 'type_images',
})
export class TypeImageEntity extends EntityPattern {
  @Column()
  name: string;
}
