export enum Operator {
  /** where value is less than */
  'LT' = 'LT',

  /** where value is less than or equal to */
  'LE' = 'LE',

  /** where value is greater than */
  'GT' = 'GT',

  /** where value is greater than or equal to */
  'GE' = 'GE',

  /** where value is not equal to */
  'NE' = 'NE',

  /** where value is equal to */
  'EQ' = 'EQ',

  /** where value is in the specified array */
  'IN' = 'IN',

  /** where value is not in the specified array */
  'NIN' = 'NIN',

  /** where value starts with string */
  'StartsWith' = 'StartsWith',

  /** where value ends with string */
  'EndsWith' = 'EndsWith',

  /** where value contains a substring */
  'Contains' = 'Contains',
}
