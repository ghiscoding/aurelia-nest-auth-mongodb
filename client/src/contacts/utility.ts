export function areEqual(obj1: object, obj2: object): boolean {
  if(obj1 && !obj2) {
    return false;
  }
  return Object.keys(obj1).every((key) => obj2.hasOwnProperty(key) && (obj1[key] === obj2[key]));
};
