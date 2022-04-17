import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema()
export class Owner {
  @Field(type => ID)
  id: string;

  @Field()
  readonly displayName: string;

  @Field()
  readonly email: string;
}
