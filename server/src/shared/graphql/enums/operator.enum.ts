import { registerEnumType } from 'type-graphql';

export enum Operator {
  LT = 'LT',
  LE = 'LE',
  GT = 'GT',
  GE = 'GE',
  NE = 'NE',
  EQ = 'EQ',
  IN = 'IN',
  NIN = 'NIN',
  StartsWith = 'StartsWith',
  EndsWith = 'EndsWith',
  Contains = 'Contains',
}

registerEnumType(Operator, {
  name: 'Operator',
  description: 'Possible filter operators',
});
