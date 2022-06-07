import { Column, Entity } from "typeorm";
import { EntityPattern } from "./patterns/entity.pattern";

@Entity({
  name: 'types_league'
})
export class TypeLeagueEntity extends EntityPattern {
  @Column()
  name: string;
}
