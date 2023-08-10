import { Roles } from 'src/enum/role.enum';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class RolesMiddleware implements NestMiddleware {
  constructor(private requiredRoles: string[]) {}

  use(req: any, res: any, next: () => void) {
    const userRole = req.user.role;

    const hasRequiredRoles = this.requiredRoles.every(role => userRole.includes(Roles));
    if (!hasRequiredRoles) {
      return res.status(401).json({ message: 'Unauthorized to make this action' });
    }

    next();
  }
}
