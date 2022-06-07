import { IsTypeSportExistsConstraint } from './is-type-sport-exists.validator';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSportRepository } from '@repositories/type-sport.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeSportRepository]),
  ],
  providers: [IsTypeSportExistsConstraint],
  exports: [IsTypeSportExistsConstraint],
})
export class IsTypeSportExistsValidatorModule {}
