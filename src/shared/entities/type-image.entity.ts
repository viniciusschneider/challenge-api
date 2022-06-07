import { Column, Entity } from "typeorm";
import { EntityPattern } from "./patterns/entity.pattern";

@Entity({
  name: 'types_image'
})
export class TypeImageEntity extends EntityPattern {
  @Column()
  name: string;
}
