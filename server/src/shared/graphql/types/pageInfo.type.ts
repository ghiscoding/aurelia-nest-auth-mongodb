import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  readonly hasNextPage?: boolean;

  @Field({ nullable: true })
  readonly hasPreviousPage?: boolean;

  @Field({ nullable: true })
  readonly endCursor?: string;

  @Field({ nullable: true })
  readonly startCursor?: string;
}
