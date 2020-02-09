import { InputType, Field } from 'type-graphql';
import { Operator } from '../enums/operator.enum';

@InputType(`FilterByString`, { isAbstract: true })
export class FilterByString {
  @Field()
  field: string;

  @Field(type => Operator)
  readonly operator: Operator;

  @Field()
  readonly value: string;
}
