import { PaginateDto } from '@dtos/paginate.dto';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class SearchDto extends PaginateDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  teamId: number;
}
