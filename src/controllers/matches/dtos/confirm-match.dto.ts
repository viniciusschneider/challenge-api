import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ConfirmMatchDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  matchId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  teamId: number;
}
