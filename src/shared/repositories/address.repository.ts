import { EntityRepository, Repository } from 'typeorm';
import { AddressEntity } from '@entities/address.entity';

@EntityRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {
  async isValid(userId: number, id: number): Promise<boolean> {
    return (await this.count({ id, userId, deleted_at: null, save: true })) > 0;
  }
}
