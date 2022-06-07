import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNotIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class QueryParamsTeamsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  limit: number;
}
