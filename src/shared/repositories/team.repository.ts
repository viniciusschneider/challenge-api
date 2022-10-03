import { EntityRepository, Repository } from 'typeorm';
import { TeamEntity } from '@entities/team.entity';

@EntityRepository(TeamEntity)
export class TeamRepository extends Repository<TeamEntity> {
  async isValid(userId: number, id: number): Promise<boolean> {
    return (await this.count({ id, userId })) > 0;
  }
}
