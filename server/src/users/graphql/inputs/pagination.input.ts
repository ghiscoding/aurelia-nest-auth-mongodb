import { ArgsType, Field, Int } from 'type-graphql';
import { StringQueryArgs } from '../../../shared/graphql/inputs';

@ArgsType()
export class UserQueryArgs extends StringQueryArgs {
  @Field(type => Int)
  first: number;

  @Field(type => Int)
  offset: number;

  @Field({ nullable: true })
  cursor: string;
}
