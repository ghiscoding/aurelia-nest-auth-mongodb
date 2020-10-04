import { InputType, Field } from '@nestjs/graphql';
import { Operator } from '../enums/operator.enum';

export function FilterByGeneric<TItem>(TItemEnum: any, name: string): any {
  @InputType(`FilterBy${name}`, { isAbstract: true })
  abstract class FilterByGenericClass {
    @Field(type => TItemEnum)
    field: TItem;

    @Field(type => Operator)
    readonly operator: Operator;

    @Field()
    readonly value: string;
  }
  return FilterByGenericClass;
}
