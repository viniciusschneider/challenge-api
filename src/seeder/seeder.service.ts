import { EnumRoles } from '@enums/roles.enum';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { TypeImageRepository } from '@repositories/type-image.repository';
import { TypeNotificationRepository } from '@repositories/type-notification.repository';
import { TypeSportRepository } from '@repositories/type-sport.repository';
import { UserRepository } from '@repositories/user.repository';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    private typeSportRepositry: TypeSportRepository,
    private typeNotificationRepository: TypeNotificationRepository,
    private typeImageRepository: TypeImageRepository,
    private userRepository: UserRepository,
  ) {}

  async onApplicationBootstrap() {
    const users = await this.userRepository.count();
    if (users === 0) {
      await this.userRepository.insert([
        {
          email: 'admin@admin.com',
          name: 'Admin',
          password:
            '$2b$10$iTlLQbyKZwobcjziXNqusOc4BhpYGEQfg7ZAhGnXsuufXdlOExPmu',
          role: EnumRoles.ADMIN,
        },
        {
          email: 'player@player.com',
          name: 'Player',
          password:
            '$2b$10$iTlLQbyKZwobcjziXNqusOc4BhpYGEQfg7ZAhGnXsuufXdlOExPmu',
          role: EnumRoles.PLAYER,
        },
      ]);
    }

    const typeSports = await this.typeSportRepositry.count();
    if (typeSports === 0) {
      await this.typeSportRepositry.insert([
        {
          name: 'Soccer',
          minHoldingPlayers: 11,
          maxHoldingPlayers: 15,
        },
        {
          name: 'Volleyball',
          minHoldingPlayers: 6,
          maxHoldingPlayers: 12,
        },
      ]);
    }

    const typeNotifications = await this.typeNotificationRepository.count();
    if (typeNotifications === 0) {
      await this.typeNotificationRepository.insert([
        {
          name: 'Confirm Match',
        },
      ]);
    }

    const typeImages = await this.typeImageRepository.count();
    if (typeImages === 0) {
      await this.typeImageRepository.insert([
        {
          name: 'Team Logo',
        },
        {
          name: 'User Profile',
        },
      ]);
    }
  }
}
