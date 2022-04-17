import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsOptional, Min } from 'class-validator';
import { StringQueryArgs } from '../../../shared/graphql/inputs';

@ArgsType()
export class UserQueryArgs extends StringQueryArgs {
  @Field(type => Int)
  @Min(1)
  first: number;

  @Field(type => Int)
  @Min(0)
  offset: number;

  @Field({ nullable: true })
  @IsOptional()
  cursor?: string;
}
