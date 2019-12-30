import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GraphqlPassportAuthGuard extends AuthGuard('jwt') {
  _roles: string[] = ['USER'];

  constructor(roles?: string | string[]) {
    super();
    if (roles) {
      this._roles = Array.isArray(roles) ? roles : [roles];
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    // check if user has access by validating that he has the required role
    if (Array.isArray(this._roles)) {
      for (const requiredRole of this._roles) {
        if (this.hasAccess(req.user.roles, requiredRole)) {
          return true;
        }
      }
    }
    return false;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }

  private hasAccess(roles, requiredRole): boolean {
    if (Array.isArray(roles)) {
      const adminFoundIndex = roles.findIndex((role: string) => role.toUpperCase() === requiredRole);
      if (adminFoundIndex >= 0) {
        return true;
      }
    }
  }
}
