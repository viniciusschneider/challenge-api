import { EntityRepository, Repository } from "typeorm";
import { TypeSportEntity } from "@entities/type-sport.entity";

@EntityRepository(TypeSportEntity)
export class TypeSportRepository extends Repository<TypeSportEntity> {

  async findById(id: number) {
    return this.findOne({ id });
  }
}
