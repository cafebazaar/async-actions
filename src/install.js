import wrapAsyncActions from './wrapAsyncAction';

export default function (Vue) {
  Vue.mixin({
    beforeCreate() {
      if (!this.$options.asyncActions) {
        return;
      }

      for (const [action, options] of Object.entries(
        this.$options.asyncActions
      )) {
        this[action] = wrapAsyncActions(this, options);
      }
    },
  });
}
