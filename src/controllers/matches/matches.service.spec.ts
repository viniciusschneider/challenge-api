import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '@repositories/address.repository';
import { MatchRepository } from '@repositories/match.repository';
import { TeamRepository } from '@repositories/team.repository';
import { NotificationsService } from 'src/shared/services/notifications/notifications.service';
import { MatchesService } from './matches.service';

describe('MatchesService', () => {
  let service: MatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        {
          provide: AddressRepository,
          useValue: {},
        },
        {
          provide: MatchRepository,
          useValue: {},
        },
        {
          provide: NotificationsService,
          useValue: {},
        },
        {
          provide: TeamRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
