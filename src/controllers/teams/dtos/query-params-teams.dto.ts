import { PaginateDto } from '@dtos/paginate.dto';
import { IsOptional, IsString } from 'class-validator';

export class QueryParamsTeamsDto extends PaginateDto {
  @IsOptional()
  @IsString()
  search?: string;
}
