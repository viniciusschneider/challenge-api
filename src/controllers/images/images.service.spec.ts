import { Test, TestingModule } from '@nestjs/testing';
import { ImageRepository } from '@repositories/image.repository';
import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: ImageRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
