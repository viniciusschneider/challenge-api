import {
  registerDecorator,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { TypeSportRepository } from '@repositories';

@ValidatorConstraint({ async: true, name: 'IsTypeSportExists' })
@Injectable()
export class IsTypeSportExistsConstraint implements ValidatorConstraintInterface {
  constructor(private typeSportRepository: TypeSportRepository) {}

  async validate(id: number, args: ValidationArguments) {
    return +id > 0 && !!await this.typeSportRepository.findOne({ id });
  }
}

export function IsTypeSportExists() {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `${propertyName} not exists`
      },
      constraints: [],
      validator: IsTypeSportExistsConstraint,
    });
  };
}
