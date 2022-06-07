import { SetMetadata } from '@nestjs/common';
import { EnumRoles } from '../enums/roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: EnumRoles[]) => SetMetadata(ROLES_KEY, roles);
