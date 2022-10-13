import { Test, TestingModule } from '@nestjs/testing';
import { TypeImageRepository } from '@repositories/type-image.repository';
import { TypeNotificationRepository } from '@repositories/type-notification.repository';
import { TypeSportRepository } from '@repositories/type-sport.repository';
import { UserRepository } from '@repositories/user.repository';
import { SeederService } from './seeder.service';

describe('SeederService', () => {
  let service: SeederService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeederService,
        {
          provide: TypeSportRepository,
          useValue: {},
        },
        {
          provide: TypeNotificationRepository,
          useValue: {},
        },
        {
          provide: TypeImageRepository,
          useValue: {},
        },
        {
          provide: UserRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SeederService>(SeederService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
