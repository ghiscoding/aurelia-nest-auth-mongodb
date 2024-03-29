import { Args, Int, Query, Resolver, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { CatsService } from './services/cats.service';
import { Cat } from './graphql/types/cat.type';
import { CatInput } from './graphql/inputs/cat-input';
import { GraphqlPassportAuthGuard } from '../shared/guards/graphql-passport-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators';
import { User } from '../shared/models';
import { User as AuthUser } from '../auth/models';
import { OwnersService } from './services/owners.service';
import { CatQueryArgs } from './graphql/inputs/catQueryArgs.input';

@Resolver('Cat')
@Resolver(_of => Cat)
export class CatsResolver {
  constructor(
    private readonly catsService: CatsService,
    private readonly ownersService: OwnersService,
  ) { }

  @Query(_returns => String)
  async hello(): Promise<string> {
    return 'kitty';
  }

  @Query(_returns => Cat)
  async author(@Args({ name: 'id', type: () => Int }) id: MongooseSchema.Types.ObjectId) {
    return await this.catsService.findOneById(id);
  }

  @Query(_returns => [Cat])
  @UseGuards(GraphqlPassportAuthGuard)
  async cats(@Args() queryArgs: CatQueryArgs) {
    return await this.catsService.query(queryArgs);
  }

  @ResolveProperty('owner')
  async owner(@Parent() cat): Promise<AuthUser> {
    const { ownerId } = cat;
    return await this.ownersService.findByUserId(ownerId);
  }

  @Roles('user')
  @UseGuards(new GraphqlPassportAuthGuard('USER'))
  @Mutation(_returns => Cat)
  @UseGuards(GraphqlPassportAuthGuard)
  async createCat(@Args('input') input: CatInput, @CurrentUser() currentUser: User) {
    return this.catsService.create(input, currentUser);
  }
}
