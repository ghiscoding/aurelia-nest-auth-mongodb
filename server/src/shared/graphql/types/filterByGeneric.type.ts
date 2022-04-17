import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Operator } from '../enums/operator.enum';

export function FilterByGeneric<TItem>(TItemEnum: any, name: string): any {
  @InputType(`FilterBy${name}`, { isAbstract: true })
  abstract class FilterByGenericClass {
    @Field(type => TItemEnum)
    @IsNotEmpty()
    field: TItem;

    @Field(type => Operator)
    @IsNotEmpty()
    readonly operator: Operator;

    @Field()
    @MinLength(0)
    readonly value: string;
  }
  return FilterByGenericClass;
}
