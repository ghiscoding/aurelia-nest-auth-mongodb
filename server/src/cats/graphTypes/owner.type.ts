import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class Owner {
  @Field(() => ID)
  id: string;

  @Field()
  readonly displayName: string;

  @Field()
  readonly email: string;
}
