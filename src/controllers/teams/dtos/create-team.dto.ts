import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { IsTypeSportExists } from "@validators/is-type-sport-exists/is-type-sport-exists.validator";
import { Type } from "class-transformer";
import { IsImageIdExists } from "@validators/is-image-id-exists/is-image-id-exists.validator";
import { EnumTypesEntity } from "@enums/types-entity.enum";
import { EnumTypesImageId } from "@enums/types-image-id.enum";

export class CreateTeamDto {
  @IsImageIdExists({ entityType: EnumTypesEntity.TEAM, typeImageId: EnumTypesImageId.TEAM_LOGO })
  @IsNotEmpty()
  imageId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsTypeSportExists()
  typeSportId: number;
}
