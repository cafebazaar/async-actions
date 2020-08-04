import { writable } from 'svelte/store';
import { asyncAction } from '../pure';

export default function(fn, options){
  return asyncAction(fn, options, (stateObject)=>{

    const newStateObject = {};

    Object.keys(stateObject).forEach((key)=>{
      const observedValue = writable(stateObject[key]);
      Object.defineProperty(newStateObject, key, {
        get(){
          return observedValue;
        },
        set(val){
          observedValue.update(() => val)
        }
      })
    })

    return stateObject;
  });
}