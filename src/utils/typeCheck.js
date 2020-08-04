export function isNumber(num) {
  return (
    (typeof num === 'number' && !Number.isNaN(num)) || num instanceof Number
  );
}

export function isFunction(val) {
  return val && {}.toString.call(val) === '[object Function]';
}
