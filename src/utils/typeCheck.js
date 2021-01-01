export function isNumber(num) {
  return (
    (typeof num === 'number' && !Number.isNaN(num)) || num instanceof Number
  );
}

export function isFunction(val) {
  return (
    Object.prototype.toString.call(val) === '[object Function]' ||
    typeof val === 'function' ||
    val instanceof Function
  );
}
