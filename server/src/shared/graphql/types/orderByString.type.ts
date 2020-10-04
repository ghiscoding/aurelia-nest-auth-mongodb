import { InputType, Field } from '@nestjs/graphql';
import { Direction } from '../enums/direction.enum';

@InputType(`OrderByString`, { isAbstract: true })
export class OrderByString {
  @Field()
  field: string;

  @Field(type => Direction)
  readonly direction: Direction;
}
