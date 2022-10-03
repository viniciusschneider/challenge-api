import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class FindCEPDto {
  @IsNotEmpty()
  @MaxLength(8)
  @MinLength(8)
  cep: string;
}
