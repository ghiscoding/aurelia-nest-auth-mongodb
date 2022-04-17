import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsNotEmpty } from 'class-validator';
import { Operator } from '../enums/operator.enum';

@InputType(`FilterByString`, { isAbstract: true })
export class FilterByString {
  @Field()
  @MinLength(0)
  field: string;

  @Field(type => Operator)
  @IsNotEmpty()
  readonly operator: Operator;

  @Field()
  @MinLength(0)
  readonly value: string;
}
