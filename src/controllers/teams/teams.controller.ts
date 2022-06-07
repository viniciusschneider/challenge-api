import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateTeamDto } from './dtos/create-team.dto';
import { IdResponse } from '@responses/id.response';
import { ITokenPayload } from '@interfaces';
import { ListTeamsResponse } from './responses/list-teams.response';
import { PaginationResponse } from '@responses/pagination.response';
import { QueryParamsTeamsDto   } from './dtos/query-params-teams.dto';
import { TeamsService } from './teams.service';
import { TypeSportResponse } from './responses/type-sport.response';
import { User } from '@decorators/user.decorator';

@Controller('teams')
export class TeamsController {

  constructor(
    private teamsService: TeamsService
  ) {}

  @Get()
  async getTeams(
    @Query() query: QueryParamsTeamsDto,
    @User() { id }: ITokenPayload
  ): Promise<PaginationResponse<ListTeamsResponse>> {
    return await this.teamsService.list(id, query);
  }

  @Post()
  async create(
    @Body() body: CreateTeamDto,
    @User() { id }: ITokenPayload
  ): Promise<IdResponse> {
    return await this.teamsService.create(id, body);
  }

  @Get('types-sport')
  async getTipesSport(): Promise<TypeSportResponse[]> {
    return await this.teamsService.getTypesSport();
  }
}
