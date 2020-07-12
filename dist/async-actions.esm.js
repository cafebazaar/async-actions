import Vue from 'vue';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function debounceFn (fn, wait) {
  var timerId;
  return function () {
    if (timerId) {
      clearTimeout(timerId);
    }

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    timerId = setTimeout(fn.bind.apply(fn, [this].concat(args)), wait);
  };
}

/* eslint-disable */
function isNumber(num) {
  return typeof num === 'number' && !Number.isNaN(num) || num instanceof Number;
}

function wrapAsyncActions (context, _ref) {
  var handler = _ref.handler,
      debounce = _ref.debounce,
      initialData = _ref.initialData;

  if (debounce && !isNumber(debounce)) {
    throw new Error('debounce option must be a number');
  }

  var state = Vue.observable({
    pending: false,
    data: initialData,
    error: null
  });

  var _rtFn = function rtFn() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var rt = handler.call.apply(handler, [context].concat(args));
    rt = Promise.resolve(rt);
    _rtFn.pending = true;
    _rtFn.error = null;
    rt = rt.then(function (data) {
      _rtFn.data = data;
      return data;
    })["catch"](function (error) {
      _rtFn.error = error;
      throw error;
    })["finally"](function () {
      _rtFn.pending = false;
    });
    return rt;
  };

  if (debounce) {
    _rtFn = debounceFn(_rtFn, debounce);
  }

  Object.defineProperties(_rtFn, {
    pending: {
      get: function get() {
        return state.pending;
      },
      set: function set(val) {
        state.pending = val;
      }
    },
    data: {
      get: function get() {
        return state.data;
      },
      set: function set(val) {
        state.data = val;
      }
    },
    error: {
      get: function get() {
        return state.error;
      },
      set: function set(val) {
        state.error = val;
      }
    }
  });
  return _rtFn;
}

function install (Vue) {
  Vue.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.asyncActions) {
        return;
      }

      for (var _i = 0, _Object$entries = Object.entries(this.$options.asyncActions); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            action = _Object$entries$_i[0],
            options = _Object$entries$_i[1];

        this[action] = wrapAsyncActions(this, options);
      }
    }
  });
}

var index = {
  install: install
};

export default index;
