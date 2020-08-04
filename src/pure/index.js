import debounceFn from '../utils/debounce';
import { isNumber } from '../utils/typeCheck';

export function asyncAction(fn, {
  initialData = null,
  debounce = 0,
}, observableFn){
  if (debounce && (!isNumber(debounce) || debounce < 0)) {
    throw new Error('debounce option must be a positive number');
  }

  const stateObject = observableFn({
    state: 'notInitiated',
    data: initialData,
    error: null,
  });
  
  let rtFn = function(...args) {
    stateObject.state = 'pending';
    stateObject.error = null;
    stateObject.data = null;
    
    Promise.resolve(fn.apply(this, args)).then((res)=>{
      stateObject.state = 'fulfilled';
      stateObject.data = res;
      return res;
    }).catch((err)=>{
      stateObject.state = 'rejected';
      stateObject.error = err;
      throw err;
    })
  };

  Object.defineProperties(rtFn, {
    state: {
      get(){
        return stateObject.state;
      }
    },
    error: {
      get(){
        return stateObject.error;
      }
    },
    data: {
      get(){
        return stateObject.data;
      }
    }
  });

  if (debounce) {
    rtFn = debounceFn(rtFn, debounce);
  }

  return rtFn;
}

export function asyncActionCreator(options){
  return (fn, callSideOptions)=> asyncAction(fn, {
    ...options,
    ...callSideOptions,
  })
}
