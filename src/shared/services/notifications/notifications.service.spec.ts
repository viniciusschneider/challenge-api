import { Test, TestingModule } from '@nestjs/testing';
import { NotificationRepository } from '@repositories/notification.repository';
import { TeamRepository } from '@repositories/team.repository';
import { NotificationsGateway } from 'src/gateways/notifications.gateway';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () => {
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: NotificationRepository,
          useValue: {},
        },
        {
          provide: NotificationsGateway,
          useValue: {},
        },
        {
          provide: TeamRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
