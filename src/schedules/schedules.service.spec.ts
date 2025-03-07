import { Test, TestingModule } from '@nestjs/testing';
import { ImageRepository } from '@repositories/image.repository';
import { SchedulesService } from './schedules.service';

describe('SchedulesService', () => {
  let service: SchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulesService,
        {
          provide: ImageRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SchedulesService>(SchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
