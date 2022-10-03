import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ImageRepository } from '@repositories';
import { EnumTypeEntities } from '@enums/type-entities.enum';
import { EnumTypeImagesId } from '@enums/type-images-id.enum';

@ValidatorConstraint({ async: true, name: 'IsTypeSportExists' })
@Injectable()
export class IsImageIdExistsConstraint implements ValidatorConstraintInterface {
  constructor(private imageRepository: ImageRepository) {}

  async validate(id: number, args: ValidationArguments) {
    const [entityType, typeImageId] = args.constraints;

    return (
      +id > 0 &&
      !!(await this.imageRepository.findOne({
        id,
        entityType,
        typeImageId,
        entityId: null,
      }))
    );
  }
}

export function IsImageIdExists(params: {
  entityType: EnumTypeEntities;
  typeImageId: EnumTypeImagesId;
}) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} does not exist or is already in use`,
      },
      constraints: [params.entityType, params.typeImageId],
      validator: IsImageIdExistsConstraint,
    });
  };
}
