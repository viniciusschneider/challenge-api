import { User } from '@decorators/user.decorator';
import { ITokenPayload } from '@interfaces/token-payload.interface';
import { Controller, Get, Param } from '@nestjs/common';
import { AddressService } from './address.service';
import { FindCEPDto } from './dtos/find-cep.dto';
import { FindCEPResponse } from './responses/find-cep-.response';
import { UserAddressResponse } from './responses/user-address.response';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Get('find-cep/:cep')
  async findCEP(@Param() { cep }: FindCEPDto): Promise<FindCEPResponse> {
    return await this.addressService.findCEP(cep);
  }

  @Get()
  async userAddress(
    @User() { id }: ITokenPayload,
  ): Promise<UserAddressResponse[]> {
    return await this.addressService.userAddress(id);
  }
}
