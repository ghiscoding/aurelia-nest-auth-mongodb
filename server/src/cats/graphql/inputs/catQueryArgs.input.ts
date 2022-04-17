import { ArgsType, Field } from '@nestjs/graphql';
import { CatFields } from '../enums/catFields.enum';
import { FilterByGeneric, OrderByGeneric } from '../../../shared/graphql/types';
import { IsOptional } from 'class-validator';

const FilterByCatFields = FilterByGeneric(CatFields, 'CatFields');
const OrderByCatFields = OrderByGeneric(CatFields, 'CatFields');
type FilterByCatFields = InstanceType<typeof FilterByCatFields>;
type OrderByCatFields = InstanceType<typeof OrderByCatFields>;

@ArgsType()
export class CatQueryArgs {
  @Field(type => [FilterByCatFields], { nullable: true })
  @IsOptional()
  filterBy?: FilterByCatFields[];

  @Field(type => [OrderByCatFields], { nullable: true })
  @IsOptional()
  orderBy?: OrderByCatFields[];
}
