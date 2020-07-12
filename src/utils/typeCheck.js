/* eslint-disable */
export function isNumber(num) {
  return (
    (typeof num === 'number' && !Number.isNaN(num)) || num instanceof Number
  );
}
