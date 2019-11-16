import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class ProviderDto {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly providerId: string;

  @Field()
  readonly name: string;
}
