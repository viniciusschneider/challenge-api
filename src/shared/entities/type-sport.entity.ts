import { Check, Column, Entity } from "typeorm";
import { EntityPattern } from "./patterns/entity.pattern";

@Check(`"maxHoldingPlayers" >= "minHoldingPlayers"`)
@Entity({
  name: 'types_sport'
})
export class TypeSportEntity extends EntityPattern {
  @Column()
  name: string;

  @Column({
    unsigned: true,
  })
  maxHoldingPlayers: number;

  @Column({
    unsigned: true,
  })
  minHoldingPlayers: number;
}
