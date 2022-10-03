import { Column, Entity } from 'typeorm';
import { EntityPattern } from './patterns/entity.pattern';

@Entity({
  name: 'type_leagues',
})
export class TypeLeagueEntity extends EntityPattern {
  @Column()
  name: string;
}
