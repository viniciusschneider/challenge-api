import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { EntityPattern } from "./patterns/entity.pattern";
import { EnumTypesEntity } from "@enums";
import { TypeImageEntity } from "./type-image.entity";
import { UserEntity } from "./user.entity";

@Entity({
  name: 'images'
})
export class ImageEntity extends EntityPattern {
  owner: UserEntity;

  @Column()
  path: string;

  @Column({
    name: 'entity_id',
    nullable: true,
    type: 'integer',
  })
  entityId: string | number;

  @Column({
    name: 'entity_type',
    type: 'enum',
    enum: EnumTypesEntity
  })
  entityType: EnumTypesEntity;

  @ManyToOne(
    () => TypeImageEntity, typeImage => typeImage.id,
    { onDelete: 'CASCADE', nullable: false },
  )
  @JoinColumn({
    name: 'type_image_id',
    referencedColumnName: 'id'
  })
  typeImage: TypeImageEntity;

  @Column({
    name: 'type_image_id'
  })
  typeImageId: number;
}
