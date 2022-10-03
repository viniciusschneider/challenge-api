import { ImageRepository } from '@repositories/image.repository';
import { IsImageIdExistsValidatorModule } from '@validators/is-image-id-exists/is-image-id-exists.validator.module';
import { IsTypeSportExistsValidatorModule } from '@validators/is-type-sport-exists/is-type-sport-exists.validator.module';
import { Module } from '@nestjs/common';
import { TeamRepository } from '@repositories/team.repository';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSportRepository } from '@repositories/type-sport.repository';

@Module({
  controllers: [TeamsController],
  imports: [
    TypeOrmModule.forFeature([
      TeamRepository,
      TypeSportRepository,
      ImageRepository,
    ]),
    IsTypeSportExistsValidatorModule,
    IsImageIdExistsValidatorModule,
  ],
  providers: [TeamsService],
})
export class TeamsModule {}
