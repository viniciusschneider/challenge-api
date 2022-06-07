import { ROLES_KEY } from '@decorators';
import { EnumRoles } from '@enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<EnumRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles)
      return true;

    const { user } = context.switchToHttp().getRequest();
    
    return requiredRoles.includes(user.role);
  }
}
