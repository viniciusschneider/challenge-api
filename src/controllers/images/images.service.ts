import { BadRequestException, Injectable } from '@nestjs/common';
import { EnumTypeEntities, EnumTypeImagesId } from '@enums';
import { HttpMessages } from '@common/http-messages';
import { ImageRepository } from '@repositories/image.repository';
import { ImageResponse } from './responses/image.response';
import { getAppUrl } from '@common/functions';

@Injectable()
export class ImagesService {
  constructor(private imageRepository: ImageRepository) {}

  async createImage(
    file: Express.Multer.File,
    config: {
      entityType: EnumTypeEntities;
      typeImageId: EnumTypeImagesId;
    },
  ): Promise<ImageResponse> {
    if (!file) throw new BadRequestException(HttpMessages.INVALID_IMAGE);

    const path = `${file.destination}/${file.filename}`;

    const { id } = await this.imageRepository.save({
      entityType: config.entityType,
      path,
      typeImageId: config.typeImageId,
    });

    return { id, url: `${getAppUrl()}${path}` };
  }
}
