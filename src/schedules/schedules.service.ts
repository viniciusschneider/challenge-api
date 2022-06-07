import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ImageRepository } from '@repositories/image.repository';
import * as fs from 'fs';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger(SchedulesService.name);

  constructor(
    private imageRepository: ImageRepository,
  ) {}
  
  // @Cron(CronExpression.EVERY_5_SECONDS)
  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async clearProfilesImages() {
    const files = await this.imageRepository.createQueryBuilder('i')
      .select('id')
      .addSelect('path')
      .where('type_image_id = 1')
      .andWhere('ABS(DATEDIFF(NOW(), created_at)) > 1')
      .andWhere('entity_id IS NULL')
      .getRawMany();

    if (files.length === 0) return;

    const ids = files.map(f => {
      fs.unlink(f.path, (err) => {
        if (err) console.error('No such file or directory', err);
      });
      return f.id;
    });

    await this.imageRepository.createQueryBuilder('i')
      .where('id IN (:...ids)', { ids })
      .delete()
      .execute();
  }
}
