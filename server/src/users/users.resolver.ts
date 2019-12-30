import { Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { GraphqlPassportAuthGuard } from '../shared/guards';
import { UserDto } from './dto/user.dto';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators';

export interface User {
  id: string;
  displayName: string;
  email: string;
  roles: string[];
}

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Query(() => [UserDto])
  @Roles('admin')
  @UseGuards(new GraphqlPassportAuthGuard('ADMIN'))
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => UserDto)
  @UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
