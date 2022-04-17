import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { FilterByString } from '../types/filterByString.type';
import { OrderByString } from '../types/orderByString.type';

@ArgsType()
export class StringQueryArgs {
  @Field(type => [FilterByString], { nullable: true })
  @IsOptional()
  filterBy?: FilterByString[];

  @Field(type => [OrderByString], { nullable: true })
  @IsOptional()
  orderBy?: OrderByString[];
}
