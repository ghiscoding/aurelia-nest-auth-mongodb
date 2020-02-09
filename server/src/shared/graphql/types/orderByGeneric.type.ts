import { InputType, Field } from 'type-graphql';
import { Direction } from '../enums/direction.enum';

export function OrderByGeneric<TItem>(TItemEnum: any, name: string): any {
  @InputType(`OrderBy${name}`, { isAbstract: true })
  abstract class OrderByGenericClass {
    @Field(type => TItemEnum)
    field: TItem;

    @Field(type => Direction)
    readonly direction: Direction;
  }
  return OrderByGenericClass;
}
