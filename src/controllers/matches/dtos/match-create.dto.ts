import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { AddressDto } from '@dtos/address.dto';
import { Type } from 'class-transformer';

export class MatchCreateDto {
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ValidateIf((match) => !match.addressId)
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ValidateIf((match) => !match.address)
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  addressId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  teamId: number;
}
