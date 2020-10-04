import { ArgsType, Field } from '@nestjs/graphql';
import { FilterByString } from '../types/filterByString.type';
import { OrderByString } from '../types/orderByString.type';

@ArgsType()
export class StringQueryArgs {
  @Field(type => [FilterByString], { nullable: true })
  filterBy?: FilterByString[];

  @Field(type => [OrderByString], { nullable: true })
  orderBy?: OrderByString[];
}
