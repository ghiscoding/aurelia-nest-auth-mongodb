import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Provider } from './provider.type';

@ObjectType()
export class User {
  @Field(() => ID)
  readonly id: string;

  @Field(() => ID)
  readonly userId: string;

  @Field()
  readonly displayName: string;

  @Field()
  readonly email: string;

  @Field({ nullable: true })
  readonly picture: string;

  @Field({ nullable: true })
  readonly provider: string;

  @Field(type => [Provider], { nullable: true })
  readonly providers: Provider[];

  @Field(type => [String])
  readonly roles: string[];

  @Field({ nullable: true })
  readonly facebook?: string;

  @Field({ nullable: true })
  readonly github?: string;

  @Field({ nullable: true })
  readonly google?: string;

  @Field({ nullable: true })
  readonly linkedin?: string;

  @Field({ nullable: true })
  readonly live?: string;

  @Field({ nullable: true })
  readonly microsoft?: string;

  @Field({ nullable: true })
  readonly twitter?: string;

  @Field({ nullable: true })
  readonly windowslive?: string;
}
