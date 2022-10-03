import { Test, TestingModule } from '@nestjs/testing';
import { ImageRepository } from '@repositories/image.repository';
import { TeamRepository } from '@repositories/team.repository';
import { TypeSportRepository } from '@repositories/type-sport.repository';
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: TeamRepository,
          useValue: {},
        },
        {
          provide: TypeSportRepository,
          useValue: {},
        },
        {
          provide: ImageRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
