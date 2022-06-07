import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityPattern } from "./patterns/entity.pattern";
import { TypeSportEntity } from "./type-sport.entity";
import { UserEntity } from "./user.entity";

@Entity({
  name: 'teams'
})
export class TeamEntity extends EntityPattern {
  @Column()
  name: string;

  @ManyToOne(
    () => TypeSportEntity,
    { onDelete: 'CASCADE', nullable: false },
  )
  @JoinColumn({
    name: 'type_sport_id',
    referencedColumnName: 'id'
  })
  typeSport: TypeSportEntity;

  @Column({
    name: 'type_sport_id',
  })
  typeSportId: number;

  @ManyToOne(
    () => UserEntity, user => user.id,
    { onDelete: 'CASCADE', nullable: false },
  )
  @JoinColumn({
    name: 'user_id'
  })
  user: UserEntity;

  @Column({
    name: 'user_id',
  })
  userId: number;
}
