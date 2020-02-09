import { ObjectType, Field, Int, ClassType } from 'type-graphql';
import { PageInfo } from './pageInfo.type';

export function PaginatedResponse<TItem>(TItemClass: ClassType<TItem>): any {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponseClass {
    @Field(type => [TItemClass])
    nodes: TItem[];

    @Field(type => Int)
    totalCount: number;

    @Field(type => PageInfo)
    pageInfo?: PageInfo;
  }
  return PaginatedResponseClass;
}
