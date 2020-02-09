import { registerEnumType } from 'type-graphql';

export enum Direction {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(Direction, {
  name: 'Direction',
  description: 'The orderBy directions',
});
