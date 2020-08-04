import { isFunction } from '../utils/typeCheck';
import asyncAction from './asyncAction';

export default {
  install(Vue) {
    Vue.mixin({
      beforeCreate() {
        if (!this.$options.asyncActions) {
          return;
        }

        Object.keys(this.$options.asyncActions).forEach((action) => {
          const configs = this.$options.asyncActions[action];

          if (isFunction(configs)) {
            this[action] = asyncAction(configs, { ctx: this });
          } else {
            const { handler, ...options } = configs;

            if (!isFunction(handler)) {
              throw new Error('handler must be a function');
            }

            this[action] = asyncAction(handler, {
              ctx: this,
              ...options,
            });
          }
        });
      },
    });
  },
};
