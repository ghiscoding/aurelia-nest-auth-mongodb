import { Args, Query, Resolver, Mutation, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Int } from 'type-graphql';

import { CatsService } from './services/cats.service';
import { Cat } from './graphTypes/cat.type';
import { CatInput } from './inputs/cat-input';
import { GraphqlPassportAuthGuard } from '../shared/guards/graphql-passport-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators';
import { User } from '../shared/models';
import { OwnersService } from './services/owners.service';

@Resolver('Cat')
@Resolver(of => Cat)
export class CatsResolver {
  constructor(
    private readonly catsService: CatsService,
    private readonly ownersService: OwnersService,
  ) { }

  @Query(returns => String)
  async hello() {
    return 'kitty';
  }

  @Query(returns => Cat)
  async author(@Args({ name: 'id', type: () => Int }) id: number) {
    return await this.catsService.findOneById(id);
  }

  @Query(returns => [Cat])
  @UseGuards(GraphqlPassportAuthGuard)
  async cats() {
    return this.catsService.findAll();
  }

  @ResolveProperty('owner')
  async owner(@Parent() cat) {
    const { ownerId } = cat;
    return await this.ownersService.findByUserId(ownerId);
  }

  @Roles('user')
  @UseGuards(new GraphqlPassportAuthGuard('USER'))
  @Mutation(() => Cat)
  @UseGuards(GraphqlPassportAuthGuard)
  async createCat(@Args('input') input: CatInput, @CurrentUser() currentUser: User) {
    return this.catsService.create(input, currentUser);
  }
}
