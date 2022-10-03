import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '@repositories/address.repository';

@Module({
  providers: [AddressService],
  controllers: [AddressController],
  imports: [HttpModule, TypeOrmModule.forFeature([AddressRepository])],
})
export class AddressModule {}
