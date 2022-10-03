import { Check, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { EntityPattern } from './patterns/entity.pattern';
import { TypeLeagueEntity } from './type-league.entity';
import { TypeSportEntity } from './type-sport.entity';
import { UserEntity } from './user.entity';

@Check(`"endDate" >= "startDate"`)
@Entity({
  name: 'leagues',
})
export class LeagueEntity extends EntityPattern {
  @Column()
  name: string;

  @Column({
    name: 'start_date',
    type: 'date',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'date',
  })
  endDate: Date;

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

  @ManyToOne(() => TypeSportEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({
    name: 'type_sport_id',
    referencedColumnName: 'id',
  })
  typeSport: TypeSportEntity;

  @Column({
    name: 'type_sport_id',
  })
  typeSportId: number;

  @ManyToOne(() => TypeLeagueEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({
    name: 'type_league_id',
    referencedColumnName: 'id',
  })
  typeLeague: TypeLeagueEntity;

  @Column({
    name: 'type_league_id',
  })
  typeLeagueId: number;
}
