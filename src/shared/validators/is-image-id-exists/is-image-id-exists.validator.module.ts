import { ImageRepository } from '@repositories/image.repository';
import { IsImageIdExistsConstraint } from './is-image-id-exists.validator';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageRepository]),
  ],
  providers: [IsImageIdExistsConstraint],
  exports: [IsImageIdExistsConstraint],
})
export class IsImageIdExistsValidatorModule {}
