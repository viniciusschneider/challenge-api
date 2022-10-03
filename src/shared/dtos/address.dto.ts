import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class AddressDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(8)
  cep: string;

  @IsNotEmpty()
  @MaxLength(50)
  city: string;

  @IsOptional()
  @MaxLength(100)
  complement?: string;

  @IsNotEmpty()
  @MaxLength(50)
  neighborhood: string;

  @IsNotEmpty()
  number: number;

  @IsNotEmpty()
  @MaxLength(50)
  state: string;

  @IsNotEmpty()
  @MaxLength(50)
  street: string;

  @IsNotEmpty()
  @IsBoolean()
  save: boolean;

  @ValidateIf((match) => match.save)
  @IsNotEmpty()
  @MaxLength(50)
  name: string;
}
