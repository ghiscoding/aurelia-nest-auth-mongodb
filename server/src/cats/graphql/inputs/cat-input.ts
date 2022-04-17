import { Field, Int, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Min, MinLength } from 'class-validator';

@InputType()
export class CatInput {
  @Field()
  @MinLength(1)
  readonly name: string;

  @Field(type => Int)
  @Min(0)
  readonly age: number;

  @Field()
  @MinLength(0)
  readonly breed: string;

  @Field()
  @IsNotEmpty()
  readonly ownerId: string;
}
