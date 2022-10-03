import { PaginateDto } from '@dtos/paginate.dto';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

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
}
