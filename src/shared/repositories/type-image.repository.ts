import { EntityRepository, Repository } from 'typeorm';
import { TypeImageEntity } from '@entities/type-image.entity';

@EntityRepository(TypeImageEntity)
export class TypeImageRepository extends Repository<TypeImageEntity> {}
