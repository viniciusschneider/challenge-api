import { CreateTeamDto } from './dtos/create-team.dto';
import { IdResponse } from '@responses/id.response';
import { ImageRepository } from '@repositories/image.repository';
import { Injectable } from '@nestjs/common';
import { ListTeamsResponse } from './responses/list-teams.response';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { PaginationResponse } from 'src/shared/responses/pagination.response';
import { QueryParamsTeamsDto } from './dtos/query-params-teams.dto';
import { TeamRepository } from '@repositories/team.repository';
import { TypeSportRepository } from '@repositories/type-sport.repository';
import { TypeSportResponse } from './responses/type-sport.response';
import { getAppUrl } from '@common/functions';

@Injectable()
export class TeamsService {
  constructor(
    private teamRepository: TeamRepository,
    private typesSportRepository: TypeSportRepository,
    private imageRepository: ImageRepository,
  ) {}

  async list(
    userId: number,
    {
      limit,
      page,
      search,
    }: QueryParamsTeamsDto
  ): Promise<PaginationResponse<ListTeamsResponse>> {
    // await new Promise(p => {
    //   setTimeout(() => p(true), 5000)
    // })
    const query: any = this.teamRepository.createQueryBuilder('t')
      .innerJoin('images', 'i', 'i.entityId = t.id')
      .select('t.name', 'name')
      .addSelect(`CONCAT('${await getAppUrl()}', i.path)`, 'url')
      .where('t.userId = :userId', { userId });

    if (search)
      query.where('name LIKE :name', { name: `%${search}%` });

    query.orderBy('t.name');

    return await paginateRaw<ListTeamsResponse>(query, { page, limit });
  }

  async create(userId, { imageId, name, typeSportId }: CreateTeamDto): Promise<IdResponse> {
    const { id } = await this.teamRepository.save({
      name,
      typeSportId,
      userId,
    });

    await this.imageRepository.update({ id: imageId }, { entityId: id });

    return { id };
  }

  async getTypesSport(): Promise<TypeSportResponse[]> {
    return await this.typesSportRepository.createQueryBuilder('t')
      .select('id')
      .addSelect('name')
      .orderBy('t.name')
      .getRawMany();
  }
}
