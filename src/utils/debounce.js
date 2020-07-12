export default function (fn, wait) {
  let timerId;

  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(fn.bind(this, ...args), wait);
  };
}
