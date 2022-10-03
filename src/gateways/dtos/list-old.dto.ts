import { PaginateDto } from '@dtos/paginate.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ListOldDto extends PaginateDto {
  @IsNumber()
  @IsNotEmpty()
  timestamp: number;
}
