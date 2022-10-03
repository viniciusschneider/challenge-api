import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class PaginateDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(100)
  @Min(1)
  @Type(() => Number)
  limit: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;
}
