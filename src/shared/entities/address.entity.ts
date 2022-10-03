import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { EntityPattern } from './patterns/entity.pattern';
import { UserEntity } from './user.entity';

@Entity({
  name: 'address',
})
export class AddressEntity extends EntityPattern {
  @Column({ length: 50 })
  name: string;

  @Column({ length: 8 })
  cep: string;

  @Column({ length: 50 })
  state: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  neighborhood: string;

  @Column({ length: 50 })
  street: string;

  @Column()
  number: number;

  @Column({ length: 100, nullable: true })
  complement?: string;

  @Column()
  save: boolean;

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

  @DeleteDateColumn()
  deleted_at?: Date;
}
