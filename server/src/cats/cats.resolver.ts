import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat-input';
import { GraphqlPassportAuthGuard } from '../shared/guards/graphql-passport-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { CurrentUser } from '../shared/decorators';
import { User } from './models';

@Resolver()
export class CatsResolver {
  constructor(
    private readonly catsService: CatsService,
  ) { }

  @Query(() => String)
  async hello() {
    return 'hello kitty';
  }

  @Query(() => [CreateCatDto])
  @UseGuards(GraphqlPassportAuthGuard)
  async cats() {
    return this.catsService.findAll();
  }

  @Roles('user')
  @UseGuards(new GraphqlPassportAuthGuard('USER'))
  @Mutation(() => CreateCatDto)
  @UseGuards(GraphqlPassportAuthGuard)
  async createCat(@Args('input') input: CatInput, @CurrentUser() currentUser: User) {
    return this.catsService.create(input, currentUser);
  }
}
