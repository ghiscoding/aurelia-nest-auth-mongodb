import { Operator } from '../../models';
import { FilterByString } from '../types';

interface FilterByResult {
  [operator: string]: string;
}

export function getFilterByQuery(filterBy: FilterByString[]) {
  const filterObj = {};
  if (Array.isArray(filterBy)) {
    filterBy.forEach(filter => {
      filterObj[filter.field] = getFilterByOperator(filter.operator, filter.value);
    });
  }
  return filterObj;
}

export function getFilterByOperator(operator: Operator, searchValue: string | number | boolean): FilterByResult {
  let operation;

  switch (operator) {
    case Operator.EQ:
      operation = { $eq: searchValue };
      break;
    case Operator.NE:
      operation = { $ne: searchValue };
      break;
    case Operator.GE:
      operation = { $gte: searchValue };
      break;
    case Operator.GT:
      operation = { $gt: searchValue };
      break;
    case Operator.LE:
      operation = { $lte: searchValue };
      break;
    case Operator.LT:
      operation = { $lt: searchValue };
      break;
    case Operator.IN:
      const inValues = typeof searchValue === 'string' ? searchValue.split(',') : searchValue;
      operation = { $in: inValues || [] };
      break;
    case Operator.NIN:
      const notInValues = typeof searchValue === 'string' ? searchValue.split(',') : searchValue;
      operation = { $nin: notInValues || [] };
      break;
    case Operator.EndsWith:
      operation = { $regex: new RegExp(`.*${searchValue}$`, 'i') };
      break;
    case Operator.StartsWith:
      operation = { $regex: new RegExp(`^${searchValue}.*`, 'i') };
      break;
    case Operator.Contains:
    default:
      operation = { $regex: new RegExp(`.*${searchValue}.*`, 'i') };
      break;
  }
  return operation;
}
