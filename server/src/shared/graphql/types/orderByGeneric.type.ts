import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Direction } from '../enums/direction.enum';

export function OrderByGeneric<TItem>(TItemEnum: any, name: string): any {
  @InputType(`OrderBy${name}`, { isAbstract: true })
  abstract class OrderByGenericClass {
    @Field(type => TItemEnum)
    @IsNotEmpty()
    field: TItem;

    @Field(type => Direction)
    @IsNotEmpty()
    readonly direction: Direction;
  }
  return OrderByGenericClass;
}
