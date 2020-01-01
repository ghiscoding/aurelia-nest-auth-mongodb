import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { GraphqlPassportAuthGuard } from '../shared/guards';
import { User } from './graphTypes/user.graphtype';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Query(() => [User])
  @Roles('admin')
  @UseGuards(new GraphqlPassportAuthGuard('ADMIN'))
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  @UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
