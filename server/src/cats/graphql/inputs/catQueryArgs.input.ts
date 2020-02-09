import { ArgsType, Field } from 'type-graphql';
import { CatFields } from '../enums/catFields.enum';
import { FilterByGeneric, OrderByGeneric } from '../../../shared/graphql/types';

const FilterByCatFields = FilterByGeneric(CatFields, 'CatFields');
const OrderByCatFields = OrderByGeneric(CatFields, 'CatFields');
type FilterByCatFields = InstanceType<typeof FilterByCatFields>;
type OrderByCatFields = InstanceType<typeof OrderByCatFields>;

@ArgsType()
export class CatQueryArgs {
  @Field(type => [FilterByCatFields], { nullable: true })
  filterBy?: FilterByCatFields[];

  @Field(type => [OrderByCatFields], { nullable: true })
  orderBy?: OrderByCatFields[];
}
