import { Query, Resolver } from '@nestjs/graphql';
import { createParamDecorator, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { GraphqlPassportAuthGuard, RolesGuard } from '../shared/guards';
import { UserDto } from './dto/user.dto';

export interface User {
  id: string;
  displayName: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    return ctx.req.user;
  },
);

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Query(() => [UserDto])
  @UseGuards(GraphqlPassportAuthGuard, RolesGuard)
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => UserDto)
  @UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
