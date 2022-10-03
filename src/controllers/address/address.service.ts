import { AddressRepository } from '@repositories/address.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { FindCEPResponse } from './responses/find-cep-.response';
import { firstValueFrom } from 'rxjs';
import { HttpMessages } from '@common/http-messages';
import { HttpService } from '@nestjs/axios';
import { IFindCEP } from './interfaces/find-cep.interface';
import { UserAddressResponse } from './responses/user-address.response';

@Injectable()
export class AddressService {
  constructor(
    private addressRepository: AddressRepository,
    private readonly httpService: HttpService,
  ) {}

  async userAddress(userId: number): Promise<UserAddressResponse[]> {
    const address = await this.addressRepository.find({
      where: { userId, save: true },
      select: [
        'id',
        'name',
        'cep',
        'state',
        'city',
        'neighborhood',
        'street',
        'number',
        'complement',
      ],
    });

    return address as UserAddressResponse[];
  }

  async findCEP(CEP: string): Promise<FindCEPResponse> {
    try {
      const {
        data: {
          bairro: neighborhood,
          complemento: complement,
          localidade: city,
          logradouro: street,
          uf: state,
        },
      } = await firstValueFrom(
        this.httpService.get<IFindCEP>(`https://viacep.com.br/ws/${CEP}/json/`),
      );

      return {
        city,
        complement,
        neighborhood,
        state,
        street,
      };
    } catch (e) {
      throw new BadRequestException(HttpMessages.INVALID_CEP);
    }
  }
}
