import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { EntityPattern } from './patterns/entity.pattern';
import { TeamEntity } from './team.entity';

@Entity({
  name: 'matchs',
})
export class MatchEntity extends EntityPattern {
  @Column({ type: 'datetime' })
  date: Date;

  @ManyToOne(() => AddressEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({
    name: 'address_id',
    referencedColumnName: 'id',
  })
  address: AddressEntity;

  @Column({
    name: 'address_id',
  })
  addressId: number;

  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({
    name: 'local_team_id',
    referencedColumnName: 'id',
  })
  localTeam: TeamEntity;

  @Column({
    name: 'local_team_id',
  })
  localTeamId: number;

  @ManyToOne(() => TeamEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn({
    name: 'visiting_team_id',
    referencedColumnName: 'id',
  })
  visitingTeam: TeamEntity;

  @Column({
    nullable: true,
    name: 'visiting_team_id',
  })
  visitingTeamId: number;

  @DeleteDateColumn()
  deleted_at?: Date;
}
