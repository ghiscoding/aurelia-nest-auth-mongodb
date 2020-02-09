import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Provider {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly providerId: string;

  @Field()
  readonly name: string;
}
