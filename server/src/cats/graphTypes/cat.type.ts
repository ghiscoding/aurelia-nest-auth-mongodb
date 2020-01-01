import { ObjectType, Field, Int, ID } from 'type-graphql';
import { Owner } from './owner.type';

@ObjectType()
export class Cat {
  @Field(() => ID)
  id: string;

  @Field()
  readonly name: string;

  @Field(() => Int)
  readonly age: number;

  @Field()
  readonly breed: string;

  @Field(type => Owner, { nullable: true })
  readonly owner?: Owner;
}
