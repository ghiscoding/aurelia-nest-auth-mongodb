import { ObjectType, Field, ID } from 'type-graphql';
import { ProviderDto } from './provider.dto';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class UserDto {
  @ApiProperty({ description: 'user ID' })
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

  @Field(type => [ProviderDto], { nullable: true })
  readonly providers: ProviderDto[];

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
