import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatInput } from './inputs/cat-input';
import { UseGuards } from '@nestjs/common';
import { GraphqlPassportAuthGuard } from '../shared/guards/graphql-passport-auth.guard';
import { Roles } from '../shared/decorators/roles.decorator';

export interface User {
  id: string;
  displayName: string;
  email: string;
}

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
  async createCat(@Args('input') input: CatInput) {
    return this.catsService.create(input);
  }
}
