import { Query, Resolver } from '@nestjs/graphql';
import { createParamDecorator, UseGuards, SetMetadata, Req } from '@nestjs/common';

import { UsersService } from './users.service';
import { GraphqlPassportAuthGuard } from '../shared/guards';
import { UserDto } from './dto/user.dto';
import { Roles } from '../shared/decorators/roles.decorator';

export interface User {
  id: string;
  displayName: string;
  email: string;
  roles: string[];
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
  @Roles('admin')
  @UseGuards(new GraphqlPassportAuthGuard('ADMIN'))
  async users(@Req() req) {
    return this.usersService.findAll();
  }

  @Query(() => UserDto)
  @UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
