import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Schema } from '@nestjs/mongoose';
import { Owner } from './owner.type';

@ObjectType()
@Schema()
export class Cat {
  @Field(type => ID)
  id: string;

  @Field()
  readonly name: string;

  @Field(type => Int)
  readonly age: number;

  @Field()
  readonly breed: string;

  @Field(type => Owner, { nullable: true })
  readonly owner?: Owner;
}
