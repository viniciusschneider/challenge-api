import { Column, Entity, OneToMany } from "typeorm";
import { EntityPattern } from "./patterns/entity.pattern";
import { EnumRoles } from "@enums";
import { Exclude } from "class-transformer";
import { TeamEntity } from "./team.entity";
import { ImageEntity } from "./image.entity";

@Entity({
  name: 'users'
})
export class UserEntity extends EntityPattern {
  @Column({
    unique: true
  })
  email: string;

  @Column()
  name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: EnumRoles
  })
  role: string;

  @OneToMany(() => TeamEntity, team => team.user)
  teams: TeamEntity[];

  @OneToMany(() => ImageEntity, image => image.owner)
  images: ImageEntity[];
}
