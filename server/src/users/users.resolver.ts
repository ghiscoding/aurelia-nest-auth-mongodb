import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { GraphqlPassportAuthGuard } from '../shared/guards';
import { PaginatedResponse } from '../shared/graphql/types/paginatedResponse.type';
import { User } from './graphql/types/user.type';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators';
import { UserQueryArgs } from './graphql/inputs/pagination.input';

const PaginatedUserResponse = PaginatedResponse(User);
type PaginatedUserResponse = InstanceType<typeof PaginatedUserResponse>;

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Query(returns => PaginatedUserResponse)
  @Roles('admin')
  @UseGuards(new GraphqlPassportAuthGuard('ADMIN'))
  async users(@Args() queryArgs: UserQueryArgs): Promise<PaginatedUserResponse> {
    return await this.usersService.getUsers(queryArgs);
  }

  @Query(() => User)
  @UseGuards(GraphqlPassportAuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }
}
