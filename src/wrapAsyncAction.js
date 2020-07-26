/* eslint-disable-next-line */
import Vue from 'vue';
import debounceFn from './utils/debounce';
import { isNumber } from './utils/typeCheck';

export default function (context, { handler, debounce, initialData }) {
  if (debounce && !isNumber(debounce)) {
    throw new Error('debounce option must be a number');
  }

  const state = Vue.observable({
    pending: false,
    data: initialData,
    error: null,
  });

  let rtFn = function (...args) {
    let rt = handler.call(context, ...args);
    rt = Promise.resolve(rt);

    rtFn.pending = true;
    rtFn.error = null;
    rt = rt
      .then((data) => {
        rtFn.data = data;
        return data;
      })
      .catch((error) => {
        rtFn.error = error;
        throw error;
      })
      .finally(() => {
        rtFn.pending = false;
      });
    return rt;
  };

  if (debounce) {
    rtFn = debounceFn(rtFn, debounce);
  }

  Object.defineProperties(rtFn, {
    pending: {
      get() {
        return state.pending;
      },
      set(val) {
        state.pending = val;
      },
    },
    data: {
      get() {
        return state.data;
      },
      set(val) {
        state.data = val;
      },
    },
    error: {
      get() {
        return state.error;
      },
      set(val) {
        state.error = val;
      },
    },
  });

  return rtFn;
}
