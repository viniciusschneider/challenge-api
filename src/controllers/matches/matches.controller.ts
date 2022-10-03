import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { IdResponse } from '@responses/id.response';
import { ITokenPayload } from '@interfaces/token-payload.interface';
import { MatchCreateDto } from './dtos/match-create.dto';
import { MatchesService } from './matches.service';
import { TeamMatchesResponse } from './responses/team-matches.response';
import { User } from '@decorators/user.decorator';
import { PaginateDto } from '@dtos/paginate.dto';
import { PaginationResponse } from '@responses/pagination.response';
import { SearchDto } from './dtos/search.dto';
import { ConfirmMatchDto } from './dtos/confirm-match.dto';

@Controller('matches')
export class MatchesController {
  constructor(private matchsService: MatchesService) {}

  @Post()
  async create(
    @Body() body: MatchCreateDto,
    @User() { id }: ITokenPayload,
  ): Promise<IdResponse> {
    return await this.matchsService.create(id, body);
  }

  @Get('team-matches/:teamId')
  async teamMatchs(
    @Param('teamId', ParseIntPipe) teamId: number,
    @Query() params: PaginateDto,
    @User() { id }: ITokenPayload,
  ): Promise<PaginationResponse<TeamMatchesResponse>> {
    return await this.matchsService.teamMatchs(id, teamId, params);
  }

  @Get('search')
  async search(
    @User() { id }: ITokenPayload,
    @Query() query: SearchDto,
  ): Promise<PaginationResponse<TeamMatchesResponse>> {
    return await this.matchsService.search(id, query);
  }

  @Post('confirm-match')
  async confirmMatch(
    @User() { id }: ITokenPayload,
    @Body() body: ConfirmMatchDto,
  ): Promise<IdResponse> {
    return await this.matchsService.confirmMatch(id, body);
  }
}
