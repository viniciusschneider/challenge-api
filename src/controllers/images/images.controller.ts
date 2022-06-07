import { Controller, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EnumImageFolders, EnumTypesEntity, EnumTypesImageId } from '@enums';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageResponse } from './responses/image.response';
import { ImagesService } from './images.service';
import { uploadedImageConfig } from '@common/multer-options';

@Controller('images')
export class ImagesController {

  constructor(
    private imagesService: ImagesService
  ) {}

  @Post('users')
  @UseInterceptors(FileInterceptor('image', uploadedImageConfig(EnumImageFolders.USERS_PROFILES)))
  async createProfileUserImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageResponse> {
    return await this.imagesService.createImage(file, {
      entityType: EnumTypesEntity.USER,
      typeImageId: EnumTypesImageId.USER_PROFILE,
    });
  }

  @Post('teams')
  @UseInterceptors(FileInterceptor('image', uploadedImageConfig(EnumImageFolders.TEAMS_LOGOS)))
  async createLogoTeamImage(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageResponse> {
    return await this.imagesService.createImage(file, {
      entityType: EnumTypesEntity.TEAM,
      typeImageId: EnumTypesImageId.TEAM_LOGO,
    });
  }
}
