import { IsNotEmpty, IsString } from 'class-validator';
import { IsTypeSportExists } from '@validators/is-type-sport-exists/is-type-sport-exists.validator';
import { IsImageIdExists } from '@validators/is-image-id-exists/is-image-id-exists.validator';
import { EnumTypeEntities } from '@enums/type-entities.enum';
import { EnumTypeImagesId } from '@enums/type-images-id.enum';

export class CreateTeamDto {
  @IsImageIdExists({
    entityType: EnumTypeEntities.TEAM,
    typeImageId: EnumTypeImagesId.TEAM_LOGO,
  })
  @IsNotEmpty()
  imageId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsTypeSportExists()
  typeSportId: number;
}
