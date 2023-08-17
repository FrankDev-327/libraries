import { Reflector } from '@nestjs/core';
import { Roles } from 'src/enum/role.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if(user.role === Roles.AUTHOR && request.body.userId) {
      return false;
    }
    
    return this.matchRoles(roles, user.role);
  }
}
