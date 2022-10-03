import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AddressRepository } from '@repositories/address.repository';
import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: AddressRepository,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
