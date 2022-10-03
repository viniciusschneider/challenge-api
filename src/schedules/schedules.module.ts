import { ImageRepository } from '@repositories/image.repository';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulesService } from './schedules.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ImageRepository]),
  ],
  providers: [SchedulesService],
})
export class SchedulesModule {}
