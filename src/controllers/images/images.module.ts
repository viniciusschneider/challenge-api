import { ImageRepository } from '@repositories/image.repository';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ImagesController],
  imports: [
    TypeOrmModule.forFeature([ImageRepository])
  ],
  providers: [ImagesService]
})
export class ImagesModule {}
