import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EnumImageFolders, EnumTypeEntities, EnumTypeImagesId } from '@enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageResponse } from './responses/image.response';
import { ImagesService } from './images.service';
import { uploadedImageConfig } from '@common/multer-options';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post('users')
  @UseInterceptors(
    FileInterceptor(
      'image',
      uploadedImageConfig(EnumImageFolders.USERS_PROFILES),
    ),
  )
  async createProfileUserImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageResponse> {
    return await this.imagesService.createImage(file, {
      entityType: EnumTypeEntities.USER,
      typeImageId: EnumTypeImagesId.USER_PROFILE,
    });
  }

  @Post('teams')
  @UseInterceptors(
    FileInterceptor('image', uploadedImageConfig(EnumImageFolders.TEAMS_LOGOS)),
  )
  async createLogoTeamImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageResponse> {
    return await this.imagesService.createImage(file, {
      entityType: EnumTypeEntities.TEAM,
      typeImageId: EnumTypeImagesId.TEAM_LOGO,
    });
  }
}
