import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { Direction } from '../enums/direction.enum';

@InputType(`OrderByString`, { isAbstract: true })
export class OrderByString {
  @Field()
  @MinLength(0)
  field: string;

  @Field(type => Direction)
  @IsNotEmpty()
  readonly direction: Direction;
}
