import { EntityRepository, Repository } from 'typeorm';
import { MatchEntity } from '@entities/match.entity';

@EntityRepository(MatchEntity)
export class MatchRepository extends Repository<MatchEntity> {
  async matchBelongsToUser(userId: number, matchId: number): Promise<boolean> {
    return !!(await this.createQueryBuilder('m')
      .innerJoin('teams', 't', 't.id = m.local_team_id')
      .innerJoin('users', 'u', 'u.id = t.user_id')
      .where('m.id = :matchId', { matchId })
      .andWhere('u.id = :userId', { userId })
      .getOne());
  }
}
