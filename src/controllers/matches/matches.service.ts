import { AddressRepository } from '@repositories/address.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EnumTypeEntities } from '@enums/type-entities.enum';
import { EnumTypeImagesId } from '@enums/type-images-id.enum';
import { getAppUrl } from '@common/functions';
import { HttpMessages } from '@common/http-messages';
import { IdResponse } from '@responses/id.response';
import { MatchCreateDto } from './dtos/match-create.dto';
import { MatchRepository } from '@repositories/match.repository';
import { PaginateDto } from '@dtos/paginate.dto';
import { paginateRaw } from 'nestjs-typeorm-paginate';
import { PaginationResponse } from '@responses/pagination.response';
import { TeamMatchesResponse } from './responses/team-matches.response';
import { TeamRepository } from '@repositories/team.repository';
import { SearchDto } from './dtos/search.dto';
import { ConfirmMatchDto } from './dtos/confirm-match.dto';
import { Brackets } from 'typeorm';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';

@Injectable()
export class MatchesService {
  constructor(
    private addressRepository: AddressRepository,
    private matchRepository: MatchRepository,
    private notificatinsService: NotificationsService,
    private teamRepository: TeamRepository,
  ) {}

  async create(
    userId: number,
    { address, addressId, date, teamId }: MatchCreateDto,
  ): Promise<IdResponse> {
    if (addressId && !(await this.addressRepository.isValid(userId, addressId)))
      throw new BadRequestException(HttpMessages.INVALID_ADDRESS_ID);

    if (!(await this.teamRepository.isValid(userId, teamId)))
      throw new BadRequestException(HttpMessages.INVALID_TEAM_ID);

    const matchAddressId: number = addressId
      ? addressId
      : (await this.addressRepository.save({ ...address, userId })).id;

    const { id } = await this.matchRepository.save({
      addressId: matchAddressId,
      date,
      localTeamId: teamId,
    });

    return { id };
  }

  async teamMatchs(
    userId: number,
    teamId: number,
    params: PaginateDto,
  ): Promise<PaginationResponse<TeamMatchesResponse>> {
    if (!(await this.teamRepository.isValid(userId, teamId)))
      throw new BadRequestException(HttpMessages.INVALID_TEAM_ID);

    const query: any = (await this.matchsQuery())
      .where({ localTeamId: teamId })
      .orWhere({ visitingTeamId: teamId });

    return await paginateRaw<TeamMatchesResponse>(query, { ...params });
  }

  async search(
    userId: number,
    { address, endDate, limit, page, startDate, teamId }: SearchDto,
  ) {
    const team = await this.teamRepository.findOne({ id: teamId, userId });

    if (!team) throw new BadRequestException(HttpMessages.INVALID_TEAM_ID);

    const query = (await this.matchsQuery())
      .where('local_team.user_id != :userId', { userId })
      .andWhere('local_team.type_sport_id = :typeSportId', {
        typeSportId: team.typeSportId,
      })
      .andWhere('match.visiting_team_id IS NULL')
      .andWhere('match.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere(
        new Brackets((qb) =>
          qb
            .where('cep LIKE :address', { address: `%${address}%` })
            .orWhere('state LIKE :address', { address: `%${address}%` })
            .orWhere('city LIKE :address', { address: `%${address}%` })
            .orWhere('neighborhood LIKE :address', { address: `%${address}%` })
            .orWhere('street LIKE :address', { address: `%${address}%` })
            .orWhere('number LIKE :address', { address: `%${address}%` })
            .orWhere('complement LIKE :address', { address: `%${address}%` }),
        ),
      );

    return await paginateRaw<TeamMatchesResponse>(query as any, {
      limit,
      page,
    });
  }

  private async matchsQuery() {
    return this.matchRepository
      .createQueryBuilder('match')
      .select('match.id', 'id')
      .addSelect('local_team.name', 'localTeamName')
      .addSelect('visiting_team.name', 'visitingTeamName')
      .addSelect('match.date', 'date')
      .addSelect('address.cep', 'cep')
      .addSelect('address.state', 'state')
      .addSelect('address.city', 'city')
      .addSelect('address.neighborhood', 'neighborhood')
      .addSelect('address.street', 'street')
      .addSelect('address.number', 'number')
      .addSelect('address.complement', 'complement')
      .addSelect(`CONCAT('${getAppUrl()}', local_image.path)`, 'localTeamImage')
      .addSelect(
        `CONCAT('${getAppUrl()}', visiting_image.path)`,
        'visitingTeamImage',
      )
      .innerJoin('address', 'address', 'address.id = match.address_id')
      .innerJoin('teams', 'local_team', 'local_team.id = match.local_team_id')
      .innerJoin(
        'images',
        'local_image',
        `
        local_image.entity_id = local_team.id
        and local_image.type_image_id = :typeImageId
        and local_image.entity_type = :entityType
      `,
        {
          entityType: EnumTypeEntities.TEAM,
          typeImageId: EnumTypeImagesId.TEAM_LOGO,
        },
      )
      .leftJoin(
        'teams',
        'visiting_team',
        'visiting_team.id = match.visitingTeamId',
      )
      .leftJoin(
        'images',
        'visiting_image',
        `
        visiting_image.entity_id = visiting_team.id
        and visiting_image.type_image_id = :typeImageId
        and visiting_image.entity_type = :entityType
      `,
        {
          entityType: EnumTypeEntities.TEAM,
          typeImageId: EnumTypeImagesId.TEAM_LOGO,
        },
      )
      .orderBy('match.date', 'DESC');
  }

  async confirmMatch(
    userId: number,
    { matchId, teamId }: ConfirmMatchDto,
  ): Promise<IdResponse> {
    if (!(await this.teamRepository.isValid(userId, teamId)))
      throw new BadRequestException(HttpMessages.INVALID_TEAM_ID);

    const match = await this.matchRepository.findOne({ id: matchId });

    if (
      !match ||
      (await this.matchRepository.matchBelongsToUser(userId, matchId))
    )
      throw new BadRequestException(HttpMessages.INVALID_MATCH_ID);

    if (match.visitingTeamId)
      throw new BadRequestException(HttpMessages.MATCH_UNAVAILABLE);

    await this.matchRepository.update(
      { id: matchId },
      { visitingTeamId: teamId },
    );

    await this.notificatinsService.sendConfirmMatchNotification(
      userId,
      match.localTeamId,
      teamId,
    );

    return { id: matchId };
  }
}
