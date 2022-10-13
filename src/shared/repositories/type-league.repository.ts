import { EntityRepository, Repository } from 'typeorm';
import { TypeLeagueEntity } from '@entities/type-league.entity';

@EntityRepository(TypeLeagueEntity)
export class TypeLeagueRepository extends Repository<TypeLeagueEntity> {}
