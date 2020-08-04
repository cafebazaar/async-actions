import Vue from 'vue';
import { asyncAction } from '../pure';

export default function (fn, options) {
  return asyncAction(fn, options, Vue.observable);
}
