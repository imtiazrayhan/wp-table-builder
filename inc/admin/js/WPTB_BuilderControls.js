// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../../node_modules/vue/dist/vue.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*!
 * Vue.js v2.6.11
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

/*  */
var emptyObject = Object.freeze({}); // These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.

function isUndef(v) {
  return v === undefined || v === null;
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function isTrue(v) {
  return v === true;
}

function isFalse(v) {
  return v === false;
}
/**
 * Check if value is primitive.
 */


function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || // $flow-disable-line
  typeof value === 'symbol' || typeof value === 'boolean';
}
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */


function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}
/**
 * Get the raw type string of a value, e.g., [object Object].
 */


var _toString = Object.prototype.toString;

function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */


function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function isRegExp(v) {
  return _toString.call(v) === '[object RegExp]';
}
/**
 * Check if val is a valid array index.
 */


function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

function isPromise(val) {
  return isDef(val) && typeof val.then === 'function' && typeof val.catch === 'function';
}
/**
 * Convert a value to a string that is actually rendered.
 */


function toString(val) {
  return val == null ? '' : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */


function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */


function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');

  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }

  return expectsLowerCase ? function (val) {
    return map[val.toLowerCase()];
  } : function (val) {
    return map[val];
  };
}
/**
 * Check if a tag is a built-in tag.
 */


var isBuiltInTag = makeMap('slot,component', true);
/**
 * Check if an attribute is a reserved attribute.
 */

var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');
/**
 * Remove an item from an array.
 */

function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);

    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}
/**
 * Check whether an object has the property.
 */


var hasOwnProperty = Object.prototype.hasOwnProperty;

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
/**
 * Create a cached version of a pure function.
 */


function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
/**
 * Camelize a hyphen-delimited string.
 */


var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
/**
 * Capitalize a string.
 */

var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
/**
 * Hyphenate a camelCase string.
 */

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});
/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */

function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}

var bind = Function.prototype.bind ? nativeBind : polyfillBind;
/**
 * Convert an Array-like object to a real Array.
 */

function toArray(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);

  while (i--) {
    ret[i] = list[i + start];
  }

  return ret;
}
/**
 * Mix properties into target object.
 */


function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }

  return to;
}
/**
 * Merge an Array of Objects into a single Object.
 */


function toObject(arr) {
  var res = {};

  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }

  return res;
}
/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */


function noop(a, b, c) {}
/**
 * Always return false.
 */


var no = function (a, b, c) {
  return false;
};
/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */


var identity = function (_) {
  return _;
};
/**
 * Generate a string containing static keys from compiler modules.
 */


function genStaticKeys(modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || []);
  }, []).join(',');
}
/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */


function looseEqual(a, b) {
  if (a === b) {
    return true;
  }

  var isObjectA = isObject(a);
  var isObjectB = isObject(b);

  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);

      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */


function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) {
      return i;
    }
  }

  return -1;
}
/**
 * Ensure a function is called only once.
 */


function once(fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}

var SSR_ATTR = 'data-server-rendered';
var ASSET_TYPES = ['component', 'directive', 'filter'];
var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */

var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
/**
 * Check if a string starts with $ or _
 */

function isReserved(str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F;
}
/**
 * Define a property.
 */


function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
/**
 * Parse simple path.
 */


var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");

function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }

  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }

      obj = obj[segments[i]];
    }

    return obj;
  };
}
/*  */
// can we use __proto__?


var hasProto = ('__proto__' in {}); // Browser environment sniffing

var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0 || weexPlatform === 'android';
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === 'ios';
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/); // Firefox has a "watch" function on Object.prototype...

var nativeWatch = {}.watch;
var supportsPassive = false;

if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    }); // https://github.com/facebook/flow/issues/285

    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
} // this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV


var _isServer;

var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }

  return _isServer;
}; // detect devtools


var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
/* istanbul ignore next */

function isNative(Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString());
}

var hasSymbol = typeof Symbol !== 'undefined' && isNative(Symbol) && typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */
// $flow-disable-line


if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/function () {
    function Set() {
      this.set = Object.create(null);
    }

    Set.prototype.has = function has(key) {
      return this.set[key] === true;
    };

    Set.prototype.add = function add(key) {
      this.set[key] = true;
    };

    Set.prototype.clear = function clear() {
      this.set = Object.create(null);
    };

    return Set;
  }();
}
/*  */


var warn = noop;
var tip = noop;
var generateComponentTrace = noop; // work around flow check

var formatComponentName = noop;

if ("development" !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;

  var classify = function (str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && !config.silent) {
      console.error("[Vue warn]: " + msg + trace);
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && !config.silent) {
      console.warn("[Vue tip]: " + msg + (vm ? generateComponentTrace(vm) : ''));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>';
    }

    var options = typeof vm === 'function' && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;

    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (name ? "<" + classify(name) + ">" : "<Anonymous>") + (file && includeFile !== false ? " at " + file : '');
  };

  var repeat = function (str, n) {
    var res = '';

    while (n) {
      if (n % 2 === 1) {
        res += str;
      }

      if (n > 1) {
        str += str;
      }

      n >>= 1;
    }

    return res;
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;

      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];

          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue;
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }

        tree.push(vm);
        vm = vm.$parent;
      }

      return '\n\nfound in\n\n' + tree.map(function (vm, i) {
        return "" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm) ? formatComponentName(vm[0]) + "... (" + vm[1] + " recursive calls)" : formatComponentName(vm));
      }).join('\n');
    } else {
      return "\n\n(found in " + formatComponentName(vm) + ")";
    }
  };
}
/*  */


var uid = 0;
/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */

var Dep = function Dep() {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub(sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub(sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend() {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify() {
  // stabilize the subscriber list first
  var subs = this.subs.slice();

  if ("development" !== 'production' && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
}; // The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.


Dep.target = null;
var targetStack = [];

function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
/*  */


var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = {
  child: {
    configurable: true
  }
}; // DEPRECATED: alias for componentInstance for backwards compat.

/* istanbul ignore next */

prototypeAccessors.child.get = function () {
  return this.componentInstance;
};

Object.defineProperties(VNode.prototype, prototypeAccessors);

var createEmptyVNode = function (text) {
  if (text === void 0) text = '';
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};

function createTextVNode(val) {
  return new VNode(undefined, undefined, undefined, String(val));
} // optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.


function cloneVNode(vnode) {
  var cloned = new VNode(vnode.tag, vnode.data, // #7975
  // clone children array to avoid mutating original in case of cloning
  // a child.
  vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */


var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
/**
 * Intercept mutating methods and emit events
 */

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [],
        len = arguments.length;

    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;

    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break;

      case 'splice':
        inserted = args.slice(2);
        break;
    }

    if (inserted) {
      ob.observeArray(inserted);
    } // notify change


    ob.dep.notify();
    return result;
  });
});
/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */

var shouldObserve = true;

function toggleObserving(value) {
  shouldObserve = value;
}
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */


var Observer = function Observer(value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);

  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }

    this.observeArray(value);
  } else {
    this.walk(value);
  }
};
/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */


Observer.prototype.walk = function walk(obj) {
  var keys = Object.keys(obj);

  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};
/**
 * Observe a list of Array items.
 */


Observer.prototype.observeArray = function observeArray(items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
}; // helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */


function protoAugment(target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}
/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */

/* istanbul ignore next */


function copyAugment(target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}
/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */


function observe(value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  var ob;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}
/**
 * Define a reactive property on an Object.
 */


function defineReactive$$1(obj, key, val, customSetter, shallow) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  } // cater for pre-defined getter/setters


  var getter = property && property.get;
  var setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */

      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */


      if ("development" !== 'production' && customSetter) {
        customSetter();
      } // #7981: for accessor properties without setter


      if (getter && !setter) {
        return;
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}
/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */


function set(target, key, val) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot set reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }

  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid adding reactive properties to a Vue instance or its root $data ' + 'at runtime - declare it upfront in the data option.');
    return val;
  }

  if (!ob) {
    target[key] = val;
    return val;
  }

  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val;
}
/**
 * Delete a property and trigger change if necessary.
 */


function del(target, key) {
  if ("development" !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn("Cannot delete reactive property on undefined, null, or primitive value: " + target);
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return;
  }

  var ob = target.__ob__;

  if (target._isVue || ob && ob.vmCount) {
    "development" !== 'production' && warn('Avoid deleting properties on a Vue instance or its root $data ' + '- just set it to null.');
    return;
  }

  if (!hasOwn(target, key)) {
    return;
  }

  delete target[key];

  if (!ob) {
    return;
  }

  ob.dep.notify();
}
/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */


function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();

    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}
/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */


var strats = config.optionMergeStrategies;
/**
 * Options with restrictions
 */

if ("development" !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn("option \"" + key + "\" can only be used during instance " + 'creation with the `new` keyword.');
    }

    return defaultStrat(parent, child);
  };
}
/**
 * Helper that recursively merges two data objects together.
 */


function mergeData(to, from) {
  if (!from) {
    return to;
  }

  var key, toVal, fromVal;
  var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i]; // in case the object is already observed...

    if (key === '__ob__') {
      continue;
    }

    toVal = to[key];
    fromVal = from[key];

    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }

  return to;
}
/**
 * Data
 */


function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal;
    }

    if (!parentVal) {
      return childVal;
    } // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.


    return function mergedDataFn() {
      return mergeData(typeof childVal === 'function' ? childVal.call(this, this) : childVal, typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      // instance merge
      var instanceData = typeof childVal === 'function' ? childVal.call(vm, vm) : childVal;
      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm, vm) : parentVal;

      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}

strats.data = function (parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.', vm);
      return parentVal;
    }

    return mergeDataOrFn(parentVal, childVal);
  }

  return mergeDataOrFn(parentVal, childVal, vm);
};
/**
 * Hooks and props are merged as arrays.
 */


function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}

function dedupeHooks(hooks) {
  var res = [];

  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }

  return res;
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});
/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */

function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);

  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal);
  } else {
    return res;
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});
/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */

strats.watch = function (parentVal, childVal, vm, key) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) {
    parentVal = undefined;
  }

  if (childVal === nativeWatch) {
    childVal = undefined;
  }
  /* istanbul ignore if */


  if (!childVal) {
    return Object.create(parentVal || null);
  }

  if ("development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = {};
  extend(ret, parentVal);

  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];

    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }

    ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [child];
  }

  return ret;
};
/**
 * Other object hashes.
 */


strats.props = strats.methods = strats.inject = strats.computed = function (parentVal, childVal, vm, key) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }

  if (!parentVal) {
    return childVal;
  }

  var ret = Object.create(null);
  extend(ret, parentVal);

  if (childVal) {
    extend(ret, childVal);
  }

  return ret;
};

strats.provide = mergeDataOrFn;
/**
 * Default strategy.
 */

var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined ? parentVal : childVal;
};
/**
 * Validate component names
 */


function checkComponents(options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName(name) {
  if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
    warn('Invalid component name: "' + name + '". Component names ' + 'should conform to valid custom element name in html5 specification.');
  }

  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + name);
  }
}
/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */


function normalizeProps(options, vm) {
  var props = options.props;

  if (!props) {
    return;
  }

  var res = {};
  var i, val, name;

  if (Array.isArray(props)) {
    i = props.length;

    while (i--) {
      val = props[i];

      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = {
          type: null
        };
      } else if ("development" !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val) ? val : {
        type: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"props\": expected an Array or an Object, " + "but got " + toRawType(props) + ".", vm);
  }

  options.props = res;
}
/**
 * Normalize all injections into Object-based format
 */


function normalizeInject(options, vm) {
  var inject = options.inject;

  if (!inject) {
    return;
  }

  var normalized = options.inject = {};

  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = {
        from: inject[i]
      };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val) ? extend({
        from: key
      }, val) : {
        from: val
      };
    }
  } else if ("development" !== 'production') {
    warn("Invalid value for option \"inject\": expected an Array or an Object, " + "but got " + toRawType(inject) + ".", vm);
  }
}
/**
 * Normalize raw function directives into object format.
 */


function normalizeDirectives(options) {
  var dirs = options.directives;

  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];

      if (typeof def$$1 === 'function') {
        dirs[key] = {
          bind: def$$1,
          update: def$$1
        };
      }
    }
  }
}

function assertObjectType(name, value, vm) {
  if (!isPlainObject(value)) {
    warn("Invalid value for option \"" + name + "\": expected an Object, " + "but got " + toRawType(value) + ".", vm);
  }
}
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */


function mergeOptions(parent, child, vm) {
  if ("development" !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child); // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.

  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }

    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }

  return options;
}
/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */


function resolveAsset(options, type, id, warnMissing) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return;
  }

  var assets = options[type]; // check local registration variations first

  if (hasOwn(assets, id)) {
    return assets[id];
  }

  var camelizedId = camelize(id);

  if (hasOwn(assets, camelizedId)) {
    return assets[camelizedId];
  }

  var PascalCaseId = capitalize(camelizedId);

  if (hasOwn(assets, PascalCaseId)) {
    return assets[PascalCaseId];
  } // fallback to prototype chain


  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];

  if ("development" !== 'production' && warnMissing && !res) {
    warn('Failed to resolve ' + type.slice(0, -1) + ': ' + id, options);
  }

  return res;
}
/*  */


function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key]; // boolean casting

  var booleanIndex = getTypeIndex(Boolean, prop.type);

  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);

      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  } // check default value


  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key); // since the default value is a fresh copy,
    // make sure to observe it.

    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }

  if ("development" !== 'production' && // skip validation for weex recycle-list child component props
  !false) {
    assertProp(prop, key, value, vm, absent);
  }

  return value;
}
/**
 * Get the default value of a prop.
 */


function getPropDefaultValue(vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined;
  }

  var def = prop.default; // warn against non-factory defaults for Object & Array

  if ("development" !== 'production' && isObject(def)) {
    warn('Invalid default value for prop "' + key + '": ' + 'Props with type Object/Array must use a factory function ' + 'to return the default value.', vm);
  } // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger


  if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
    return vm._props[key];
  } // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context


  return typeof def === 'function' && getType(prop.type) !== 'Function' ? def.call(vm) : def;
}
/**
 * Assert whether a prop is valid.
 */


function assertProp(prop, name, value, vm, absent) {
  if (prop.required && absent) {
    warn('Missing required prop: "' + name + '"', vm);
    return;
  }

  if (value == null && !prop.required) {
    return;
  }

  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];

  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }

    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
    return;
  }

  var validator = prop.validator;

  if (validator) {
    if (!validator(value)) {
      warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType(value, type) {
  var valid;
  var expectedType = getType(type);

  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase(); // for primitive wrapper objects

    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }

  return {
    valid: valid,
    expectedType: expectedType
  };
}
/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */


function getType(fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : '';
}

function isSameType(a, b) {
  return getType(a) === getType(b);
}

function getTypeIndex(type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }

  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }

  return -1;
}

function getInvalidTypeMessage(name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." + " Expected " + expectedTypes.map(capitalize).join(', ');
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType); // check if we need to specify expected value

  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }

  message += ", got " + receivedType + " "; // check if we need to specify received value

  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }

  return message;
}

function styleValue(value, type) {
  if (type === 'String') {
    return "\"" + value + "\"";
  } else if (type === 'Number') {
    return "" + Number(value);
  } else {
    return "" + value;
  }
}

function isExplicable(value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) {
    return value.toLowerCase() === elem;
  });
}

function isBoolean() {
  var args = [],
      len = arguments.length;

  while (len--) args[len] = arguments[len];

  return args.some(function (elem) {
    return elem.toLowerCase() === 'boolean';
  });
}
/*  */


function handleError(err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();

  try {
    if (vm) {
      var cur = vm;

      while (cur = cur.$parent) {
        var hooks = cur.$options.errorCaptured;

        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;

              if (capture) {
                return;
              }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }

    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;

  try {
    res = args ? handler.apply(context, args) : handler.call(context);

    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) {
        return handleError(e, vm, info + " (Promise/async)");
      }); // issue #9511
      // avoid catch triggering multiple times when nested calls

      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }

  return res;
}

function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }

  logError(err, vm, info);
}

function logError(err, vm, info) {
  if ("development" !== 'production') {
    warn("Error in " + info + ": \"" + err.toString() + "\"", vm);
  }
  /* istanbul ignore else */


  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err;
  }
}
/*  */


var isUsingMicroTask = false;
var callbacks = [];
var pending = false;

function flushCallbacks() {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;

  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
} // Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).


var timerFunc; // The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:

/* istanbul ignore next, $flow-disable-line */

if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();

  timerFunc = function () {
    p.then(flushCallbacks); // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.

    if (isIOS) {
      setTimeout(noop);
    }
  };

  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== 'undefined' && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === '[object MutationObserverConstructor]')) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });

  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };

  isUsingMicroTask = true;
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick(cb, ctx) {
  var _resolve;

  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;
    timerFunc();
  } // $flow-disable-line


  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    });
  }
}
/*  */


var mark;
var measure;

if ("development" !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */

  if (perf && perf.mark && perf.measure && perf.clearMarks && perf.clearMeasures) {
    mark = function (tag) {
      return perf.mark(tag);
    };

    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag); // perf.clearMeasures(name)
    };
  }
}
/* not type checking this file because flow doesn't play well with Proxy */


var initProxy;

if ("development" !== 'production') {
  var allowedGlobals = makeMap('Infinity,undefined,NaN,isFinite,isNaN,' + 'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' + 'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' + 'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn("Property or method \"" + key + "\" is not defined on the instance but " + 'referenced during render. Make sure that this property is reactive, ' + 'either in the data option, or for class-based components, by ' + 'initializing the property. ' + 'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.', target);
  };

  var warnReservedPrefix = function (target, key) {
    warn("Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " + 'properties starting with "$" or "_" are not proxied in the Vue instance to ' + 'prevent conflicts with Vue internals. ' + 'See: https://vuejs.org/v2/api/#data', target);
  };

  var hasProxy = typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set(target, key, value) {
        if (isBuiltInModifier(key)) {
          warn("Avoid overwriting built-in modifier in config.keyCodes: ." + key);
          return false;
        } else {
          target[key] = value;
          return true;
        }
      }
    });
  }

  var hasHandler = {
    has: function has(target, key) {
      var has = (key in target);
      var isAllowed = allowedGlobals(key) || typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data);

      if (!has && !isAllowed) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return has || !isAllowed;
    }
  };
  var getHandler = {
    get: function get(target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) {
          warnReservedPrefix(target, key);
        } else {
          warnNonPresent(target, key);
        }
      }

      return target[key];
    }
  };

  initProxy = function initProxy(vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped ? getHandler : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}
/*  */


var seenObjects = new _Set();
/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */

function traverse(val) {
  _traverse(val, seenObjects);

  seenObjects.clear();
}

function _traverse(val, seen) {
  var i, keys;
  var isA = Array.isArray(val);

  if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }

  if (val.__ob__) {
    var depId = val.__ob__.dep.id;

    if (seen.has(depId)) {
      return;
    }

    seen.add(depId);
  }

  if (isA) {
    i = val.length;

    while (i--) {
      _traverse(val[i], seen);
    }
  } else {
    keys = Object.keys(val);
    i = keys.length;

    while (i--) {
      _traverse(val[keys[i]], seen);
    }
  }
}
/*  */


var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first

  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  };
});

function createFnInvoker(fns, vm) {
  function invoker() {
    var arguments$1 = arguments;
    var fns = invoker.fns;

    if (Array.isArray(fns)) {
      var cloned = fns.slice();

      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
    }
  }

  invoker.fns = fns;
  return invoker;
}

function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
  var name, def$$1, cur, old, event;

  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);

    if (isUndef(cur)) {
      "development" !== 'production' && warn("Invalid handler for event \"" + event.name + "\": got " + String(cur), vm);
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }

      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }

      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }

  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}
/*  */


function mergeVNodeHook(def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }

  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook() {
    hook.apply(this, arguments); // important: remove merged hook to ensure it's called only once
    // and prevent memory leak

    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}
/*  */


function extractPropsFromVNodeData(data, Ctor, tag) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;

  if (isUndef(propOptions)) {
    return;
  }

  var res = {};
  var attrs = data.attrs;
  var props = data.props;

  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);

      if ("development" !== 'production') {
        var keyInLowerCase = key.toLowerCase();

        if (key !== keyInLowerCase && attrs && hasOwn(attrs, keyInLowerCase)) {
          tip("Prop \"" + keyInLowerCase + "\" is passed to component " + formatComponentName(tag || Ctor) + ", but the declared prop name is" + " \"" + key + "\". " + "Note that HTML attributes are case-insensitive and camelCased " + "props need to use their kebab-case equivalents when using in-DOM " + "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\".");
        }
      }

      checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
    }
  }

  return res;
}

function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];

      if (!preserve) {
        delete hash[key];
      }

      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];

      if (!preserve) {
        delete hash[altKey];
      }

      return true;
    }
  }

  return false;
}
/*  */
// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:
// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.


function simpleNormalizeChildren(children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children);
    }
  }

  return children;
} // 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.


function normalizeChildren(children) {
  return isPrimitive(children) ? [createTextVNode(children)] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
}

function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}

function normalizeArrayChildren(children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;

  for (i = 0; i < children.length; i++) {
    c = children[i];

    if (isUndef(c) || typeof c === 'boolean') {
      continue;
    }

    lastIndex = res.length - 1;
    last = res[lastIndex]; //  nested

    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, (nestedIndex || '') + "_" + i); // merge adjacent text nodes

        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }

        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }

        res.push(c);
      }
    }
  }

  return res;
}
/*  */


function initProvide(vm) {
  var provide = vm.$options.provide;

  if (provide) {
    vm._provided = typeof provide === 'function' ? provide.call(vm) : provide;
  }
}

function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);

  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if ("development" !== 'production') {
        defineReactive$$1(vm, key, result[key], function () {
          warn("Avoid mutating an injected value directly since the changes will be " + "overwritten whenever the provided component re-renders. " + "injection being mutated: \"" + key + "\"", vm);
        });
      } else {
        defineReactive$$1(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject(inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i]; // #6574 in case the inject object is observed...

      if (key === '__ob__') {
        continue;
      }

      var provideKey = inject[key].from;
      var source = vm;

      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break;
        }

        source = source.$parent;
      }

      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function' ? provideDefault.call(vm) : provideDefault;
        } else if ("development" !== 'production') {
          warn("Injection \"" + key + "\" not found", vm);
        }
      }
    }

    return result;
  }
}
/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */


function resolveSlots(children, context) {
  if (!children || !children.length) {
    return {};
  }

  var slots = {};

  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data; // remove slot attribute if the node is resolved as a Vue slot node

    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    } // named slots should only be respected if the vnode was rendered in the
    // same context.


    if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
      var name = data.slot;
      var slot = slots[name] || (slots[name] = []);

      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  } // ignore slots that contains only whitespace


  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }

  return slots;
}

function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === ' ';
}
/*  */


function normalizeScopedSlots(slots, normalSlots, prevSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;

  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized;
  } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots;
  } else {
    res = {};

    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  } // expose normal slots on scopedSlots


  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  } // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error


  if (slots && Object.isExtensible(slots)) {
    slots._normalized = res;
  }

  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res;
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res) ? [res] // single vnode
    : normalizeChildren(res);
    return res && (res.length === 0 || res.length === 1 && res[0].isComment // #9658
    ) ? undefined : res;
  }; // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.


  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }

  return normalized;
}

function proxyNormalSlot(slots, key) {
  return function () {
    return slots[key];
  };
}
/*  */

/**
 * Runtime helper for rendering v-for lists.
 */


function renderList(val, render) {
  var ret, i, l, keys, key;

  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);

    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);

    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();

      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);

      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }

  if (!isDef(ret)) {
    ret = [];
  }

  ret._isVList = true;
  return ret;
}
/*  */

/**
 * Runtime helper for rendering <slot>
 */


function renderSlot(name, fallback, props, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;

  if (scopedSlotFn) {
    // scoped slot
    props = props || {};

    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn('slot v-bind without argument expects an Object', this);
      }

      props = extend(extend({}, bindObject), props);
    }

    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;

  if (target) {
    return this.$createElement('template', {
      slot: target
    }, nodes);
  } else {
    return nodes;
  }
}
/*  */

/**
 * Runtime helper for resolving filters
 */


function resolveFilter(id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity;
}
/*  */


function isKeyNotMatch(expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */


function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;

  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
}
/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */


function bindObjectProps(data, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn('v-bind without argument expects an Object or Array value', this);
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }

      var hash;

      var loop = function (key) {
        if (key === 'class' || key === 'style' || isReservedAttribute(key)) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
        }

        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);

        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});

            on["update:" + key] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop(key);
    }
  }

  return data;
}
/*  */

/**
 * Runtime helper for rendering static trees.
 */


function renderStatic(index, isInFor) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index]; // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.

  if (tree && !isInFor) {
    return tree;
  } // otherwise, render a fresh tree.


  tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__" + index, false);
  return tree;
}
/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */


function markOnce(tree, index, key) {
  markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
  return tree;
}

function markStatic(tree, key, isOnce) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], key + "_" + i, isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
/*  */


function bindObjectListeners(data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn('v-on without argument expects an Object value', this);
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};

      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }

  return data;
}
/*  */


function resolveScopedSlots(fns, // see flow/vnode
res, // the following are added in 2.6
hasDynamicKeys, contentHashKey) {
  res = res || {
    $stable: !hasDynamicKeys
  };

  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];

    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }

      res[slot.key] = slot.fn;
    }
  }

  if (contentHashKey) {
    res.$key = contentHashKey;
  }

  return res;
}
/*  */


function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];

    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ("development" !== 'production' && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn("Invalid value for dynamic directive argument (expected string or null): " + key, this);
    }
  }

  return baseObj;
} // helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.


function prependModifier(value, symbol) {
  return typeof value === 'string' ? symbol + value : value;
}
/*  */


function installRenderHelpers(target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}
/*  */


function FunctionalRenderContext(data, props, children, parent, Ctor) {
  var this$1 = this;
  var options = Ctor.options; // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check

  var contextVm;

  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent); // $flow-disable-line

    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent; // $flow-disable-line

    parent = parent._original;
  }

  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);

  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
    }

    return this$1.$slots;
  };

  Object.defineProperty(this, 'scopedSlots', {
    enumerable: true,
    get: function get() {
      return normalizeScopedSlots(data.scopedSlots, this.slots());
    }
  }); // support for compiled functional template

  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options; // pre-resolve slots for renderSlot()

    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);

      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }

      return vnode;
    };
  } else {
    this._c = function (a, b, c, d) {
      return createElement(contextVm, a, b, c, d, needNormalization);
    };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;

  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) {
      mergeProps(props, data.attrs);
    }

    if (isDef(data.props)) {
      mergeProps(props, data.props);
    }
  }

  var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);

    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }

    return res;
  }
}

function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;

  if ("development" !== 'production') {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }

  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }

  return clone;
}

function mergeProps(to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}
/*  */

/*  */

/*  */

/*  */
// inline hooks to be invoked on component VNodes during patch


var componentVNodeHooks = {
  init: function init(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow

      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },
  prepatch: function prepatch(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(child, options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
    );
  },
  insert: function insert(vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }

    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  },
  destroy: function destroy(vnode) {
    var componentInstance = vnode.componentInstance;

    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true
        /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent(Ctor, data, context, children, tag) {
  if (isUndef(Ctor)) {
    return;
  }

  var baseCtor = context.$options._base; // plain options object: turn it into a constructor

  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  } // if at this stage it's not a constructor or an async component factory,
  // reject.


  if (typeof Ctor !== 'function') {
    if ("development" !== 'production') {
      warn("Invalid Component definition: " + String(Ctor), context);
    }

    return;
  } // async component


  var asyncFactory;

  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);

    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
    }
  }

  data = data || {}; // resolve constructor options in case global mixins are applied after
  // component constructor creation

  resolveConstructorOptions(Ctor); // transform component v-model data into props & events

  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  } // extract props


  var propsData = extractPropsFromVNodeData(data, Ctor, tag); // functional component

  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children);
  } // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners


  var listeners = data.on; // replace with listeners with .native modifier
  // so it gets processed during parent component patch.

  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot
    // work around flow
    var slot = data.slot;
    data = {};

    if (slot) {
      data.slot = slot;
    }
  } // install component management hooks onto the placeholder node


  installComponentHooks(data); // return a placeholder vnode

  var name = Ctor.options.name || tag;
  var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ''), data, undefined, undefined, undefined, context, {
    Ctor: Ctor,
    propsData: propsData,
    listeners: listeners,
    tag: tag,
    children: children
  }, asyncFactory);
  return vnode;
}

function createComponentInstanceForVnode(vnode, // we know it's MountedComponentVNode but flow doesn't
parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  }; // check inline-template render functions

  var inlineTemplate = vnode.data.inlineTemplate;

  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }

  return new vnode.componentOptions.Ctor(options);
}

function installComponentHooks(data) {
  var hooks = data.hook || (data.hook = {});

  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];

    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1(f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };

  merged._merged = true;
  return merged;
} // transform component v-model info (value and callback) into
// prop and event handler respectively.


function transformModel(options, data) {
  var prop = options.model && options.model.prop || 'value';
  var event = options.model && options.model.event || 'input';
  (data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;

  if (isDef(existing)) {
    if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
/*  */


var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2; // wrapper function for providing a more flexible interface
// without getting yelled at by flow

function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

function _createElement(context, tag, data, children, normalizationType) {
  if (isDef(data) && isDef(data.__ob__)) {
    "development" !== 'production' && warn("Avoid using observed data object as vnode data: " + JSON.stringify(data) + "\n" + 'Always create fresh vnode data objects in each render!', context);
    return createEmptyVNode();
  } // object syntax in v-bind


  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  } // warn against non-primitive key


  if ("development" !== 'production' && isDef(data) && isDef(data.key) && !isPrimitive(data.key)) {
    {
      warn('Avoid using non-primitive value as key, ' + 'use string/number value instead.', context);
    }
  } // support single function children as default scoped slot


  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = {
      default: children[0]
    };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  var vnode, ns;

  if (typeof tag === 'string') {
    var Ctor;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ("development" !== 'production' && isDef(data) && isDef(data.nativeOn)) {
        warn("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">.", context);
      }

      vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) {
      applyNS(vnode, ns);
    }

    if (isDef(data)) {
      registerDeepBindings(data);
    }

    return vnode;
  } else {
    return createEmptyVNode();
  }
}

function applyNS(vnode, ns, force) {
  vnode.ns = ns;

  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }

  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];

      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== 'svg')) {
        applyNS(child, ns, force);
      }
    }
  }
} // ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes


function registerDeepBindings(data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }

  if (isObject(data.class)) {
    traverse(data.class);
  }
}
/*  */


function initRender(vm) {
  vm._vnode = null; // the root of the child tree

  vm._staticTrees = null; // v-once cached trees

  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree

  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject; // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates

  vm._c = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, false);
  }; // normalization is always applied for the public version, used in
  // user-written render functions.


  vm.$createElement = function (a, b, c, d) {
    return createElement(vm, a, b, c, d, true);
  }; // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated


  var parentData = parentVnode && parentVnode.data;
  /* istanbul ignore else */

  if ("development" !== 'production') {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

var currentRenderingInstance = null;

function renderMixin(Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this);
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
    } // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.


    vm.$vnode = _parentVnode; // render self

    var vnode;

    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render"); // return error render result,
      // or previous vnode to prevent render error causing blank component

      /* istanbul ignore else */

      if ("development" !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    } // if the returned array contains only a single node, allow it


    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    } // return empty vnode in case the render function errored out


    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn('Multiple root nodes returned from render function. Render function ' + 'should return a single root node.', vm);
      }

      vnode = createEmptyVNode();
    } // set parent


    vnode.parent = _parentVnode;
    return vnode;
  };
}
/*  */


function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === 'Module') {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(factory, data, context, children, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = {
    data: data,
    context: context,
    children: children,
    tag: tag
  };
  return node;
}

function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  var owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null;
    owner.$on('hook:destroyed', function () {
      return remove(owners, owner);
    });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor); // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)

      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });
    var reject = once(function (reason) {
      "development" !== 'production' && warn("Failed to resolve async component: " + String(factory) + (reason ? "\nReason: " + reason : ''));

      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });
    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject("development" !== 'production' ? "timeout (" + res.timeout + "ms)" : null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false; // return in case resolved synchronously

    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
/*  */


function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
/*  */


function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];

      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
/*  */

/*  */


function initEvents(vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false; // init parent attached events

  var listeners = vm.$options._parentListeners;

  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add(event, fn) {
  target.$on(event, fn);
}

function remove$1(event, fn) {
  target.$off(event, fn);
}

function createOnceHandler(event, fn) {
  var _target = target;
  return function onceHandler() {
    var res = fn.apply(null, arguments);

    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}

function updateComponentListeners(vm, listeners, oldListeners) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin(Vue) {
  var hookRE = /^hook:/;

  Vue.prototype.$on = function (event, fn) {
    var vm = this;

    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn); // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup

      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }

    return vm;
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;

    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }

    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this; // all

    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm;
    } // array of events


    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }

      return vm;
    } // specific event


    var cbs = vm._events[event];

    if (!cbs) {
      return vm;
    }

    if (!fn) {
      vm._events[event] = null;
      return vm;
    } // specific handler


    var cb;
    var i = cbs.length;

    while (i--) {
      cb = cbs[i];

      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }

    return vm;
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;

    if ("development" !== 'production') {
      var lowerCaseEvent = event.toLowerCase();

      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip("Event \"" + lowerCaseEvent + "\" is emitted in component " + formatComponentName(vm) + " but the handler is registered for \"" + event + "\". " + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"" + hyphenate(event) + "\" instead of \"" + event + "\".");
      }
    }

    var cbs = vm._events[event];

    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";

      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }

    return vm;
  };
}
/*  */


var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  };
}

function initLifecycle(vm) {
  var options = vm.$options; // locate first non-abstract parent

  var parent = options.parent;

  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }

    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode; // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.

    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false
      /* removeOnly */
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }

    restoreActiveInstance(); // update __vue__ reference

    if (prevEl) {
      prevEl.__vue__ = null;
    }

    if (vm.$el) {
      vm.$el.__vue__ = vm;
    } // if parent is an HOC, update its $el as well


    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    } // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.

  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;

    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;

    if (vm._isBeingDestroyed) {
      return;
    }

    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true; // remove self from parent

    var parent = vm.$parent;

    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    } // teardown watchers


    if (vm._watcher) {
      vm._watcher.teardown();
    }

    var i = vm._watchers.length;

    while (i--) {
      vm._watchers[i].teardown();
    } // remove reference from data ob
    // frozen object may not have observer.


    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    } // call the last hook...


    vm._isDestroyed = true; // invoke destroy hooks on current rendered tree

    vm.__patch__(vm._vnode, null); // fire destroyed hook


    callHook(vm, 'destroyed'); // turn off all instance listeners.

    vm.$off(); // remove __vue__ reference

    if (vm.$el) {
      vm.$el.__vue__ = null;
    } // release circular reference (#6759)


    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent(vm, el, hydrating) {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;

    if ("development" !== 'production') {
      /* istanbul ignore if */
      if (vm.$options.template && vm.$options.template.charAt(0) !== '#' || vm.$options.el || el) {
        warn('You are using the runtime-only build of Vue where the template ' + 'compiler is not available. Either pre-compile the templates into ' + 'render functions, or use the compiler-included build.', vm);
      } else {
        warn('Failed to mount component: template or render function not defined.', vm);
      }
    }
  }

  callHook(vm, 'beforeMount');
  var updateComponent;
  /* istanbul ignore if */

  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;
      mark(startTag);

      var vnode = vm._render();

      mark(endTag);
      measure("vue " + name + " render", startTag, endTag);
      mark(startTag);

      vm._update(vnode, hydrating);

      mark(endTag);
      measure("vue " + name + " patch", startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  } // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined


  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true
  /* isRenderWatcher */
  );
  hydrating = false; // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook

  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}

function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  if ("development" !== 'production') {
    isUpdatingChildComponent = true;
  } // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.
  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.


  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key); // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.

  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode;
  }

  vm.$options._renderChildren = renderChildren; // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render

  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject; // update props

  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];

    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?

      props[key] = validateProp(key, propOptions, propsData, vm);
    }

    toggleObserving(true); // keep a copy of raw propsData

    vm.$options.propsData = propsData;
  } // update listeners


  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners); // resolve slots + force update if has children

  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if ("development" !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) {
      return true;
    }
  }

  return false;
}

function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;

    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }

  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;

    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'activated');
  }
}

function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;

    if (isInInactiveTree(vm)) {
      return;
    }
  }

  if (!vm._inactive) {
    vm._inactive = true;

    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }

    callHook(vm, 'deactivated');
  }
}

function callHook(vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";

  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }

  popTarget();
}
/*  */


var MAX_UPDATE_COUNT = 100;
var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;
/**
 * Reset the scheduler's state.
 */

function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};

  if ("development" !== 'production') {
    circular = {};
  }

  waiting = flushing = false;
} // Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.


var currentFlushTimestamp = 0; // Async edge case fix requires storing an event listener's attach timestamp.

var getNow = Date.now; // Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)

if (inBrowser && !isIE) {
  var performance = window.performance;

  if (performance && typeof performance.now === 'function' && getNow() > document.createEvent('Event').timeStamp) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () {
      return performance.now();
    };
  }
}
/**
 * Flush both queues and run the watchers.
 */


function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id; // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.

  queue.sort(function (a, b) {
    return a.id - b.id;
  }); // do not cache length because more watchers might be pushed
  // as we run existing watchers

  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];

    if (watcher.before) {
      watcher.before();
    }

    id = watcher.id;
    has[id] = null;
    watcher.run(); // in dev build, check and stop circular updates.

    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;

      if (circular[id] > MAX_UPDATE_COUNT) {
        warn('You may have an infinite update loop ' + (watcher.user ? "in watcher with expression \"" + watcher.expression + "\"" : "in a component render function."), watcher.vm);
        break;
      }
    }
  } // keep copies of post queues before resetting state


  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState(); // call component updated and activated hooks

  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue); // devtool hook

  /* istanbul ignore if */

  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks(queue) {
  var i = queue.length;

  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;

    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}
/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */


function queueActivatedComponent(vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks(queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true
    /* true */
    );
  }
}
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */


function queueWatcher(watcher) {
  var id = watcher.id;

  if (has[id] == null) {
    has[id] = true;

    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;

      while (i > index && queue[i].id > watcher.id) {
        i--;
      }

      queue.splice(i + 1, 0, watcher);
    } // queue the flush


    if (!waiting) {
      waiting = true;

      if ("development" !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }

      nextTick(flushSchedulerQueue);
    }
  }
}
/*  */


var uid$2 = 0;
/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */

var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
  this.vm = vm;

  if (isRenderWatcher) {
    vm._watcher = this;
  }

  vm._watchers.push(this); // options


  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }

  this.cb = cb;
  this.id = ++uid$2; // uid for batching

  this.active = true;
  this.dirty = this.lazy; // for lazy watchers

  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = "development" !== 'production' ? expOrFn.toString() : ''; // parse expression for getter

  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);

    if (!this.getter) {
      this.getter = noop;
      "development" !== 'production' && warn("Failed watching path: \"" + expOrFn + "\" " + 'Watcher only accepts simple dot-delimited paths. ' + 'For full control, use a function instead.', vm);
    }
  }

  this.value = this.lazy ? undefined : this.get();
};
/**
 * Evaluate the getter, and re-collect dependencies.
 */


Watcher.prototype.get = function get() {
  pushTarget(this);
  var value;
  var vm = this.vm;

  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, "getter for watcher \"" + this.expression + "\"");
    } else {
      throw e;
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
  }

  return value;
};
/**
 * Add a dependency to this directive.
 */


Watcher.prototype.addDep = function addDep(dep) {
  var id = dep.id;

  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);

    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};
/**
 * Clean up for dependency collection.
 */


Watcher.prototype.cleanupDeps = function cleanupDeps() {
  var i = this.deps.length;

  while (i--) {
    var dep = this.deps[i];

    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }

  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};
/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */


Watcher.prototype.update = function update() {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};
/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */


Watcher.prototype.run = function run() {
  if (this.active) {
    var value = this.get();

    if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
    // when the value is the same, because the value may
    // have mutated.
    isObject(value) || this.deep) {
      // set new value
      var oldValue = this.value;
      this.value = value;

      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, "callback for watcher \"" + this.expression + "\"");
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};
/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */


Watcher.prototype.evaluate = function evaluate() {
  this.value = this.get();
  this.dirty = false;
};
/**
 * Depend on all deps collected by this watcher.
 */


Watcher.prototype.depend = function depend() {
  var i = this.deps.length;

  while (i--) {
    this.deps[i].depend();
  }
};
/**
 * Remove self from all dependencies' subscriber list.
 */


Watcher.prototype.teardown = function teardown() {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }

    var i = this.deps.length;

    while (i--) {
      this.deps[i].removeSub(this);
    }

    this.active = false;
  }
};
/*  */


var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy(target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };

  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState(vm) {
  vm._watchers = [];
  var opts = vm.$options;

  if (opts.props) {
    initProps(vm, opts.props);
  }

  if (opts.methods) {
    initMethods(vm, opts.methods);
  }

  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true
    /* asRootData */
    );
  }

  if (opts.computed) {
    initComputed(vm, opts.computed);
  }

  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {}; // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.

  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent; // root instance props should be converted

  if (!isRoot) {
    toggleObserving(false);
  }

  var loop = function (key) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */

    if ("development" !== 'production') {
      var hyphenatedKey = hyphenate(key);

      if (isReservedAttribute(hyphenatedKey) || config.isReservedAttr(hyphenatedKey)) {
        warn("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop.", vm);
      }

      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn("Avoid mutating a prop directly since the value will be " + "overwritten whenever the parent component re-renders. " + "Instead, use a data or computed property based on the prop's " + "value. Prop being mutated: \"" + key + "\"", vm);
        }
      });
    } else {
      defineReactive$$1(props, key, value);
    } // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.


    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop(key);

  toggleObserving(true);
}

function initData(vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? getData(data, vm) : data || {};

  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn('data functions should return an object:\n' + 'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function', vm);
  } // proxy data on instance


  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;

  while (i--) {
    var key = keys[i];

    if ("development" !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn("Method \"" + key + "\" has already been defined as a data property.", vm);
      }
    }

    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn("The data property \"" + key + "\" is already declared as a prop. " + "Use prop default value instead.", vm);
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  } // observe data


  observe(data, true
  /* asRootData */
  );
}

function getData(data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();

  try {
    return data.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = {
  lazy: true
};

function initComputed(vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null); // computed properties are just getters during SSR

  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;

    if ("development" !== 'production' && getter == null) {
      warn("Getter is missing for computed property \"" + key + "\".", vm);
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    } // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.


    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if ("development" !== 'production') {
      if (key in vm.$data) {
        warn("The computed property \"" + key + "\" is already defined in data.", vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn("The computed property \"" + key + "\" is already defined as a prop.", vm);
      }
    }
  }
}

function defineComputed(target, key, userDef) {
  var shouldCache = !isServerRendering();

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }

  if ("development" !== 'production' && sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn("Computed property \"" + key + "\" was assigned to but it has no setter.", this);
    };
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }

      if (Dep.target) {
        watcher.depend();
      }

      return watcher.value;
    }
  };
}

function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}

function initMethods(vm, methods) {
  var props = vm.$options.props;

  for (var key in methods) {
    if ("development" !== 'production') {
      if (typeof methods[key] !== 'function') {
        warn("Method \"" + key + "\" has type \"" + typeof methods[key] + "\" in the component definition. " + "Did you reference the function correctly?", vm);
      }

      if (props && hasOwn(props, key)) {
        warn("Method \"" + key + "\" has already been defined as a prop.", vm);
      }

      if (key in vm && isReserved(key)) {
        warn("Method \"" + key + "\" conflicts with an existing Vue instance method. " + "Avoid defining component methods that start with _ or $.");
      }
    }

    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch(vm, watch) {
  for (var key in watch) {
    var handler = watch[key];

    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }

  if (typeof handler === 'string') {
    handler = vm[handler];
  }

  return vm.$watch(expOrFn, handler, options);
}

function stateMixin(Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};

  dataDef.get = function () {
    return this._data;
  };

  var propsDef = {};

  propsDef.get = function () {
    return this._props;
  };

  if ("development" !== 'production') {
    dataDef.set = function () {
      warn('Avoid replacing instance root $data. ' + 'Use nested data properties instead.', this);
    };

    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }

  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);
  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (expOrFn, cb, options) {
    var vm = this;

    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }

    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);

    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, "callback for immediate watcher \"" + watcher.expression + "\"");
      }
    }

    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
/*  */


var uid$3 = 0;

function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    var vm = this; // a uid

    vm._uid = uid$3++;
    var startTag, endTag;
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + vm._uid;
      endTag = "vue-perf-end:" + vm._uid;
      mark(startTag);
    } // a flag to avoid this being observed


    vm._isVue = true; // merge options

    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    /* istanbul ignore else */


    if ("development" !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    } // expose real self


    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props

    initState(vm);
    initProvide(vm); // resolve provide after data/props

    callHook(vm, 'created');
    /* istanbul ignore if */

    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure("vue " + vm._name + " init", startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options); // doing this because it's faster than dynamic enumeration.

  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;

  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;

    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions; // check if there are any late-modified/attached options (#4976)

      var modifiedOptions = resolveModifiedOptions(Ctor); // update base extend options

      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }

      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);

      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }

  return options;
}

function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;

  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) {
        modified = {};
      }

      modified[key] = latest[key];
    }
  }

  return modified;
}

function Vue(options) {
  if ("development" !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }

  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);
/*  */

function initUse(Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);

    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    } // additional parameters


    var args = toArray(arguments, 1);
    args.unshift(this);

    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }

    installedPlugins.push(plugin);
    return this;
  };
}
/*  */


function initMixin$1(Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
/*  */


function initExtend(Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;
  /**
   * Class inheritance
   */

  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }

    var name = extendOptions.name || Super.options.name;

    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent(options) {
      this._init(options);
    };

    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub['super'] = Super; // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.

    if (Sub.options.props) {
      initProps$1(Sub);
    }

    if (Sub.options.computed) {
      initComputed$1(Sub);
    } // allow further extension/mixin/plugin usage


    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use; // create asset registers, so extended classes
    // can have their private assets too.

    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    }); // enable recursive self-lookup

    if (name) {
      Sub.options.components[name] = Sub;
    } // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.


    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options); // cache constructor

    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}

function initProps$1(Comp) {
  var props = Comp.options.props;

  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1(Comp) {
  var computed = Comp.options.computed;

  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
/*  */


function initAssetRegisters(Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (id, definition) {
      if (!definition) {
        return this.options[type + 's'][id];
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }

        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }

        if (type === 'directive' && typeof definition === 'function') {
          definition = {
            bind: definition,
            update: definition
          };
        }

        this.options[type + 's'][id] = definition;
        return definition;
      }
    };
  });
}
/*  */


function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  /* istanbul ignore next */


  return false;
}

function pruneCache(keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;

  for (var key in cache) {
    var cachedNode = cache[key];

    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);

      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry(cache, key, keys, current) {
  var cached$$1 = cache[key];

  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }

  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: 'keep-alive',
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  created: function created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  destroyed: function destroyed() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function mounted() {
    var this$1 = this;
    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) {
        return matches(val, name);
      });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) {
        return !matches(val, name);
      });
    });
  },
  render: function render() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;

      if ( // not included
      include && (!name || !matches(include, name)) || // excluded
      exclude && name && matches(exclude, name)) {
        return vnode;
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null // same constructor may get registered as different local components
      // so cid alone is not enough (#3269)
      ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : '') : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance; // make current key freshest

        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key); // prune oldest entry

        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive: KeepAlive
};
/*  */

function initGlobalAPI(Vue) {
  // config
  var configDef = {};

  configDef.get = function () {
    return config;
  };

  if ("development" !== 'production') {
    configDef.set = function () {
      warn('Do not replace the Vue.config object, set individual fields instead.');
    };
  }

  Object.defineProperty(Vue, 'config', configDef); // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.

  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };
  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick; // 2.6 explicit observable API

  Vue.observable = function (obj) {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  }); // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.

  Vue.options._base = Vue;
  extend(Vue.options.components, builtInComponents);
  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  }
}); // expose FunctionalRenderContext for ssr runtime helper installation

Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});
Vue.version = '2.6.11';
/*  */
// these are reserved for web because they are directly compiled away
// during template compilation

var isReservedAttr = makeMap('style,class'); // attributes that should be using props for binding

var acceptValue = makeMap('input,textarea,option,select,progress');

var mustUseProp = function (tag, type, attr) {
  return attr === 'value' && acceptValue(tag) && type !== 'button' || attr === 'selected' && tag === 'option' || attr === 'checked' && tag === 'input' || attr === 'muted' && tag === 'video';
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
var isValidContentEditableValue = makeMap('events,caret,typing,plaintext-only');

var convertEnumeratedValue = function (key, value) {
  return isFalsyAttrValue(value) || value === 'false' ? 'false' // allow arbitrary string value for contenteditable
  : key === 'contenteditable' && isValidContentEditableValue(value) ? value : 'true';
};

var isBooleanAttr = makeMap('allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' + 'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' + 'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' + 'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' + 'required,reversed,scoped,seamless,selected,sortable,translate,' + 'truespeed,typemustmatch,visible');
var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink';
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : '';
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false;
};
/*  */


function genClassForVnode(vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;

  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;

    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }

  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }

  return renderClass(data.staticClass, data.class);
}

function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}

function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  /* istanbul ignore next */


  return '';
}

function concat(a, b) {
  return a ? b ? a + ' ' + b : a : b || '';
}

function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }

  if (isObject(value)) {
    return stringifyObject(value);
  }

  if (typeof value === 'string') {
    return value;
  }
  /* istanbul ignore next */


  return '';
}

function stringifyArray(value) {
  var res = '';
  var stringified;

  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) {
        res += ' ';
      }

      res += stringified;
    }
  }

  return res;
}

function stringifyObject(value) {
  var res = '';

  for (var key in value) {
    if (value[key]) {
      if (res) {
        res += ' ';
      }

      res += key;
    }
  }

  return res;
}
/*  */


var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};
var isHTMLTag = makeMap('html,body,base,head,link,meta,style,title,' + 'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' + 'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' + 'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' + 's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' + 'embed,object,param,source,canvas,script,noscript,del,ins,' + 'caption,col,colgroup,table,thead,tbody,td,th,tr,' + 'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' + 'output,progress,select,textarea,' + 'details,dialog,menu,menuitem,summary,' + 'content,element,shadow,template,blockquote,iframe,tfoot'); // this map is intentionally selective, only covering SVG elements that may
// contain child elements.

var isSVG = makeMap('svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' + 'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' + 'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view', true);

var isPreTag = function (tag) {
  return tag === 'pre';
};

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag);
};

function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return 'svg';
  } // basic support for MathML
  // note it doesn't support other MathML elements being component roots


  if (tag === 'math') {
    return 'math';
  }
}

var unknownElementCache = Object.create(null);

function isUnknownElement(tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true;
  }

  if (isReservedTag(tag)) {
    return false;
  }

  tag = tag.toLowerCase();
  /* istanbul ignore if */

  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }

  var el = document.createElement(tag);

  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');
/*  */

/**
 * Query an element selector if it's not an element already.
 */

function query(el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);

    if (!selected) {
      "development" !== 'production' && warn('Cannot find element: ' + el);
      return document.createElement('div');
    }

    return selected;
  } else {
    return el;
  }
}
/*  */


function createElement$1(tagName, vnode) {
  var elm = document.createElement(tagName);

  if (tagName !== 'select') {
    return elm;
  } // false or null will remove the attribute but undefined will not


  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }

  return elm;
}

function createElementNS(namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName);
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createComment(text) {
  return document.createComment(text);
}

function insertBefore(parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild(node, child) {
  node.removeChild(child);
}

function appendChild(node, child) {
  node.appendChild(child);
}

function parentNode(node) {
  return node.parentNode;
}

function nextSibling(node) {
  return node.nextSibling;
}

function tagName(node) {
  return node.tagName;
}

function setTextContent(node, text) {
  node.textContent = text;
}

function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, '');
}

var nodeOps = /*#__PURE__*/Object.freeze({
  createElement: createElement$1,
  createElementNS: createElementNS,
  createTextNode: createTextNode,
  createComment: createComment,
  insertBefore: insertBefore,
  removeChild: removeChild,
  appendChild: appendChild,
  parentNode: parentNode,
  nextSibling: nextSibling,
  tagName: tagName,
  setTextContent: setTextContent,
  setStyleScope: setStyleScope
});
/*  */

var ref = {
  create: function create(_, vnode) {
    registerRef(vnode);
  },
  update: function update(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy(vnode) {
    registerRef(vnode, true);
  }
};

function registerRef(vnode, isRemoval) {
  var key = vnode.data.ref;

  if (!isDef(key)) {
    return;
  }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;

  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}
/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */


var emptyNode = new VNode('', {}, []);
var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode(a, b) {
  return a.key === b.key && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && a.asyncFactory === b.asyncFactory && isUndef(b.asyncFactory.error));
}

function sameInputType(a, b) {
  if (a.tag !== 'input') {
    return true;
  }

  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}

function createKeyToOldIdx(children, beginIdx, endIdx) {
  var i, key;
  var map = {};

  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;

    if (isDef(key)) {
      map[key] = i;
    }
  }

  return map;
}

function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];

    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt(elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
  }

  function createRmCb(childElm, listeners) {
    function remove$$1() {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }

    remove$$1.listeners = listeners;
    return remove$$1;
  }

  function removeNode(el) {
    var parent = nodeOps.parentNode(el); // element may have already been removed due to v-html / v-text

    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1(vnode, inVPre) {
    return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some(function (ignore) {
      return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
    })) && config.isUnknownElement(vnode.tag);
  }

  var creatingElmInVPre = 0;

  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check

    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;

    if (isDef(tag)) {
      if ("development" !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }

        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly? For recursive components, ' + 'make sure to provide the "name" option.', vnode.context);
        }
      }

      vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
      setScope(vnode);
      /* istanbul ignore if */

      {
        createChildren(vnode, children, insertedVnodeQueue);

        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }

        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;

    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;

      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false
        /* hydrating */
        );
      } // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.


      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);

        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }

        return true;
      }
    }
  }

  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }

    vnode.elm = vnode.componentInstance.$el;

    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode); // make sure to invoke the insert hook

      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i; // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.

    var innerNode = vnode;

    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;

      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }

        insertedVnodeQueue.push(innerNode);
        break;
      }
    } // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself


    insert(parentElm, vnode.elm, refElm);
  }

  function insert(parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (nodeOps.parentNode(ref$$1) === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren(vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if ("development" !== 'production') {
        checkDuplicateKeys(children);
      }

      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }

    return isDef(vnode.tag);
  }

  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }

    i = vnode.data.hook; // Reuse variable

    if (isDef(i)) {
      if (isDef(i.create)) {
        i.create(emptyNode, vnode);
      }

      if (isDef(i.insert)) {
        insertedVnodeQueue.push(vnode);
      }
    }
  } // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.


  function setScope(vnode) {
    var i;

    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;

      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }

        ancestor = ancestor.parent;
      }
    } // for slot content they should also get the scopeId from the host instance.


    if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook(vnode) {
    var i, j;
    var data = vnode.data;

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) {
        i(vnode);
      }

      for (i = 0; i < cbs.destroy.length; ++i) {
        cbs.destroy[i](vnode);
      }
    }

    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];

      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;

      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } // recursively invoke hooks on child component root node


      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }

      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }

      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm; // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions

    var canMove = !removeOnly;

    if ("development" !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);

        if (isUndef(idxInOld)) {
          // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];

          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }

        newStartVnode = newCh[++newStartIdx];
      }
    }

    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys(children) {
    var seenKeys = {};

    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;

      if (isDef(key)) {
        if (seenKeys[key]) {
          warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld(node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];

      if (isDef(c) && sameVnode(node, c)) {
        return i;
      }
    }
  }

  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }

    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // clone reused vnode
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }

      return;
    } // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.


    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }

    var i;
    var data = vnode.data;

    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;

    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) {
        cbs.update[i](oldVnode, vnode);
      }

      if (isDef(i = data.hook) && isDef(i = i.update)) {
        i(oldVnode, vnode);
      }
    }

    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) {
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
        }
      } else if (isDef(ch)) {
        if ("development" !== 'production') {
          checkDuplicateKeys(ch);
        }

        if (isDef(oldVnode.text)) {
          nodeOps.setTextContent(elm, '');
        }

        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
        i(oldVnode, vnode);
      }
    }
  }

  function invokeInsertHook(vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false; // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).

  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key'); // Note: this is a browser-only function so we can assume elms are DOM nodes.

  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || data && data.pre;
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    } // assert node match


    if ("development" !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false;
      }
    }

    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) {
        i(vnode, true
        /* hydrating */
        );
      }

      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }

    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }

              return false;
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;

            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }

              childNode = childNode.nextSibling;
            } // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.


            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' && typeof console !== 'undefined' && !hydrationBailed) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }

              return false;
            }
          }
        }
      }

      if (isDef(data)) {
        var fullInvoke = false;

        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }

        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }

    return true;
  }

  function assertNodeMatch(node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3);
    }
  }

  return function patch(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) {
        invokeDestroyHook(oldVnode);
      }

      return;
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);

      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }

          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            } else if ("development" !== 'production') {
              warn('The client-side rendered virtual DOM tree is not matching ' + 'server-rendered content. This is likely caused by incorrect ' + 'HTML markup, for example nesting block-level elements inside ' + '<p>, or missing <tbody>. Bailing hydration and performing ' + 'full client-side render.');
            }
          } // either not server-rendered, or hydration failed.
          // create an empty node and replace it


          oldVnode = emptyNodeAt(oldVnode);
        } // replacing existing element


        var oldElm = oldVnode.elm;
        var parentElm = nodeOps.parentNode(oldElm); // create new node

        createElm(vnode, insertedVnodeQueue, // extremely rare edge case: do not insert if old element is in a
        // leaving transition. Only happens when combining transition +
        // keep-alive + HOCs. (#4590)
        oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm)); // update parent placeholder node element, recursively

        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);

          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }

            ancestor.elm = vnode.elm;

            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              } // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.


              var insert = ancestor.data.hook.insert;

              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }

            ancestor = ancestor.parent;
          }
        } // destroy old node


        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
/*  */


var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;

  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];

    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);

      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook$1(dir, 'update', vnode, oldVnode);

      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };

    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1(dirs, vm) {
  var res = Object.create(null);

  if (!dirs) {
    // $flow-disable-line
    return res;
  }

  var i, dir;

  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];

    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }

    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  } // $flow-disable-line


  return res;
}

function getRawDirName(dir) {
  return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join('.');
}

function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];

  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
    }
  }
}

var baseModules = [ref, directives];
/*  */

function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;

  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }

  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }

  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];

    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  } // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max

  /* istanbul ignore if */


  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }

  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr(el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED' ? 'true' : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.

    /* istanbul ignore if */
    if (isIE && !isIE9 && el.tagName === 'TEXTAREA' && key === 'placeholder' && value !== '' && !el.__ieph) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };

      el.addEventListener('input', blocker); // $flow-disable-line

      el.__ieph = true;
      /* IE placeholder patched */
    }

    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
/*  */

function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }

  var cls = genClassForVnode(vnode); // handle transition classes

  var transitionClass = el._transitionClasses;

  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  } // set the class


  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};
/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters(exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);

    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) {
        inSingle = false;
      }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) {
        inDouble = false;
      }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) {
        inTemplateString = false;
      }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) {
        inRegex = false;
      }
    } else if (c === 0x7C && // pipe
    exp.charCodeAt(i + 1) !== 0x7C && exp.charCodeAt(i - 1) !== 0x7C && !curly && !square && !paren) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22:
          inDouble = true;
          break;
        // "

        case 0x27:
          inSingle = true;
          break;
        // '

        case 0x60:
          inTemplateString = true;
          break;
        // `

        case 0x28:
          paren++;
          break;
        // (

        case 0x29:
          paren--;
          break;
        // )

        case 0x5B:
          square++;
          break;
        // [

        case 0x5D:
          square--;
          break;
        // ]

        case 0x7B:
          curly++;
          break;
        // {

        case 0x7D:
          curly--;
          break;
        // }
      }

      if (c === 0x2f) {
        // /
        var j = i - 1;
        var p = void 0; // find first non-whitespace prev char

        for (; j >= 0; j--) {
          p = exp.charAt(j);

          if (p !== ' ') {
            break;
          }
        }

        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter() {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression;
}

function wrapFilter(exp, filter) {
  var i = filter.indexOf('(');

  if (i < 0) {
    // _f: resolveFilter
    return "_f(\"" + filter + "\")(" + exp + ")";
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return "_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args);
  }
}
/*  */

/* eslint-disable no-unused-vars */


function baseWarn(msg, range) {
  console.error("[Vue compiler]: " + msg);
}
/* eslint-enable no-unused-vars */


function pluckModuleFunction(modules, key) {
  return modules ? modules.map(function (m) {
    return m[key];
  }).filter(function (_) {
    return _;
  }) : [];
}

function addProp(el, name, value, range, dynamic) {
  (el.props || (el.props = [])).push(rangeSetItem({
    name: name,
    value: value,
    dynamic: dynamic
  }, range));
  el.plain = false;
}

function addAttr(el, name, value, range, dynamic) {
  var attrs = dynamic ? el.dynamicAttrs || (el.dynamicAttrs = []) : el.attrs || (el.attrs = []);
  attrs.push(rangeSetItem({
    name: name,
    value: value,
    dynamic: dynamic
  }, range));
  el.plain = false;
} // add a raw attr (use this in preTransforms)


function addRawAttr(el, name, value, range) {
  el.attrsMap[name] = value;
  el.attrsList.push(rangeSetItem({
    name: name,
    value: value
  }, range));
}

function addDirective(el, name, rawName, value, arg, isDynamicArg, modifiers, range) {
  (el.directives || (el.directives = [])).push(rangeSetItem({
    name: name,
    rawName: rawName,
    value: value,
    arg: arg,
    isDynamicArg: isDynamicArg,
    modifiers: modifiers
  }, range));
  el.plain = false;
}

function prependModifierMarker(symbol, name, dynamic) {
  return dynamic ? "_p(" + name + ",\"" + symbol + "\")" : symbol + name; // mark the event as captured
}

function addHandler(el, name, value, modifiers, important, warn, range, dynamic) {
  modifiers = modifiers || emptyObject; // warn prevent and passive modifier

  /* istanbul ignore if */

  if ("development" !== 'production' && warn && modifiers.prevent && modifiers.passive) {
    warn('passive and prevent can\'t be used together. ' + 'Passive handler can\'t prevent default event.', range);
  } // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.


  if (modifiers.right) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'contextmenu':(" + name + ")";
    } else if (name === 'click') {
      name = 'contextmenu';
      delete modifiers.right;
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = "(" + name + ")==='click'?'mouseup':(" + name + ")";
    } else if (name === 'click') {
      name = 'mouseup';
    }
  } // check capture modifier


  if (modifiers.capture) {
    delete modifiers.capture;
    name = prependModifierMarker('!', name, dynamic);
  }

  if (modifiers.once) {
    delete modifiers.once;
    name = prependModifierMarker('~', name, dynamic);
  }
  /* istanbul ignore if */


  if (modifiers.passive) {
    delete modifiers.passive;
    name = prependModifierMarker('&', name, dynamic);
  }

  var events;

  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = rangeSetItem({
    value: value.trim(),
    dynamic: dynamic
  }, range);

  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */

  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getRawBindingAttr(el, name) {
  return el.rawAttrsMap[':' + name] || el.rawAttrsMap['v-bind:' + name] || el.rawAttrsMap[name];
}

function getBindingAttr(el, name, getStatic) {
  var dynamicValue = getAndRemoveAttr(el, ':' + name) || getAndRemoveAttr(el, 'v-bind:' + name);

  if (dynamicValue != null) {
    return parseFilters(dynamicValue);
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);

    if (staticValue != null) {
      return JSON.stringify(staticValue);
    }
  }
} // note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.


function getAndRemoveAttr(el, name, removeFromMap) {
  var val;

  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;

    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break;
      }
    }
  }

  if (removeFromMap) {
    delete el.attrsMap[name];
  }

  return val;
}

function getAndRemoveAttrByRegex(el, name) {
  var list = el.attrsList;

  for (var i = 0, l = list.length; i < l; i++) {
    var attr = list[i];

    if (name.test(attr.name)) {
      list.splice(i, 1);
      return attr;
    }
  }
}

function rangeSetItem(item, range) {
  if (range) {
    if (range.start != null) {
      item.start = range.start;
    }

    if (range.end != null) {
      item.end = range.end;
    }
  }

  return item;
}
/*  */

/**
 * Cross-platform code generation for component v-model
 */


function genComponentModel(el, value, modifiers) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;
  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;

  if (trim) {
    valueExpression = "(typeof " + baseValueExpression + " === 'string'" + "? " + baseValueExpression + ".trim()" + ": " + baseValueExpression + ")";
  }

  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var assignment = genAssignmentCode(value, valueExpression);
  el.model = {
    value: "(" + value + ")",
    expression: JSON.stringify(value),
    callback: "function (" + baseValueExpression + ") {" + assignment + "}"
  };
}
/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */


function genAssignmentCode(value, assignment) {
  var res = parseModel(value);

  if (res.key === null) {
    return value + "=" + assignment;
  } else {
    return "$set(" + res.exp + ", " + res.key + ", " + assignment + ")";
  }
}
/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */


var len, str, chr, index$1, expressionPos, expressionEndPos;

function parseModel(val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');

    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      };
    } else {
      return {
        exp: val,
        key: null
      };
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */

    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  };
}

function next() {
  return str.charCodeAt(++index$1);
}

function eof() {
  return index$1 >= len;
}

function isStringStart(chr) {
  return chr === 0x22 || chr === 0x27;
}

function parseBracket(chr) {
  var inBracket = 1;
  expressionPos = index$1;

  while (!eof()) {
    chr = next();

    if (isStringStart(chr)) {
      parseString(chr);
      continue;
    }

    if (chr === 0x5B) {
      inBracket++;
    }

    if (chr === 0x5D) {
      inBracket--;
    }

    if (inBracket === 0) {
      expressionEndPos = index$1;
      break;
    }
  }
}

function parseString(chr) {
  var stringQuote = chr;

  while (!eof()) {
    chr = next();

    if (chr === stringQuote) {
      break;
    }
  }
}
/*  */


var warn$1; // in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.

var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model(el, dir, _warn) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if ("development" !== 'production') {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1("<" + el.tag + " v-model=\"" + value + "\" type=\"file\">:\n" + "File inputs are read only. Use a v-on:change listener instead.", el.rawAttrsMap['v-model']);
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers); // component v-model doesn't need extra runtime

    return false;
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers); // component v-model doesn't need extra runtime

    return false;
  } else if ("development" !== 'production') {
    warn$1("<" + el.tag + " v-model=\"" + value + "\">: " + "v-model is not supported on this element type. " + 'If you are working with contenteditable, it\'s recommended to ' + 'wrap a library dedicated for that purpose inside a custom component.', el.rawAttrsMap['v-model']);
  } // ensure runtime directive metadata


  return true;
}

function genCheckboxModel(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked', "Array.isArray(" + value + ")" + "?_i(" + value + "," + valueBinding + ")>-1" + (trueValueBinding === 'true' ? ":(" + value + ")" : ":_q(" + value + "," + trueValueBinding + ")"));
  addHandler(el, 'change', "var $$a=" + value + "," + '$$el=$event.target,' + "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" + 'if(Array.isArray($$a)){' + "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," + '$$i=_i($$a,$$v);' + "if($$el.checked){$$i<0&&(" + genAssignmentCode(value, '$$a.concat([$$v])') + ")}" + "else{$$i>-1&&(" + genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))') + ")}" + "}else{" + genAssignmentCode(value, '$$c') + "}", null, true);
}

function genRadioModel(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? "_n(" + valueBinding + ")" : valueBinding;
  addProp(el, 'checked', "_q(" + value + "," + valueBinding + ")");
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect(el, value, modifiers) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" + ".call($event.target.options,function(o){return o.selected})" + ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" + "return " + (number ? '_n(val)' : 'val') + "})";
  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + genAssignmentCode(value, assignment);
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel(el, value, modifiers) {
  var type = el.attrsMap.type; // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type

  if ("development" !== 'production') {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];

    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " + 'because the latter already expands to a value binding internally', el.rawAttrsMap[binding]);
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input';
  var valueExpression = '$event.target.value';

  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }

  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);

  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', "(" + value + ")");
  addHandler(el, event, code, null, true);

  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}
/*  */
// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.


function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  } // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4

  /* istanbul ignore if */


  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler$1(event, handler, capture) {
  var _target = target$1; // save current target element in closure

  return function onceHandler() {
    var res = handler.apply(null, arguments);

    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  };
} // #9446: Firefox <= 53 (in particular, ESR 52) has incorrect Event.timeStamp
// implementation and does not fire microtasks in between event propagation, so
// safe to exclude.


var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);

function add$1(name, handler, capture, passive) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    var attachedTimestamp = currentFlushTimestamp;
    var original = handler;

    handler = original._wrapper = function (e) {
      if ( // no bubbling, should always fire.
      // this is just a safety net in case event.timeStamp is unreliable in
      // certain weird environments...
      e.target === e.currentTarget || // event is fired after handler attachment
      e.timeStamp >= attachedTimestamp || // bail for environments that have buggy event.timeStamp implementations
      // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
      // #9681 QtWebEngine event.timeStamp is negative value
      e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
      // electron/nw.js app, since event.timeStamp will be using a different
      // starting reference
      e.target.ownerDocument !== document) {
        return original.apply(this, arguments);
      }
    };
  }

  target$1.addEventListener(name, handler, supportsPassive ? {
    capture: capture,
    passive: passive
  } : capture);
}

function remove$2(name, handler, capture, _target) {
  (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
}

function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }

  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};
/*  */

var svgContainer;

function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }

  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {}; // clone observed objects, as the user probably wants to mutate it

  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (!(key in props)) {
      elm[key] = '';
    }
  }

  for (key in props) {
    cur = props[key]; // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)

    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) {
        vnode.children.length = 0;
      }

      if (cur === oldProps[key]) {
        continue;
      } // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property


      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value' && elm.tagName !== 'PROGRESS') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur; // avoid resetting cursor position when value is the same

      var strCur = isUndef(cur) ? '' : String(cur);

      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === 'innerHTML' && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      // IE doesn't support innerHTML for SVG elements
      svgContainer = svgContainer || document.createElement('div');
      svgContainer.innerHTML = "<svg>" + cur + "</svg>";
      var svg = svgContainer.firstChild;

      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }

      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if ( // skip the update if old and new VDOM state is the same.
    // `value` is handled separately because the DOM value may be temporarily
    // out of sync with VDOM state due to focus, composition and modifiers.
    // This  #4521 by skipping the unnecesarry `checked` update.
    cur !== oldProps[key]) {
      // some property updates can throw
      // e.g. `value` on <progress> w/ non-finite value
      try {
        elm[key] = cur;
      } catch (e) {}
    }
  }
} // check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue(elm, checkVal) {
  return !elm.composing && (elm.tagName === 'OPTION' || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
}

function isNotInFocusAndDirty(elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true; // #6157
  // work around IE bug when accessing document.activeElement in an iframe

  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {}

  return notInFocus && elm.value !== checkVal;
}

function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime

  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }

    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }

  return value !== newVal;
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
}); // merge static and dynamic style data on the same vnode

function normalizeStyleData(data) {
  var style = normalizeStyleBinding(data.style); // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it

  return data.staticStyle ? extend(data.staticStyle, style) : style;
} // normalize possible array / string values into Object


function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }

  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle);
  }

  return bindingStyle;
}
/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */


function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;

    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;

      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if (styleData = normalizeStyleData(vnode.data)) {
    extend(res, styleData);
  }

  var parentNode = vnode;

  while (parentNode = parentNode.parent) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }

  return res;
}
/*  */


var cssVarRE = /^--/;
var importantRE = /\s*!important$/;

var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name), val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);

    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];
var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);

  if (prop !== 'filter' && prop in emptyStyle) {
    return prop;
  }

  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);

  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;

    if (name in emptyStyle) {
      return name;
    }
  }
});

function updateStyle(oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {}; // if static style exists, stylebinding already merged into it when doing normalizeStyleData

  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style = normalizeStyleBinding(vnode.data.style) || {}; // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.

  vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }

  for (name in newStyle) {
    cur = newStyle[name];

    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};
/*  */

var whitespaceRE = /\s+/;
/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */

function addClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";

    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}
/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */


function removeClass(el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  /* istanbul ignore else */


  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(whitespaceRE).forEach(function (c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }

    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';

    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }

    cur = cur.trim();

    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}
/*  */


function resolveTransition(def$$1) {
  if (!def$$1) {
    return;
  }
  /* istanbul ignore else */


  if (typeof def$$1 === 'object') {
    var res = {};

    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }

    extend(res, def$$1);
    return res;
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1);
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: name + "-enter",
    enterToClass: name + "-enter-to",
    enterActiveClass: name + "-enter-active",
    leaveClass: name + "-leave",
    leaveToClass: name + "-leave-to",
    leaveActiveClass: name + "-leave-active"
  };
});
var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation'; // Transition property/event sniffing

var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';

if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }

  if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
} // binding to window is necessary to make hot reload work in IE in strict mode


var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout :
/* istanbul ignore next */
function (fn) {
  return fn();
};

function nextFrame(fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);

  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }

  removeClass(el, cls);
}

function whenTransitionEnds(el, expectedType, cb) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;

  if (!type) {
    return cb();
  }

  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;

  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };

  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };

  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el); // JSDOM may return undefined for transition properties

  var transitionDelays = (styles[transitionProp + 'Delay'] || '').split(', ');
  var transitionDurations = (styles[transitionProp + 'Duration'] || '').split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + 'Delay'] || '').split(', ');
  var animationDurations = (styles[animationProp + 'Duration'] || '').split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */

  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }

  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  };
}

function getTimeout(delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
} // Old versions of Chromium (below 61.0.3163.100) formats floating pointer numbers
// in a locale-dependent way, using a comma instead of a dot.
// If comma is not replaced with a dot, the input will be rounded down (i.e. acting
// as a floor function) causing unexpected behaviors


function toMs(s) {
  return Number(s.slice(0, -1).replace(',', '.')) * 1000;
}
/*  */


function enter(vnode, toggleDisplay) {
  var el = vnode.elm; // call leave callback now

  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;

    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data)) {
    return;
  }
  /* istanbul ignore if */


  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration; // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.

  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;

  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return;
  }

  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? typeof appear === 'function' ? appear : enter : enter;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }

      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }

    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];

      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }

      enterHook && enterHook(el, cb);
    });
  } // start enter transition


  beforeEnterHook && beforeEnterHook(el);

  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);

      if (!cb.cancelled) {
        addTransitionClass(el, toClass);

        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave(vnode, rm) {
  var el = vnode.elm; // call enter callback now

  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;

    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);

  if (isUndef(data) || el.nodeType !== 1) {
    return rm();
  }
  /* istanbul ignore if */


  if (isDef(el._leaveCb)) {
    return;
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);
  var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }

    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }

    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }

      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }

    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return;
    } // record leaving element


    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }

    beforeLeave && beforeLeave(el);

    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);

        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);

          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }

    leave && leave(el, cb);

    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
} // only used in dev mode


function checkDuration(val, name, vnode) {
  if (typeof val !== 'number') {
    warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
  } else if (isNaN(val)) {
    warn("<transition> explicit " + name + " duration is NaN - " + 'the duration expression might be incorrect.', vnode.context);
  }
}

function isValidDuration(val) {
  return typeof val === 'number' && !isNaN(val);
}
/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */


function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }

  var invokerFns = fn.fns;

  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}

function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1(vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
/*  */
// the directive module should be applied last, after all
// built-in modules have been applied.

var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({
  nodeOps: nodeOps,
  modules: modules
});
/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */

if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;

    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted(el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }

      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;

      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd); // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.

        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */

        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated(el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context); // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.

      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);

      if (curOptions.some(function (o, i) {
        return !looseEqual(o, prevOptions[i]);
      })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple ? binding.value.some(function (v) {
          return hasNoMatchingOption(v, curOptions);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);

        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */

  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;

  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn("<select multiple v-model=\"" + binding.expression + "\"> " + "expects an Array value for its binding, but got " + Object.prototype.toString.call(value).slice(8, -1), vm);
    return;
  }

  var selected, option;

  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];

    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;

      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }

        return;
      }
    }
  }

  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption(value, options) {
  return options.every(function (o) {
    return !looseEqual(o, value);
  });
}

function getValue(option) {
  return '_value' in option ? option._value : option.value;
}

function onCompositionStart(e) {
  e.target.composing = true;
}

function onCompositionEnd(e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) {
    return;
  }

  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger(el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
/*  */
// recursively search for possible transition defined inside the component root


function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}

var show = {
  bind: function bind(el, ref, vnode) {
    var value = ref.value;
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === 'none' ? '' : el.style.display;

    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },
  update: function update(el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;
    /* istanbul ignore if */

    if (!value === !oldValue) {
      return;
    }

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;

    if (transition$$1) {
      vnode.data.show = true;

      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },
  unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show: show
};
/*  */

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
}; // in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered

function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;

  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}

function extractTransitionData(comp) {
  var data = {};
  var options = comp.$options; // props

  for (var key in options.propsData) {
    data[key] = comp[key];
  } // events.
  // extract listeners and pass them directly to the transition methods


  var listeners = options._parentListeners;

  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }

  return data;
}

function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    });
  }
}

function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}

function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}

var isNotTextNode = function (c) {
  return c.tag || isAsyncPlaceholder(c);
};

var isVShowDirective = function (d) {
  return d.name === 'show';
};

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,
  render: function render(h) {
    var this$1 = this;
    var children = this.$slots.default;

    if (!children) {
      return;
    } // filter out text nodes (possible whitespaces)


    children = children.filter(isNotTextNode);
    /* istanbul ignore if */

    if (!children.length) {
      return;
    } // warn multiple elements


    if ("development" !== 'production' && children.length > 1) {
      warn('<transition> can only be used on a single element. Use ' + '<transition-group> for lists.', this.$parent);
    }

    var mode = this.mode; // warn invalid mode

    if ("development" !== 'production' && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent);
    }

    var rawChild = children[0]; // if this is a component root node and the component's
    // parent container node also has transition, skip.

    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    } // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive


    var child = getRealChild(rawChild);
    /* istanbul ignore if */

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    } // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.


    var id = "__transition-" + this._uid + "-";
    child.key = child.key == null ? child.isComment ? id + 'comment' : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild); // mark v-show
    // so that the transition module can hand over the control to the directive

    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data); // handle transition mode

      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        var delayedLeave;

        var performLeave = function () {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  }
};
/*  */

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props: props,
  beforeMount: function beforeMount() {
    var this$1 = this;
    var update = this._update;

    this._update = function (vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(this$1); // force removing pass

      this$1.__patch__(this$1._vnode, this$1.kept, false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
      );

      this$1._vnode = this$1.kept;
      restoreActiveInstance();
      update.call(this$1, vnode, hydrating);
    };
  },
  render: function render(h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];

      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        } else if ("development" !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? opts.Ctor.options.name || opts.tag || '' : c.tag;
          warn("<transition-group> children must be keyed: <" + name + ">");
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];

      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();

        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
  updated: function updated() {
    var children = this.prevChildren;
    var moveClass = this.moveClass || (this.name || 'v') + '-move';

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    } // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.


    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation); // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line

    this._reflow = document.body.offsetHeight;
    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
          if (e && e.target !== el) {
            return;
          }

          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function hasMove(el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false;
      }
      /* istanbul ignore if */


      if (this._hasMove) {
        return this._hasMove;
      } // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.


      var clone = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return this._hasMove = info.hasTransform;
    }
  }
};

function callPendingCbs(c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */


  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};
/*  */
// install platform specific utils

Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement; // install platform runtime directives & components

extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents); // install platform patch function

Vue.prototype.__patch__ = inBrowser ? patch : noop; // public mount method

Vue.prototype.$mount = function (el, hydrating) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
}; // devtools global hook

/* istanbul ignore next */


if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if ("development" !== 'production' && "development" !== 'test') {
        console[console.info ? 'info' : 'log']('Download the Vue Devtools extension for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
      }
    }

    if ("development" !== 'production' && "development" !== 'test' && config.productionTip !== false && typeof console !== 'undefined') {
      console[console.info ? 'info' : 'log']("You are running Vue in development mode.\n" + "Make sure to turn on production mode when deploying for production.\n" + "See more tips at https://vuejs.org/guide/deployment.html");
    }
  }, 0);
}
/*  */


var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g');
});

function parseText(text, delimiters) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;

  if (!tagRE.test(text)) {
    return;
  }

  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;

  while (match = tagRE.exec(text)) {
    index = match.index; // push text token

    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    } // tag token


    var exp = parseFilters(match[1].trim());
    tokens.push("_s(" + exp + ")");
    rawTokens.push({
      '@binding': exp
    });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }

  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  };
}
/*  */


function transformNode(el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');

  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);

    if (res) {
      warn("class=\"" + staticClass + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div class="{{ val }}">, use <div :class="val">.', el.rawAttrsMap['class']);
    }
  }

  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }

  var classBinding = getBindingAttr(el, 'class', false
  /* getStatic */
  );

  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData(el) {
  var data = '';

  if (el.staticClass) {
    data += "staticClass:" + el.staticClass + ",";
  }

  if (el.classBinding) {
    data += "class:" + el.classBinding + ",";
  }

  return data;
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};
/*  */

function transformNode$1(el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');

  if (staticStyle) {
    /* istanbul ignore if */
    if ("development" !== 'production') {
      var res = parseText(staticStyle, options.delimiters);

      if (res) {
        warn("style=\"" + staticStyle + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div style="{{ val }}">, use <div :style="val">.', el.rawAttrsMap['style']);
      }
    }

    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false
  /* getStatic */
  );

  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1(el) {
  var data = '';

  if (el.staticStyle) {
    data += "staticStyle:" + el.staticStyle + ",";
  }

  if (el.styleBinding) {
    data += "style:(" + el.styleBinding + "),";
  }

  return data;
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};
/*  */

var decoder;
var he = {
  decode: function decode(html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent;
  }
};
/*  */

var isUnaryTag = makeMap('area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' + 'link,meta,param,source,track,wbr'); // Elements that you can, intentionally, leave open
// (and which close themselves)

var canBeLeftOpenTag = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'); // HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content

var isNonPhrasingTag = makeMap('address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' + 'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' + 'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' + 'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' + 'title,tr,track');
/**
 * Not type-checking this file because it's mostly vendor code.
 */
// Regular Expressions for parsing tags and attributes

var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z" + unicodeRegExp.source + "]*";
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp("^<" + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
var doctype = /^<!DOCTYPE [^>]+>/i; // #7298: escape - to avoid being passed as HTML comment when inlined in page

var comment = /^<!\--/;
var conditionalComment = /^<!\[/; // Special Elements (can contain anything)

var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};
var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t',
  '&#39;': "'"
};
var encodedAttr = /&(?:lt|gt|quot|amp|#39);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#39|#10|#9);/g; // #5992

var isIgnoreNewlineTag = makeMap('pre,textarea', true);

var shouldIgnoreFirstNewline = function (tag, html) {
  return tag && isIgnoreNewlineTag(tag) && html[0] === '\n';
};

function decodeAttr(value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) {
    return decodingMap[match];
  });
}

function parseHTML(html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;

  while (html) {
    last = html; // Make sure we're not in a plaintext content element like script/style

    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3);
            }

            advance(commentEnd + 3);
            continue;
          }
        } // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment


        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue;
          }
        } // Doctype:


        var doctypeMatch = html.match(doctype);

        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue;
        } // End tag:


        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue;
        } // Start tag:


        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          handleStartTag(startTagMatch);

          if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
            advance(1);
          }

          continue;
        }
      }

      var text = void 0,
          rest = void 0,
          next = void 0;

      if (textEnd >= 0) {
        rest = html.slice(textEnd);

        while (!endTag.test(rest) && !startTagOpen.test(rest) && !comment.test(rest) && !conditionalComment.test(rest)) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);

          if (next < 0) {
            break;
          }

          textEnd += next;
          rest = html.slice(textEnd);
        }

        text = html.substring(0, textEnd);
      }

      if (textEnd < 0) {
        text = html;
      }

      if (text) {
        advance(text.length);
      }

      if (options.chars && text) {
        options.chars(text, index - text.length, index);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;

        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text.replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
          .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }

        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }

        if (options.chars) {
          options.chars(text);
        }

        return '';
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);

      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn("Mal-formatted tag at end of template: \"" + html + "\"", {
          start: index + html.length
        });
      }

      break;
    }
  } // Clean up any remaining tags


  parseEndTag();

  function advance(n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag() {
    var start = html.match(startTagOpen);

    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;

      while (!(end = html.match(startTagClose)) && (attr = html.match(dynamicArgAttribute) || html.match(attribute))) {
        attr.start = index;
        advance(attr[0].length);
        attr.end = index;
        match.attrs.push(attr);
      }

      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match;
      }
    }
  }

  function handleStartTag(match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }

      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;
    var l = match.attrs.length;
    var attrs = new Array(l);

    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href' ? options.shouldDecodeNewlinesForHref : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };

      if ("development" !== 'production' && options.outputSourceRange) {
        attrs[i].start = args.start + args[0].match(/^\s*/).length;
        attrs[i].end = args.end;
      }
    }

    if (!unary) {
      stack.push({
        tag: tagName,
        lowerCasedTag: tagName.toLowerCase(),
        attrs: attrs,
        start: match.start,
        end: match.end
      });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag(tagName, start, end) {
    var pos, lowerCasedTagName;

    if (start == null) {
      start = index;
    }

    if (end == null) {
      end = index;
    } // Find the closest opened tag of the same type


    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();

      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break;
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' && (i > pos || !tagName) && options.warn) {
          options.warn("tag <" + stack[i].tag + "> has no matching end tag.", {
            start: stack[i].start,
            end: stack[i].end
          });
        }

        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      } // Remove the open elements from the stack


      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }

      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}
/*  */


var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:|^#/;
var forAliasRE = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;
var dynamicArgRE = /^\[.*\]$/;
var argRE = /:(.*)$/;
var bindRE = /^:|^\.|^v-bind:/;
var modifierRE = /\.[^.\]]+(?=[^\]]*$)/g;
var slotRE = /^v-slot(:|$)|^#/;
var lineBreakRE = /[\r\n]/;
var whitespaceRE$1 = /\s+/g;
var invalidAttributeRE = /[\s"'<>\/=]/;
var decodeHTMLCached = cached(he.decode);
var emptySlotScopeToken = "_empty_"; // configurable state

var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;
var maybeComponent;

function createASTElement(tag, attrs, parent) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    rawAttrsMap: {},
    parent: parent,
    children: []
  };
}
/**
 * Convert HTML string to AST.
 */


function parse(template, options) {
  warn$2 = options.warn || baseWarn;
  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;
  var isReservedTag = options.isReservedTag || no;

  maybeComponent = function (el) {
    return !!el.component || !isReservedTag(el.tag);
  };

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
  delimiters = options.delimiters;
  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var whitespaceOption = options.whitespace;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce(msg, range) {
    if (!warned) {
      warned = true;
      warn$2(msg, range);
    }
  }

  function closeElement(element) {
    trimEndingWhitespace(element);

    if (!inVPre && !element.processed) {
      element = processElement(element, options);
    } // tree management


    if (!stack.length && element !== root) {
      // allow root elements with v-if, v-else-if and v-else
      if (root.if && (element.elseif || element.else)) {
        if ("development" !== 'production') {
          checkRootConstraints(element);
        }

        addIfCondition(root, {
          exp: element.elseif,
          block: element
        });
      } else if ("development" !== 'production') {
        warnOnce("Component template should contain exactly one root element. " + "If you are using v-if on multiple elements, " + "use v-else-if to chain them instead.", {
          start: element.start
        });
      }
    }

    if (currentParent && !element.forbidden) {
      if (element.elseif || element.else) {
        processIfConditions(element, currentParent);
      } else {
        if (element.slotScope) {
          // scoped slot
          // keep it in the children list so that v-else(-if) conditions can
          // find it as the prev node.
          var name = element.slotTarget || '"default"';
          (currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        }

        currentParent.children.push(element);
        element.parent = currentParent;
      }
    } // final children cleanup
    // filter out scoped slots


    element.children = element.children.filter(function (c) {
      return !c.slotScope;
    }); // remove trailing whitespace node again

    trimEndingWhitespace(element); // check pre state

    if (element.pre) {
      inVPre = false;
    }

    if (platformIsPreTag(element.tag)) {
      inPre = false;
    } // apply post-transforms


    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  function trimEndingWhitespace(el) {
    // remove trailing whitespace node
    if (!inPre) {
      var lastNode;

      while ((lastNode = el.children[el.children.length - 1]) && lastNode.type === 3 && lastNode.text === ' ') {
        el.children.pop();
      }
    }
  }

  function checkRootConstraints(el) {
    if (el.tag === 'slot' || el.tag === 'template') {
      warnOnce("Cannot use <" + el.tag + "> as component root element because it may " + 'contain multiple nodes.', {
        start: el.start
      });
    }

    if (el.attrsMap.hasOwnProperty('v-for')) {
      warnOnce('Cannot use v-for on stateful component root element because ' + 'it renders multiple elements.', el.rawAttrsMap['v-for']);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    outputSourceRange: options.outputSourceRange,
    start: function start(tag, attrs, unary, start$1, end) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = currentParent && currentParent.ns || platformGetTagNamespace(tag); // handle IE svg bug

      /* istanbul ignore if */

      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);

      if (ns) {
        element.ns = ns;
      }

      if ("development" !== 'production') {
        if (options.outputSourceRange) {
          element.start = start$1;
          element.end = end;
          element.rawAttrsMap = element.attrsList.reduce(function (cumulated, attr) {
            cumulated[attr.name] = attr;
            return cumulated;
          }, {});
        }

        attrs.forEach(function (attr) {
          if (invalidAttributeRE.test(attr.name)) {
            warn$2("Invalid dynamic argument expression: attribute names cannot contain " + "spaces, quotes, <, >, / or =.", {
              start: attr.start + attr.name.indexOf("["),
              end: attr.start + attr.name.length
            });
          }
        });
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2('Templates should only be responsible for mapping the state to the ' + 'UI. Avoid placing tags with side-effects in your templates, such as ' + "<" + tag + ">" + ', as they will not be parsed.', {
          start: element.start
        });
      } // apply pre-transforms


      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);

        if (element.pre) {
          inVPre = true;
        }
      }

      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }

      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
      }

      if (!root) {
        root = element;

        if ("development" !== 'production') {
          checkRootConstraints(root);
        }
      }

      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },
    end: function end(tag, start, end$1) {
      var element = stack[stack.length - 1]; // pop stack

      stack.length -= 1;
      currentParent = stack[stack.length - 1];

      if ("development" !== 'production' && options.outputSourceRange) {
        element.end = end$1;
      }

      closeElement(element);
    },
    chars: function chars(text, start, end) {
      if (!currentParent) {
        if ("development" !== 'production') {
          if (text === template) {
            warnOnce('Component template requires a root element, rather than just text.', {
              start: start
            });
          } else if (text = text.trim()) {
            warnOnce("text \"" + text + "\" outside root element will be ignored.", {
              start: start
            });
          }
        }

        return;
      } // IE textarea placeholder bug

      /* istanbul ignore if */


      if (isIE && currentParent.tag === 'textarea' && currentParent.attrsMap.placeholder === text) {
        return;
      }

      var children = currentParent.children;

      if (inPre || text.trim()) {
        text = isTextTag(currentParent) ? text : decodeHTMLCached(text);
      } else if (!children.length) {
        // remove the whitespace-only node right after an opening tag
        text = '';
      } else if (whitespaceOption) {
        if (whitespaceOption === 'condense') {
          // in condense mode, remove the whitespace node if it contains
          // line break, otherwise condense to a single space
          text = lineBreakRE.test(text) ? '' : ' ';
        } else {
          text = ' ';
        }
      } else {
        text = preserveWhitespace ? ' ' : '';
      }

      if (text) {
        if (!inPre && whitespaceOption === 'condense') {
          // condense consecutive whitespaces into single space
          text = text.replace(whitespaceRE$1, ' ');
        }

        var res;
        var child;

        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          child = {
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          };
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          child = {
            type: 3,
            text: text
          };
        }

        if (child) {
          if ("development" !== 'production' && options.outputSourceRange) {
            child.start = start;
            child.end = end;
          }

          children.push(child);
        }
      }
    },
    comment: function comment(text, start, end) {
      // adding anyting as a sibling to the root node is forbidden
      // comments should still be allowed, but ignored
      if (currentParent) {
        var child = {
          type: 3,
          text: text,
          isComment: true
        };

        if ("development" !== 'production' && options.outputSourceRange) {
          child.start = start;
          child.end = end;
        }

        currentParent.children.push(child);
      }
    }
  });
  return root;
}

function processPre(el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs(el) {
  var list = el.attrsList;
  var len = list.length;

  if (len) {
    var attrs = el.attrs = new Array(len);

    for (var i = 0; i < len; i++) {
      attrs[i] = {
        name: list[i].name,
        value: JSON.stringify(list[i].value)
      };

      if (list[i].start != null) {
        attrs[i].start = list[i].start;
        attrs[i].end = list[i].end;
      }
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement(element, options) {
  processKey(element); // determine whether this is a plain element after
  // removing structural attributes

  element.plain = !element.key && !element.scopedSlots && !element.attrsList.length;
  processRef(element);
  processSlotContent(element);
  processSlotOutlet(element);
  processComponent(element);

  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }

  processAttrs(element);
  return element;
}

function processKey(el) {
  var exp = getBindingAttr(el, 'key');

  if (exp) {
    if ("development" !== 'production') {
      if (el.tag === 'template') {
        warn$2("<template> cannot be keyed. Place the key on real elements instead.", getRawBindingAttr(el, 'key'));
      }

      if (el.for) {
        var iterator = el.iterator2 || el.iterator1;
        var parent = el.parent;

        if (iterator && iterator === exp && parent && parent.tag === 'transition-group') {
          warn$2("Do not use v-for index as key on <transition-group> children, " + "this is the same as not using keys.", getRawBindingAttr(el, 'key'), true
          /* tip */
          );
        }
      }
    }

    el.key = exp;
  }
}

function processRef(el) {
  var ref = getBindingAttr(el, 'ref');

  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor(el) {
  var exp;

  if (exp = getAndRemoveAttr(el, 'v-for')) {
    var res = parseFor(exp);

    if (res) {
      extend(el, res);
    } else if ("development" !== 'production') {
      warn$2("Invalid v-for expression: " + exp, el.rawAttrsMap['v-for']);
    }
  }
}

function parseFor(exp) {
  var inMatch = exp.match(forAliasRE);

  if (!inMatch) {
    return;
  }

  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);

  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '').trim();
    res.iterator1 = iteratorMatch[1].trim();

    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }

  return res;
}

function processIf(el) {
  var exp = getAndRemoveAttr(el, 'v-if');

  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }

    var elseif = getAndRemoveAttr(el, 'v-else-if');

    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions(el, parent) {
  var prev = findPrevElement(parent.children);

  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if ("development" !== 'production') {
    warn$2("v-" + (el.elseif ? 'else-if="' + el.elseif + '"' : 'else') + " " + "used on element <" + el.tag + "> without corresponding v-if.", el.rawAttrsMap[el.elseif ? 'v-else-if' : 'v-else']);
  }
}

function findPrevElement(children) {
  var i = children.length;

  while (i--) {
    if (children[i].type === 1) {
      return children[i];
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2("text \"" + children[i].text.trim() + "\" between v-if and v-else(-if) " + "will be ignored.", children[i]);
      }

      children.pop();
    }
  }
}

function addIfCondition(el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }

  el.ifConditions.push(condition);
}

function processOnce(el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');

  if (once$$1 != null) {
    el.once = true;
  }
} // handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">


function processSlotContent(el) {
  var slotScope;

  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope');
    /* istanbul ignore if */

    if ("development" !== 'production' && slotScope) {
      warn$2("the \"scope\" attribute for scoped slots have been deprecated and " + "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " + "can also be used on plain elements in addition to <template> to " + "denote scoped slots.", el.rawAttrsMap['scope'], true);
    }

    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
  } else if (slotScope = getAndRemoveAttr(el, 'slot-scope')) {
    /* istanbul ignore if */
    if ("development" !== 'production' && el.attrsMap['v-for']) {
      warn$2("Ambiguous combined usage of slot-scope and v-for on <" + el.tag + "> " + "(v-for takes higher priority). Use a wrapper <template> for the " + "scoped slot to make it clearer.", el.rawAttrsMap['slot-scope'], true);
    }

    el.slotScope = slotScope;
  } // slot="xxx"


  var slotTarget = getBindingAttr(el, 'slot');

  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
    el.slotTargetDynamic = !!(el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']); // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.

    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'));
    }
  } // 2.6 v-slot syntax


  {
    if (el.tag === 'template') {
      // v-slot on <template>
      var slotBinding = getAndRemoveAttrByRegex(el, slotRE);

      if (slotBinding) {
        if ("development" !== 'production') {
          if (el.slotTarget || el.slotScope) {
            warn$2("Unexpected mixed usage of different slot syntaxes.", el);
          }

          if (el.parent && !maybeComponent(el.parent)) {
            warn$2("<template v-slot> can only appear at the root level inside " + "the receiving component", el);
          }
        }

        var ref = getSlotName(slotBinding);
        var name = ref.name;
        var dynamic = ref.dynamic;
        el.slotTarget = name;
        el.slotTargetDynamic = dynamic;
        el.slotScope = slotBinding.value || emptySlotScopeToken; // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      var slotBinding$1 = getAndRemoveAttrByRegex(el, slotRE);

      if (slotBinding$1) {
        if ("development" !== 'production') {
          if (!maybeComponent(el)) {
            warn$2("v-slot can only be used on components or <template>.", slotBinding$1);
          }

          if (el.slotScope || el.slotTarget) {
            warn$2("Unexpected mixed usage of different slot syntaxes.", el);
          }

          if (el.scopedSlots) {
            warn$2("To avoid scope ambiguity, the default slot should also use " + "<template> syntax when there are other named slots.", slotBinding$1);
          }
        } // add the component's children to its default slot


        var slots = el.scopedSlots || (el.scopedSlots = {});
        var ref$1 = getSlotName(slotBinding$1);
        var name$1 = ref$1.name;
        var dynamic$1 = ref$1.dynamic;
        var slotContainer = slots[name$1] = createASTElement('template', [], el);
        slotContainer.slotTarget = name$1;
        slotContainer.slotTargetDynamic = dynamic$1;
        slotContainer.children = el.children.filter(function (c) {
          if (!c.slotScope) {
            c.parent = slotContainer;
            return true;
          }
        });
        slotContainer.slotScope = slotBinding$1.value || emptySlotScopeToken; // remove children as they are returned from scopedSlots now

        el.children = []; // mark el non-plain so data gets generated

        el.plain = false;
      }
    }
  }
}

function getSlotName(binding) {
  var name = binding.name.replace(slotRE, '');

  if (!name) {
    if (binding.name[0] !== '#') {
      name = 'default';
    } else if ("development" !== 'production') {
      warn$2("v-slot shorthand syntax requires a slot name.", binding);
    }
  }

  return dynamicArgRE.test(name) // dynamic [name]
  ? {
    name: name.slice(1, -1),
    dynamic: true
  } // static name
  : {
    name: "\"" + name + "\"",
    dynamic: false
  };
} // handle <slot/> outlets


function processSlotOutlet(el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');

    if ("development" !== 'production' && el.key) {
      warn$2("`key` does not work on <slot> because slots are abstract outlets " + "and can possibly expand into multiple elements. " + "Use the key on a wrapping element instead.", getRawBindingAttr(el, 'key'));
    }
  }
}

function processComponent(el) {
  var binding;

  if (binding = getBindingAttr(el, 'is')) {
    el.component = binding;
  }

  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs(el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, syncGen, isDynamic;

  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;

    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true; // modifiers

      modifiers = parseModifiers(name.replace(dirRE, '')); // support .foo shorthand syntax for the .prop modifier

      if (modifiers) {
        name = name.replace(modifierRE, '');
      }

      if (bindRE.test(name)) {
        // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isDynamic = dynamicArgRE.test(name);

        if (isDynamic) {
          name = name.slice(1, -1);
        }

        if ("development" !== 'production' && value.trim().length === 0) {
          warn$2("The value for a v-bind expression cannot be empty. Found in \"v-bind:" + name + "\"");
        }

        if (modifiers) {
          if (modifiers.prop && !isDynamic) {
            name = camelize(name);

            if (name === 'innerHtml') {
              name = 'innerHTML';
            }
          }

          if (modifiers.camel && !isDynamic) {
            name = camelize(name);
          }

          if (modifiers.sync) {
            syncGen = genAssignmentCode(value, "$event");

            if (!isDynamic) {
              addHandler(el, "update:" + camelize(name), syncGen, null, false, warn$2, list[i]);

              if (hyphenate(name) !== camelize(name)) {
                addHandler(el, "update:" + hyphenate(name), syncGen, null, false, warn$2, list[i]);
              }
            } else {
              // handler w/ dynamic event name
              addHandler(el, "\"update:\"+(" + name + ")", syncGen, null, false, warn$2, list[i], true // dynamic
              );
            }
          }
        }

        if (modifiers && modifiers.prop || !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
          addProp(el, name, value, list[i], isDynamic);
        } else {
          addAttr(el, name, value, list[i], isDynamic);
        }
      } else if (onRE.test(name)) {
        // v-on
        name = name.replace(onRE, '');
        isDynamic = dynamicArgRE.test(name);

        if (isDynamic) {
          name = name.slice(1, -1);
        }

        addHandler(el, name, value, modifiers, false, warn$2, list[i], isDynamic);
      } else {
        // normal directives
        name = name.replace(dirRE, ''); // parse arg

        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        isDynamic = false;

        if (arg) {
          name = name.slice(0, -(arg.length + 1));

          if (dynamicArgRE.test(arg)) {
            arg = arg.slice(1, -1);
            isDynamic = true;
          }
        }

        addDirective(el, name, rawName, value, arg, isDynamic, modifiers, list[i]);

        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if ("development" !== 'production') {
        var res = parseText(value, delimiters);

        if (res) {
          warn$2(name + "=\"" + value + "\": " + 'Interpolation inside attributes has been removed. ' + 'Use v-bind or the colon shorthand instead. For example, ' + 'instead of <div id="{{ val }}">, use <div :id="val">.', list[i]);
        }
      }

      addAttr(el, name, JSON.stringify(value), list[i]); // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation

      if (!el.component && name === 'muted' && platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true', list[i]);
      }
    }
  }
}

function checkInFor(el) {
  var parent = el;

  while (parent) {
    if (parent.for !== undefined) {
      return true;
    }

    parent = parent.parent;
  }

  return false;
}

function parseModifiers(name) {
  var match = name.match(modifierRE);

  if (match) {
    var ret = {};
    match.forEach(function (m) {
      ret[m.slice(1)] = true;
    });
    return ret;
  }
}

function makeAttrsMap(attrs) {
  var map = {};

  for (var i = 0, l = attrs.length; i < l; i++) {
    if ("development" !== 'production' && map[attrs[i].name] && !isIE && !isEdge) {
      warn$2('duplicate attribute: ' + attrs[i].name, attrs[i]);
    }

    map[attrs[i].name] = attrs[i].value;
  }

  return map;
} // for script (e.g. type="x/template") or style, do not decode content


function isTextTag(el) {
  return el.tag === 'script' || el.tag === 'style';
}

function isForbiddenTag(el) {
  return el.tag === 'style' || el.tag === 'script' && (!el.attrsMap.type || el.attrsMap.type === 'text/javascript');
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;
/* istanbul ignore next */

function guardIESVGBug(attrs) {
  var res = [];

  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];

    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }

  return res;
}

function checkForAliasModel(el, value) {
  var _el = el;

  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2("<" + el.tag + " v-model=\"" + value + "\">: " + "You are binding v-model directly to a v-for iteration alias. " + "This will not be able to modify the v-for source array because " + "writing to the alias is like modifying a function local variable. " + "Consider using an array of objects and use v-model on an object property instead.", el.rawAttrsMap['v-model']);
    }

    _el = _el.parent;
  }
}
/*  */


function preTransformNode(el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;

    if (!map['v-model']) {
      return;
    }

    var typeBinding;

    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }

    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + map['v-bind'] + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? "&&(" + ifCondition + ")" : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true); // 1. checkbox

      var branch0 = cloneASTElement(el); // process for on the main node

      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed

      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      }); // 2. add radio else-if condition

      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      }); // 3. other

      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0;
    }
  }
}

function cloneASTElement(el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent);
}

var model$1 = {
  preTransformNode: preTransformNode
};
var modules$1 = [klass$1, style$1, model$1];
/*  */

function text(el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', "_s(" + dir.value + ")", dir);
  }
}
/*  */


function html(el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', "_s(" + dir.value + ")", dir);
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};
/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};
/*  */

var isStaticKey;
var isPlatformReservedTag;
var genStaticKeysCached = cached(genStaticKeys$1);
/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */

function optimize(root, options) {
  if (!root) {
    return;
  }

  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no; // first pass: mark all non-static nodes.

  markStatic$1(root); // second pass: mark static roots.

  markStaticRoots(root, false);
}

function genStaticKeys$1(keys) {
  return makeMap('type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap' + (keys ? ',' + keys : ''));
}

function markStatic$1(node) {
  node.static = isStatic(node);

  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (!isPlatformReservedTag(node.tag) && node.tag !== 'slot' && node.attrsMap['inline-template'] == null) {
      return;
    }

    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);

      if (!child.static) {
        node.static = false;
      }
    }

    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);

        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots(node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    } // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.


    if (node.static && node.children.length && !(node.children.length === 1 && node.children[0].type === 3)) {
      node.staticRoot = true;
      return;
    } else {
      node.staticRoot = false;
    }

    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }

    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic(node) {
  if (node.type === 2) {
    // expression
    return false;
  }

  if (node.type === 3) {
    // text
    return true;
  }

  return !!(node.pre || !node.hasBindings && // no dynamic bindings
  !node.if && !node.for && // not v-if or v-for or v-else
  !isBuiltInTag(node.tag) && // not a built-in
  isPlatformReservedTag(node.tag) && // not a component
  !isDirectChildOfTemplateFor(node) && Object.keys(node).every(isStaticKey));
}

function isDirectChildOfTemplateFor(node) {
  while (node.parent) {
    node = node.parent;

    if (node.tag !== 'template') {
      return false;
    }

    if (node.for) {
      return true;
    }
  }

  return false;
}
/*  */


var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;
var fnInvokeRE = /\([^)]*?\);*$/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/; // KeyboardEvent.keyCode aliases

var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
}; // KeyboardEvent.key aliases

var keyNames = {
  // #7880: IE11 and Edge use `Esc` for Escape key name.
  esc: ['Esc', 'Escape'],
  tab: 'Tab',
  enter: 'Enter',
  // #9112: IE11 uses `Spacebar` for Space key name.
  space: [' ', 'Spacebar'],
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  // #9112: IE11 uses `Del` for Delete key name.
  'delete': ['Backspace', 'Delete', 'Del']
}; // #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once

var genGuard = function (condition) {
  return "if(" + condition + ")return null;";
};

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers(events, isNative) {
  var prefix = isNative ? 'nativeOn:' : 'on:';
  var staticHandlers = "";
  var dynamicHandlers = "";

  for (var name in events) {
    var handlerCode = genHandler(events[name]);

    if (events[name] && events[name].dynamic) {
      dynamicHandlers += name + "," + handlerCode + ",";
    } else {
      staticHandlers += "\"" + name + "\":" + handlerCode + ",";
    }
  }

  staticHandlers = "{" + staticHandlers.slice(0, -1) + "}";

  if (dynamicHandlers) {
    return prefix + "_d(" + staticHandlers + ",[" + dynamicHandlers.slice(0, -1) + "])";
  } else {
    return prefix + staticHandlers;
  }
}

function genHandler(handler) {
  if (!handler) {
    return 'function(){}';
  }

  if (Array.isArray(handler)) {
    return "[" + handler.map(function (handler) {
      return genHandler(handler);
    }).join(',') + "]";
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);
  var isFunctionInvocation = simplePathRE.test(handler.value.replace(fnInvokeRE, ''));

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value;
    }

    return "function($event){" + (isFunctionInvocation ? "return " + handler.value : handler.value) + "}"; // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];

    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key]; // left/right

        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = handler.modifiers;
        genModifierCode += genGuard(['ctrl', 'shift', 'alt', 'meta'].filter(function (keyModifier) {
          return !modifiers[keyModifier];
        }).map(function (keyModifier) {
          return "$event." + keyModifier + "Key";
        }).join('||'));
      } else {
        keys.push(key);
      }
    }

    if (keys.length) {
      code += genKeyFilter(keys);
    } // Make sure modifiers like prevent and stop get executed after key filtering


    if (genModifierCode) {
      code += genModifierCode;
    }

    var handlerCode = isMethodPath ? "return " + handler.value + "($event)" : isFunctionExpression ? "return (" + handler.value + ")($event)" : isFunctionInvocation ? "return " + handler.value : handler.value;
    return "function($event){" + code + handlerCode + "}";
  }
}

function genKeyFilter(keys) {
  return (// make sure the key filters only apply to KeyboardEvents
    // #9441: can't use 'keyCode' in $event because Chrome autofill fires fake
    // key events that do not have keyCode property...
    "if(!$event.type.indexOf('key')&&" + keys.map(genFilterCode).join('&&') + ")return null;"
  );
}

function genFilterCode(key) {
  var keyVal = parseInt(key, 10);

  if (keyVal) {
    return "$event.keyCode!==" + keyVal;
  }

  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return "_k($event.keyCode," + JSON.stringify(key) + "," + JSON.stringify(keyCode) + "," + "$event.key," + "" + JSON.stringify(keyName) + ")";
}
/*  */


function on(el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }

  el.wrapListeners = function (code) {
    return "_g(" + code + "," + dir.value + ")";
  };
}
/*  */


function bind$1(el, dir) {
  el.wrapData = function (code) {
    return "_b(" + code + ",'" + el.tag + "'," + dir.value + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")";
  };
}
/*  */


var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};
/*  */

var CodegenState = function CodegenState(options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;

  this.maybeComponent = function (el) {
    return !!el.component || !isReservedTag(el.tag);
  };

  this.onceId = 0;
  this.staticRenderFns = [];
  this.pre = false;
};

function generate(ast, options) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: "with(this){return " + code + "}",
    staticRenderFns: state.staticRenderFns
  };
}

function genElement(el, state) {
  if (el.parent) {
    el.pre = el.pre || el.parent.pre;
  }

  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state);
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state);
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state);
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.tag === 'template' && !el.slotTarget && !state.pre) {
    return genChildren(el, state) || 'void 0';
  } else if (el.tag === 'slot') {
    return genSlot(el, state);
  } else {
    // component or element
    var code;

    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data;

      if (!el.plain || el.pre && state.maybeComponent(el)) {
        data = genData$2(el, state);
      }

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + el.tag + "'" + (data ? "," + data : '') + (children ? "," + children : '') + ")";
    } // module transforms


    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }

    return code;
  }
} // hoist static sub-trees out


function genStatic(el, state) {
  el.staticProcessed = true; // Some elements (templates) need to behave differently inside of a v-pre
  // node.  All pre nodes are static roots, so we can use this as a location to
  // wrap a state change and reset it upon exiting the pre node.

  var originalPreState = state.pre;

  if (el.pre) {
    state.pre = el.pre;
  }

  state.staticRenderFns.push("with(this){return " + genElement(el, state) + "}");
  state.pre = originalPreState;
  return "_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")";
} // v-once


function genOnce(el, state) {
  el.onceProcessed = true;

  if (el.if && !el.ifProcessed) {
    return genIf(el, state);
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;

    while (parent) {
      if (parent.for) {
        key = parent.key;
        break;
      }

      parent = parent.parent;
    }

    if (!key) {
      "development" !== 'production' && state.warn("v-once can only be used inside v-for that is keyed. ", el.rawAttrsMap['v-once']);
      return genElement(el, state);
    }

    return "_o(" + genElement(el, state) + "," + state.onceId++ + "," + key + ")";
  } else {
    return genStatic(el, state);
  }
}

function genIf(el, state, altGen, altEmpty) {
  el.ifProcessed = true; // avoid recursion

  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty);
}

function genIfConditions(conditions, state, altGen, altEmpty) {
  if (!conditions.length) {
    return altEmpty || '_e()';
  }

  var condition = conditions.shift();

  if (condition.exp) {
    return "(" + condition.exp + ")?" + genTernaryExp(condition.block) + ":" + genIfConditions(conditions, state, altGen, altEmpty);
  } else {
    return "" + genTernaryExp(condition.block);
  } // v-if with v-once should generate code like (a)?_m(0):_m(1)


  function genTernaryExp(el) {
    return altGen ? altGen(el, state) : el.once ? genOnce(el, state) : genElement(el, state);
  }
}

function genFor(el, state, altGen, altHelper) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? "," + el.iterator1 : '';
  var iterator2 = el.iterator2 ? "," + el.iterator2 : '';

  if ("development" !== 'production' && state.maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key) {
    state.warn("<" + el.tag + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " + "v-for should have explicit keys. " + "See https://vuejs.org/guide/list.html#key for more info.", el.rawAttrsMap['v-for'], true
    /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion

  return (altHelper || '_l') + "((" + exp + ")," + "function(" + alias + iterator1 + iterator2 + "){" + "return " + (altGen || genElement)(el, state) + '})';
}

function genData$2(el, state) {
  var data = '{'; // directives first.
  // directives may mutate the el's other properties before they are generated.

  var dirs = genDirectives(el, state);

  if (dirs) {
    data += dirs + ',';
  } // key


  if (el.key) {
    data += "key:" + el.key + ",";
  } // ref


  if (el.ref) {
    data += "ref:" + el.ref + ",";
  }

  if (el.refInFor) {
    data += "refInFor:true,";
  } // pre


  if (el.pre) {
    data += "pre:true,";
  } // record original tag name for components using "is" attribute


  if (el.component) {
    data += "tag:\"" + el.tag + "\",";
  } // module data generation functions


  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  } // attributes


  if (el.attrs) {
    data += "attrs:" + genProps(el.attrs) + ",";
  } // DOM props


  if (el.props) {
    data += "domProps:" + genProps(el.props) + ",";
  } // event handlers


  if (el.events) {
    data += genHandlers(el.events, false) + ",";
  }

  if (el.nativeEvents) {
    data += genHandlers(el.nativeEvents, true) + ",";
  } // slot target
  // only for non-scoped slots


  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + el.slotTarget + ",";
  } // scoped slots


  if (el.scopedSlots) {
    data += genScopedSlots(el, el.scopedSlots, state) + ",";
  } // component v-model


  if (el.model) {
    data += "model:{value:" + el.model.value + ",callback:" + el.model.callback + ",expression:" + el.model.expression + "},";
  } // inline-template


  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);

    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }

  data = data.replace(/,$/, '') + '}'; // v-bind dynamic argument wrap
  // v-bind with dynamic arguments must be applied using the same v-bind object
  // merge helper so that class/style/mustUseProp attrs are handled correctly.

  if (el.dynamicAttrs) {
    data = "_b(" + data + ",\"" + el.tag + "\"," + genProps(el.dynamicAttrs) + ")";
  } // v-bind data wrap


  if (el.wrapData) {
    data = el.wrapData(data);
  } // v-on data wrap


  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }

  return data;
}

function genDirectives(el, state) {
  var dirs = el.directives;

  if (!dirs) {
    return;
  }

  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;

  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];

    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }

    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + dir.name + "\",rawName:\"" + dir.rawName + "\"" + (dir.value ? ",value:(" + dir.value + "),expression:" + JSON.stringify(dir.value) : '') + (dir.arg ? ",arg:" + (dir.isDynamicArg ? dir.arg : "\"" + dir.arg + "\"") : '') + (dir.modifiers ? ",modifiers:" + JSON.stringify(dir.modifiers) : '') + "},";
    }
  }

  if (hasRuntime) {
    return res.slice(0, -1) + ']';
  }
}

function genInlineTemplate(el, state) {
  var ast = el.children[0];

  if ("development" !== 'production' && (el.children.length !== 1 || ast.type !== 1)) {
    state.warn('Inline-template components must have exactly one child element.', {
      start: el.start
    });
  }

  if (ast && ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return "inlineTemplate:{render:function(){" + inlineRenderFns.render + "},staticRenderFns:[" + inlineRenderFns.staticRenderFns.map(function (code) {
      return "function(){" + code + "}";
    }).join(',') + "]}";
  }
}

function genScopedSlots(el, slots, state) {
  // by default scoped slots are considered "stable", this allows child
  // components with only scoped slots to skip forced updates from parent.
  // but in some cases we have to bail-out of this optimization
  // for example if the slot contains dynamic names, has v-if or v-for on them...
  var needsForceUpdate = el.for || Object.keys(slots).some(function (key) {
    var slot = slots[key];
    return slot.slotTargetDynamic || slot.if || slot.for || containsSlotChild(slot) // is passing down slot from parent which may be dynamic
    ;
  }); // #9534: if a component with scoped slots is inside a conditional branch,
  // it's possible for the same component to be reused but with different
  // compiled slot content. To avoid that, we generate a unique key based on
  // the generated code of all the slot contents.

  var needsKey = !!el.if; // OR when it is inside another scoped slot or v-for (the reactivity may be
  // disconnected due to the intermediate scope variable)
  // #9438, #9506
  // TODO: this can be further optimized by properly analyzing in-scope bindings
  // and skip force updating ones that do not actually use scope variables.

  if (!needsForceUpdate) {
    var parent = el.parent;

    while (parent) {
      if (parent.slotScope && parent.slotScope !== emptySlotScopeToken || parent.for) {
        needsForceUpdate = true;
        break;
      }

      if (parent.if) {
        needsKey = true;
      }

      parent = parent.parent;
    }
  }

  var generatedSlots = Object.keys(slots).map(function (key) {
    return genScopedSlot(slots[key], state);
  }).join(',');
  return "scopedSlots:_u([" + generatedSlots + "]" + (needsForceUpdate ? ",null,true" : "") + (!needsForceUpdate && needsKey ? ",null,false," + hash(generatedSlots) : "") + ")";
}

function hash(str) {
  var hash = 5381;
  var i = str.length;

  while (i) {
    hash = hash * 33 ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
}

function containsSlotChild(el) {
  if (el.type === 1) {
    if (el.tag === 'slot') {
      return true;
    }

    return el.children.some(containsSlotChild);
  }

  return false;
}

function genScopedSlot(el, state) {
  var isLegacySyntax = el.attrsMap['slot-scope'];

  if (el.if && !el.ifProcessed && !isLegacySyntax) {
    return genIf(el, state, genScopedSlot, "null");
  }

  if (el.for && !el.forProcessed) {
    return genFor(el, state, genScopedSlot);
  }

  var slotScope = el.slotScope === emptySlotScopeToken ? "" : String(el.slotScope);
  var fn = "function(" + slotScope + "){" + "return " + (el.tag === 'template' ? el.if && isLegacySyntax ? "(" + el.if + ")?" + (genChildren(el, state) || 'undefined') + ":undefined" : genChildren(el, state) || 'undefined' : genElement(el, state)) + "}"; // reverse proxy v-slot without scope on this.$slots

  var reverseProxy = slotScope ? "" : ",proxy:true";
  return "{key:" + (el.slotTarget || "\"default\"") + ",fn:" + fn + reverseProxy + "}";
}

function genChildren(el, state, checkSkip, altGenElement, altGenNode) {
  var children = el.children;

  if (children.length) {
    var el$1 = children[0]; // optimize single v-for

    if (children.length === 1 && el$1.for && el$1.tag !== 'template' && el$1.tag !== 'slot') {
      var normalizationType = checkSkip ? state.maybeComponent(el$1) ? ",1" : ",0" : "";
      return "" + (altGenElement || genElement)(el$1, state) + normalizationType;
    }

    var normalizationType$1 = checkSkip ? getNormalizationType(children, state.maybeComponent) : 0;
    var gen = altGenNode || genNode;
    return "[" + children.map(function (c) {
      return gen(c, state);
    }).join(',') + "]" + (normalizationType$1 ? "," + normalizationType$1 : '');
  }
} // determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed


function getNormalizationType(children, maybeComponent) {
  var res = 0;

  for (var i = 0; i < children.length; i++) {
    var el = children[i];

    if (el.type !== 1) {
      continue;
    }

    if (needsNormalization(el) || el.ifConditions && el.ifConditions.some(function (c) {
      return needsNormalization(c.block);
    })) {
      res = 2;
      break;
    }

    if (maybeComponent(el) || el.ifConditions && el.ifConditions.some(function (c) {
      return maybeComponent(c.block);
    })) {
      res = 1;
    }
  }

  return res;
}

function needsNormalization(el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot';
}

function genNode(node, state) {
  if (node.type === 1) {
    return genElement(node, state);
  } else if (node.type === 3 && node.isComment) {
    return genComment(node);
  } else {
    return genText(node);
  }
}

function genText(text) {
  return "_v(" + (text.type === 2 ? text.expression // no need for () because already wrapped in _s()
  : transformSpecialNewlines(JSON.stringify(text.text))) + ")";
}

function genComment(comment) {
  return "_e(" + JSON.stringify(comment.text) + ")";
}

function genSlot(el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? "," + children : '');
  var attrs = el.attrs || el.dynamicAttrs ? genProps((el.attrs || []).concat(el.dynamicAttrs || []).map(function (attr) {
    return {
      // slot props are camelized
      name: camelize(attr.name),
      value: attr.value,
      dynamic: attr.dynamic
    };
  })) : null;
  var bind$$1 = el.attrsMap['v-bind'];

  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }

  if (attrs) {
    res += "," + attrs;
  }

  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }

  return res + ')';
} // componentName is el.component, take it as argument to shun flow's pessimistic refinement


function genComponent(componentName, el, state) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return "_c(" + componentName + "," + genData$2(el, state) + (children ? "," + children : '') + ")";
}

function genProps(props) {
  var staticProps = "";
  var dynamicProps = "";

  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    var value = transformSpecialNewlines(prop.value);

    if (prop.dynamic) {
      dynamicProps += prop.name + "," + value + ",";
    } else {
      staticProps += "\"" + prop.name + "\":" + value + ",";
    }
  }

  staticProps = "{" + staticProps.slice(0, -1) + "}";

  if (dynamicProps) {
    return "_d(" + staticProps + ",[" + dynamicProps.slice(0, -1) + "])";
  } else {
    return staticProps;
  }
} // #3895, #4268


function transformSpecialNewlines(text) {
  return text.replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
/*  */
// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed


var prohibitedKeywordRE = new RegExp('\\b' + ('do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' + 'super,throw,while,yield,delete,export,import,return,switch,default,' + 'extends,finally,continue,debugger,function,arguments').split(',').join('\\b|\\b') + '\\b'); // these unary operators should not be used as property/method names

var unaryOperatorsRE = new RegExp('\\b' + 'delete,typeof,void'.split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)'); // strip strings in expressions

var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g; // detect problematic expressions in a template

function detectErrors(ast, warn) {
  if (ast) {
    checkNode(ast, warn);
  }
}

function checkNode(node, warn) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];

        if (value) {
          var range = node.rawAttrsMap[name];

          if (name === 'v-for') {
            checkFor(node, "v-for=\"" + value + "\"", warn, range);
          } else if (name === 'v-slot' || name[0] === '#') {
            checkFunctionParameterExpression(value, name + "=\"" + value + "\"", warn, range);
          } else if (onRE.test(name)) {
            checkEvent(value, name + "=\"" + value + "\"", warn, range);
          } else {
            checkExpression(value, name + "=\"" + value + "\"", warn, range);
          }
        }
      }
    }

    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], warn);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, warn, node);
  }
}

function checkEvent(exp, text, warn, range) {
  var stripped = exp.replace(stripStringRE, '');
  var keywordMatch = stripped.match(unaryOperatorsRE);

  if (keywordMatch && stripped.charAt(keywordMatch.index - 1) !== '$') {
    warn("avoid using JavaScript unary operator as property name: " + "\"" + keywordMatch[0] + "\" in expression " + text.trim(), range);
  }

  checkExpression(exp, text, warn, range);
}

function checkFor(node, text, warn, range) {
  checkExpression(node.for || '', text, warn, range);
  checkIdentifier(node.alias, 'v-for alias', text, warn, range);
  checkIdentifier(node.iterator1, 'v-for iterator', text, warn, range);
  checkIdentifier(node.iterator2, 'v-for iterator', text, warn, range);
}

function checkIdentifier(ident, type, text, warn, range) {
  if (typeof ident === 'string') {
    try {
      new Function("var " + ident + "=_");
    } catch (e) {
      warn("invalid " + type + " \"" + ident + "\" in expression: " + text.trim(), range);
    }
  }
}

function checkExpression(exp, text, warn, range) {
  try {
    new Function("return " + exp);
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);

    if (keywordMatch) {
      warn("avoid using JavaScript keyword as property name: " + "\"" + keywordMatch[0] + "\"\n  Raw expression: " + text.trim(), range);
    } else {
      warn("invalid expression: " + e.message + " in\n\n" + "    " + exp + "\n\n" + "  Raw expression: " + text.trim() + "\n", range);
    }
  }
}

function checkFunctionParameterExpression(exp, text, warn, range) {
  try {
    new Function(exp, '');
  } catch (e) {
    warn("invalid function parameter expression: " + e.message + " in\n\n" + "    " + exp + "\n\n" + "  Raw expression: " + text.trim() + "\n", range);
  }
}
/*  */


var range = 2;

function generateCodeFrame(source, start, end) {
  if (start === void 0) start = 0;
  if (end === void 0) end = source.length;
  var lines = source.split(/\r?\n/);
  var count = 0;
  var res = [];

  for (var i = 0; i < lines.length; i++) {
    count += lines[i].length + 1;

    if (count >= start) {
      for (var j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length) {
          continue;
        }

        res.push("" + (j + 1) + repeat$1(" ", 3 - String(j + 1).length) + "|  " + lines[j]);
        var lineLength = lines[j].length;

        if (j === i) {
          // push underline
          var pad = start - (count - lineLength) + 1;
          var length = end > count ? lineLength - pad : end - start;
          res.push("   |  " + repeat$1(" ", pad) + repeat$1("^", length));
        } else if (j > i) {
          if (end > count) {
            var length$1 = Math.min(end - count, lineLength);
            res.push("   |  " + repeat$1("^", length$1));
          }

          count += lineLength + 1;
        }
      }

      break;
    }
  }

  return res.join('\n');
}

function repeat$1(str, n) {
  var result = '';

  if (n > 0) {
    while (true) {
      // eslint-disable-line
      if (n & 1) {
        result += str;
      }

      n >>>= 1;

      if (n <= 0) {
        break;
      }

      str += str;
    }
  }

  return result;
}
/*  */


function createFunction(code, errors) {
  try {
    return new Function(code);
  } catch (err) {
    errors.push({
      err: err,
      code: code
    });
    return noop;
  }
}

function createCompileToFunctionFn(compile) {
  var cache = Object.create(null);
  return function compileToFunctions(template, options, vm) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;
    /* istanbul ignore if */

    if ("development" !== 'production') {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1('It seems you are using the standalone build of Vue.js in an ' + 'environment with Content Security Policy that prohibits unsafe-eval. ' + 'The template compiler cannot work in this environment. Consider ' + 'relaxing the policy to allow unsafe-eval or pre-compiling your ' + 'templates into render functions.');
        }
      }
    } // check cache


    var key = options.delimiters ? String(options.delimiters) + template : template;

    if (cache[key]) {
      return cache[key];
    } // compile


    var compiled = compile(template, options); // check compilation errors/tips

    if ("development" !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(function (e) {
            warn$$1("Error compiling template:\n\n" + e.msg + "\n\n" + generateCodeFrame(template, e.start, e.end), vm);
          });
        } else {
          warn$$1("Error compiling template:\n\n" + template + "\n\n" + compiled.errors.map(function (e) {
            return "- " + e;
          }).join('\n') + '\n', vm);
        }
      }

      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(function (e) {
            return tip(e.msg, vm);
          });
        } else {
          compiled.tips.forEach(function (msg) {
            return tip(msg, vm);
          });
        }
      }
    } // turn code into functions


    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors);
    }); // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use

    /* istanbul ignore if */

    if ("development" !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1("Failed to generate render function:\n\n" + fnGenErrors.map(function (ref) {
          var err = ref.err;
          var code = ref.code;
          return err.toString() + " in\n\n" + code + "\n";
        }).join('\n'), vm);
      }
    }

    return cache[key] = res;
  };
}
/*  */


function createCompilerCreator(baseCompile) {
  return function createCompiler(baseOptions) {
    function compile(template, options) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];

      var warn = function (msg, range, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        if ("development" !== 'production' && options.outputSourceRange) {
          // $flow-disable-line
          var leadingSpaceLength = template.match(/^\s*/)[0].length;

          warn = function (msg, range, tip) {
            var data = {
              msg: msg
            };

            if (range) {
              if (range.start != null) {
                data.start = range.start + leadingSpaceLength;
              }

              if (range.end != null) {
                data.end = range.end + leadingSpaceLength;
              }
            }

            (tip ? tips : errors).push(data);
          };
        } // merge custom modules


        if (options.modules) {
          finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
        } // merge custom directives


        if (options.directives) {
          finalOptions.directives = extend(Object.create(baseOptions.directives || null), options.directives);
        } // copy other options


        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      finalOptions.warn = warn;
      var compiled = baseCompile(template.trim(), finalOptions);

      if ("development" !== 'production') {
        detectErrors(compiled.ast, warn);
      }

      compiled.errors = errors;
      compiled.tips = tips;
      return compiled;
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    };
  };
}
/*  */
// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.


var createCompiler = createCompilerCreator(function baseCompile(template, options) {
  var ast = parse(template.trim(), options);

  if (options.optimize !== false) {
    optimize(ast, options);
  }

  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  };
});
/*  */

var ref$1 = createCompiler(baseOptions);
var compile = ref$1.compile;
var compileToFunctions = ref$1.compileToFunctions;
/*  */
// check whether current browser encodes a char inside attribute values

var div;

function getShouldDecode(href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0;
} // #3663: IE encodes newlines inside attribute values while other browsers don't


var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false; // #6828: chrome encodes content in a[href]

var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;
/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML;
});
var mount = Vue.prototype.$mount;

Vue.prototype.$mount = function (el, hydrating) {
  el = el && query(el);
  /* istanbul ignore if */

  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn("Do not mount Vue to <html> or <body> - mount to normal elements instead.");
    return this;
  }

  var options = this.$options; // resolve template/el and convert to render function

  if (!options.render) {
    var template = options.template;

    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */

          if ("development" !== 'production' && !template) {
            warn("Template element not found or is empty: " + options.template, this);
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if ("development" !== 'production') {
          warn('invalid template option:' + template, this);
        }

        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }

    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        outputSourceRange: "development" !== 'production',
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;
      /* istanbul ignore if */

      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure("vue " + this._name + " compile", 'compile', 'compile end');
      }
    }
  }

  return mount.call(this, el, hydrating);
};
/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */


function getOuterHTML(el) {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

Vue.compile = compileToFunctions;
var _default = Vue;
exports.default = _default;
},{}],"functions/WPTB_ControlsManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Controls manager for builder element's control options
 *
 * It is a singleton class that will always be sending the referenced object to all callers.
 *
 * @return {{setControlData: setControlData, getControlData: (function(*): *), addControlScript: addControlScript, callControlScript: callControlScript}}
 * @class
 */
function ControlsManager() {
  var controlScripts = {};
  var controlData = {};
  var tableSettings = {
    settings: {}
  };
  var subscribers = {};
  /**
   * Get current table settings.
   *
   * @return {Object} current table settings
   */

  function getTableSettings() {
    return tableSettings.settings;
  }
  /**
   * Subscribe to table settings changes
   *
   * @param {string} id unique id for subscription
   * @param {Function} callback callback when an update happens
   */


  function subscribe(id, callback) {
    subscribers[id] = callback;

    if (typeof callback === 'function') {
      callback(getTableSettings());
    }
  }
  /**
   * Call subscribers on update.
   */


  function callSubscribers() {
    // eslint-disable-next-line array-callback-return
    Object.keys(subscribers).map(function (s) {
      if (Object.prototype.hasOwnProperty.call(subscribers, s)) {
        var callback = subscribers[s];

        if (typeof callback === 'function') {
          callback(getTableSettings());
        }
      }
    });
  }
  /**
   * Settings changed callback.
   *
   * @param {Object} input
   */


  function updateTableSettings(input) {
    if (input) {
      tableSettings.settings = _objectSpread({}, tableSettings.settings, {}, input);
      callSubscribers();
    }
  }
  /**
   * Attach to table settings changes.
   */


  function attachToSettingChanges() {
    document.addEventListener('wptb:table:generated', function () {
      var table = document.querySelector('.wptb-management_table_container .wptb-table-setup table');
      WPTB_Helper.controlsInclude(table, function (input) {
        return updateTableSettings(input);
      });
    }, true);
  }
  /**
   * Controls manager init.
   */


  function init() {
    attachToSettingChanges();
  }
  /**
   * Add a control element script to ControlsManager
   *
   * This is the register function for control items. Without registering the control items, you can not mount them from their inline underscore.js template. Keep the underscore.js template as clean as possible since all the work should be handled by the view element and not the business logic of the backend.
   *
   * @param {string} key control type key
   * @param {Function} script function to mount the control to view
   */


  function addControlScript(key, script) {
    controlScripts[key] = script;
  }
  /**
   * Call a control element and mount it to view
   *
   * This is the place where items are mounted on to the view. In the background already defined control logic will be called and mounted to the unique id html element.
   *
   * @param {string} key control type key that was registered with addControlScript
   * @param {any} args  arguments to call the script with
   */


  function callControlScript(key, args) {
    if (!controlScripts[key]) {
      throw new Error("Called control element not found: [".concat(key, "]"));
    }

    controlScripts[key](args);
  }
  /**
   * Register data for a control item
   *
   * Currently, when control items are defined in background, a data object with a needed data items are mounted with this function.
   *
   * @param {string} id control item unique id
   * @param {Object} data control item data
   */


  function setControlData(id, data) {
    controlData[id] = data;
  }
  /**
   * Retrieve data for a control item
   *
   * Data objects that are registered for specific control items can be fetched with the  correct id. With this way, components can reach their data with the correct unique keys.
   *
   * @param {string} id control item unique key
   * @param {boolean} suppress suppress error message upon not founding data
   * @return {Object} data associated with control item
   */


  function getControlData(id) {
    var suppress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!controlData[id] && !suppress) {
      throw new Error("Control data for [".concat(id, "] not found."));
    }

    return controlData[id];
  }

  return {
    getTableSettings: getTableSettings,
    init: init,
    addControlScript: addControlScript,
    callControlScript: callControlScript,
    setControlData: setControlData,
    getControlData: getControlData,
    subscribe: subscribe
  };
}
/**
 * @module ControlsManager module
 */


var _default = ControlsManager();

exports.default = _default;
},{}],"components/IntersectionObserver.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
var _default = {
  props: ['relativeElement', 'forceHide'],
  data: function data() {
    return {
      listening: false
    };
  },
  watch: {
    relativeElement: function relativeElement() {
      if (this.relativeElement && !this.listening) {
        this.relativeElement.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
        this.listening = true;
      }
    }
  },
  methods: {
    handleScroll: function handleScroll() {
      if (this.forceHide) {
        return;
      }

      var scrollAmount = this.relativeElement.scrollTop;
      var posY = this.$refs.observerElement.offsetTop;
      var relativeHeight = this.relativeElement.clientHeight;

      if (scrollAmount + relativeHeight >= posY) {
        this.$emit('visible');
      }
    }
  }
};
exports.default = _default;
        var $7aa961 = exports.default || module.exports;
      
      if (typeof $7aa961 === 'function') {
        $7aa961 = $7aa961.options;
      }
    
        /* template */
        Object.assign($7aa961, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "observerElement" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"functions/selector.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Selector helper functions for element data retrieval.
 *
 * One of the advanced functionality of selector module is, it can get/set values with a defined format so only raw values will be get and formatted values can be set. Format replace string is {$}. This operator will be replaced with the raw value of the control element. For example; a format of '{$}px' will be translated to '15px' in a control with a value of 15. When getting that value, 15 will be returned. While setting it, this value will be formatted into '15px'.
 *
 * Supported operation types:
 *    dataset
 *    class
 *    style
 *    attribute
 */

/**
 * Select element operation to get/set certain element attributes/properties.
 *
 * @param {HTMLElement} element html element
 * @param {string} type element attribute/property type
 * @returns {DOMStringMap|(function(): *)| string} suitable operation for supplied arguments
 */
function operationSelect(element, type) {
  var operation = null;

  switch (type) {
    case 'dataset':
      operation = element.dataset;
      break;

    case 'style':
      operation = element.style;
      break;

    case 'class':
      operation = 'class';
      break;

    case 'attribute':
      operation = 'attribute';
      break;

    default:
      operation = element.dataset;
      break;
  }

  return operation;
}
/**
 * Get value of HTMLElement.
 *
 * Supported value types: dataset, style, classList
 *
 * @param {string} selector query string for element search
 * @returns {{value: *, elements: *[]}}  returns an object of elements and its queried value
 */


function getTargetValue(selector) {
  var query = selector.query,
      type = selector.type,
      key = selector.key,
      format = selector.format;

  var elements = _toConsumableArray(document.querySelectorAll(query));

  if (elements.length > 0) {
    var operation = operationSelect(elements[0], type);

    if (operation) {
      var value;

      if (operation === 'class') {
        value = elements[0].getAttribute('class');
      } else if (operation === 'attribute') {
        value = elements[0].getAttribute(key);
      } else {
        value = operation[key];
      }

      if (format) {
        var regExpFormat = format.replace('{$}', '(.+)');
        var testResult;
        var regExp = new RegExp("^".concat(regExpFormat, "$"), 'g');

        if (operation === 'class') {
          value.split(' ').some(function (s) {
            var result = regExp.exec(s);

            if (result === null) {
              return false;
            }

            testResult = result;
            return true;
          });
        } else {
          testResult = regExp.exec(value);
        }

        if (testResult) {
          // eslint-disable-next-line prefer-destructuring
          value = testResult[1];
        } else {
          value = null;
        }
      }

      return {
        elements: elements,
        value: value,
        type: type,
        key: key,
        format: format
      };
    }
  }

  throw new Error("no related operation found with a type of [".concat(type, "]"));
}
/**
 * Set value for an individual selector object.
 *
 * @param {object} selector selector object
 * @param {any} value value to be assigned to selector element
 */


function setTargetValue(selector, value) {
  var elements = selector.elements,
      type = selector.type,
      key = selector.key,
      format = selector.format;

  if (Array.isArray(elements) && elements.length > 0) {
    // eslint-disable-next-line array-callback-return
    elements.map(function (s) {
      var operation = operationSelect(s, type); // class type specific operations

      if (operation === 'class') {
        var currentClass = null;
        var val; // find if another class with the same format is present
        // if it is, it will signal us that this class should be removed before our formatted class can be added. this way class toggle operation will be provided with different class names with the same format
        // eslint-disable-next-line no-restricted-syntax

        var _iterator = _createForOfIteratorHelper(s.classList.entries()),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2);

            val = _step$value[1];
            var regExpFormat = format.replace('{$}', '(.+)');
            var match = val.match("^".concat(regExpFormat, "$"));

            if (match) {
              var _match = _slicedToArray(match, 2);

              currentClass = _match[1];
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (currentClass) {
          var toggleClass = format.replace('{$}', currentClass); // remove any class with the same format for toggle operation

          s.classList.remove(toggleClass);
        }

        var addClass = format.replace('{$}', value);
        s.classList.add(addClass);
      } else {
        var tempVal = value;

        if (format) {
          tempVal = format.replace('{$}', value);
          tempVal = tempVal.replace(new RegExp(/\\/g), '');
        }

        if (operation === 'attribute') {
          s.setAttribute(key, tempVal);
        } else {
          operation[key] = tempVal;
        }
      }
    });
  }
}
/**
 * Set values of target selectors.
 *
 * @param {array} selectors an array of selector objects
 * @param {any} value value to be assigned to selector elements
 */


function setAllValues(selectors, value) {
  // eslint-disable-next-line array-callback-return
  selectors.map(function (s) {
    setTargetValue(s, value);
  });
}
/**
 * Get all values from an array of selectors.
 *
 * @param {array} selectors an array of selector objects
 * @returns {{startupValue: null, elements: []}} object with selector values
 */


function getAllValues(selectors) {
  var allObj = {
    elements: [],
    startupValue: null
  }; // eslint-disable-next-line array-callback-return

  selectors.map(function (s) {
    var elementValue = getTargetValue(s);
    allObj.elements.push(getTargetValue(s));

    if (s.useAsStartup) {
      allObj.startupValue = elementValue;
    }
  }); // if no startup value is defined, use the value of the first element

  if (!allObj.startupValue) {
    allObj.startupValue = allObj.elements[0].value;
  }

  return allObj;
}
/**
 * @module selector module
 */


var _default = {
  getTargetValue: getTargetValue,
  getAllValues: getAllValues,
  setTargetValue: setTargetValue,
  setAllValues: setAllValues
};
exports.default = _default;
},{}],"mixins/ControlBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _selector = _interopRequireDefault(require("../functions/selector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Base mixin for control items
 */
var ControlBase = {
  props: {
    label: String,
    selectors: {
      type: Array,
      required: false,
      default: function _default() {
        return [];
      }
    },
    defaultValue: null,
    uniqueId: {
      type: String,
      required: false,
      default: ''
    },
    elemContainer: {
      type: String,
      required: false,
      default: ''
    },
    appearDependOnControl: {
      type: Object,
      required: false,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      startupValue: null,
      targetElements: [],
      elementMainValue: '',
      mountedDataUpdate: false,
      tableSettings: {
        settings: {}
      },
      componentVisibility: true,
      cachedDependedValues: {},
      // change this value to true on expanded component to automatically assign default values at component mounted state
      assignDefaultValueAtMount: false
    };
  },
  watch: {
    'tableSettings.settings': {
      handler: function handler() {
        this.updateComponentVisibility();
      },
      deep: true
    },
    cachedDependedValues: {
      handler: function handler() {
        this.calculateComponentVisibility();
      },
      deep: true
    }
  },
  mounted: function mounted() {
    var _this = this;

    // find and retrieve selector elements
    if (this.selectors.length > 0) {
      // const operationObj = selectorOperations.getAllValues(this.selectors);
      // this.targetElements = operationObj.elements;
      var operationObj = this.getTargetElements();
      this.startupValue = operationObj.startupValue;
    }

    this.$nextTick(function () {
      _this.tableSettings = WPTB_ControlsManager.getTableSettings();

      _this.getInputLoadedValues();

      if (_this.assignDefaultValueAtMount) {
        _this.assignDefaultValue();
      }
    });
  },
  methods: {
    calculateComponentVisibility: function calculateComponentVisibility() {
      var _this2 = this;

      this.componentVisibility = Object.keys(this.appearDependOnControl).every(function (controlName) {
        if (Object.prototype.hasOwnProperty.call(_this2.appearDependOnControl, controlName)) {
          if (Object.keys(_this2.cachedDependedValues).includes(controlName)) {
            return _this2.cachedDependedValues[controlName] === _this2.appearDependOnControl[controlName];
          }

          return false;
        }
      });
    },
    getInputLoadedValues: function getInputLoadedValues() {
      var _this3 = this;

      var leftPanel = document.querySelector('.wptb-panel-left');
      var allInputs = Array.from(leftPanel.querySelectorAll('input')); // eslint-disable-next-line array-callback-return

      allInputs.map(function (input) {
        var classList = input.getAttribute('class'); // eslint-disable-next-line array-callback-return

        Object.keys(_this3.appearDependOnControl).map(function (d) {
          if (classList) {
            if (classList.includes(d)) {
              var val = input.value;

              if (input.type === 'checkbox') {
                val = input.checked ? 'checked' : 'unchecked';
              }

              _this3.$set(_this3.cachedDependedValues, d, val);
            }
          }
        });
      });
    },
    updateComponentVisibility: function updateComponentVisibility() {
      var _this4 = this;

      if (this.tableSettings.settings) {
        // eslint-disable-next-line array-callback-return
        Object.keys(this.tableSettings.settings).map(function (s) {
          if (Object.prototype.hasOwnProperty.call(_this4.tableSettings.settings, s)) {
            if (Object.keys(_this4.appearDependOnControl).includes(s)) {
              _this4.$set(_this4.cachedDependedValues, s, _this4.tableSettings.settings[s]);
            }
          }
        });
      }
    },

    /**
     * Get target elements of the selector.
     *
     * @return {null|Object}} null if no selector is defined or operation object
     */
    getTargetElements: function getTargetElements() {
      if (this.selectors.length > 0) {
        var operationObj = _selector.default.getAllValues(this.selectors);

        this.targetElements = operationObj.elements;
        return operationObj;
      }

      return null;
    },

    /**
     * Generate a control value changed event.
     *
     * @param {any} value value to be emitted
     */
    generateChangeEvent: function generateChangeEvent(value) {
      var _this5 = this;

      // eslint-disable-next-line array-callback-return
      this.targetElements.map(function (t) {
        // eslint-disable-next-line array-callback-return
        t.elements.map(function (el) {
          WPTB_Helper.wptbDocumentEventGenerate("wptb-control:".concat(_this5.uniqueId), el, {
            value: value
          });
        });
      });
    },

    /**
     * Assign startup value of default selector to the main element value.
     *
     * This startup value will be fetched from the DOM element according to the default selector objects properties. If no startup value is found, then defaultValue prop will be used
     */
    assignDefaultValue: function assignDefaultValue() {
      if (this.startupValue !== undefined && this.startupValue !== '' && this.startupValue !== null) {
        this.mountedDataUpdate = true;
        this.elementMainValue = this.startupValue;
      } else if (this.defaultValue !== null) {
        this.mountedDataUpdate = true;
        this.elementMainValue = this.defaultValue;
      }
    },

    /**
     * Sets the value of the selector object.
     *
     * @param {Object} selectorObj selector object
     * @param {any} value value to be set
     */
    setTargetValue: function setTargetValue(selectorObj, value) {
      _selector.default.setTargetValue(selectorObj, value);
    },

    /**
     * Set the value to all selector objects.
     *
     * @param {any} value value to be assigned to all selector objects
     */
    setAllValues: function setAllValues(value) {
      _selector.default.setAllValues(this.targetElements, value);
    },

    /**
     * Sets the current table as modified.
     *
     * @param {boolean} checkMountedState whether to check if value is updated at mounted hook. This check can be done to make sure assigning default value or saved value that has been fetched from the target selector element will not set the table as dirty at mount.
     */
    setTableDirty: function setTableDirty() {
      var checkMountedState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (checkMountedState) {
        if (!this.mountedDataUpdate) {
          new WPTB_TableStateSaveManager().tableStateSet();
        }
      } else {
        new WPTB_TableStateSaveManager().tableStateSet();
      }

      this.mountedDataUpdate = false;
    },

    /**
     * Reset mounted state of component.
     */
    resetMountedState: function resetMountedState() {
      this.mountedDataUpdate = true;
    },

    /**
     * Basic value update that will handle setting selector values, generating change event and setting table dirty.
     *
     * @param {*} val value
     * @param {boolean} checkMountedState check for mounted state of component
     */
    basicValueUpdate: function basicValueUpdate(val) {
      var checkMountedState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.setAllValues(val);
      this.generateChangeEvent(val);
      this.setTableDirty(checkMountedState);
    }
  }
};
/**
 * @module ControlBase module
 */

var _default = ControlBase;
exports.default = _default;
},{"../functions/selector":"functions/selector.js"}],"containers/IconSelectControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IntersectionObserver = _interopRequireDefault(require("../components/IntersectionObserver"));

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    label: String,
    icons: Object,
    perPage: {
      type: Number,
      default: 20
    }
  },
  mixins: [_ControlBase.default],
  components: {
    IntersectionObserver: _IntersectionObserver.default
  },
  data: function data() {
    return {
      selectedIcon: {
        url: null,
        name: null
      },
      openDrawer: false,
      innerDrawerRef: null,
      paginationIndex: 1,
      observerHide: false,
      debunkedFilterText: '',
      debunkId: -1,
      filterText: '',
      drawerPosition: {
        left: 0
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    document.addEventListener('keyup', function (e) {
      if (e.code === 'Escape' && _this.openDrawer) {
        _this.setDrawerState(false);
      }
    });
    this.assignDefaultValue();
    var selectedIcon = this.elementMainValue;
    this.selectedIcon.name = selectedIcon === '' ? null : selectedIcon;
    this.selectedIcon.url = selectedIcon === '' ? null : this.icons[selectedIcon];
  },
  watch: {
    debunkedFilterText: function debunkedFilterText(n) {
      var _this2 = this;

      clearTimeout(this.debunkId);
      this.debunkId = setTimeout(function () {
        _this2.filterText = n;
      }, 500);
    },
    selectedIcon: {
      handler: function handler() {
        var _this3 = this;

        // refresh list of targetElements
        this.getTargetElements();
        var targetObjs = this.targetElements[0].elements;

        if (targetObjs && Array.isArray(targetObjs)) {
          if (this.selectedIcon.url) {
            fetch(this.selectedIcon.url).then(function (r) {
              return r.text();
            }).then(function (resp) {
              _this3.setTargetValue(_this3.targetElements[0], _this3.selectedIcon.name);

              var range = document.createRange(); // eslint-disable-next-line array-callback-return

              targetObjs.map(function (s) {
                // eslint-disable-next-line no-param-reassign
                s.innerHTML = '';
                range.setStart(s, 0);
                var newSvgElement = range.createContextualFragment(resp);
                s.appendChild(newSvgElement);
              });
            });
          } else {
            this.setTargetValue(this.targetElements[0], ''); // eslint-disable-next-line array-callback-return

            targetObjs.map(function (s) {
              // eslint-disable-next-line no-param-reassign
              s.innerHTML = '';
            });
          }
        }
      },
      deep: true
    }
  },
  methods: {
    setDrawerState: function setDrawerState(state) {
      this.openDrawer = state;
    },
    fullIconList: function fullIconList() {
      var _this4 = this;

      return Object.keys(this.icons).filter(function (k) {
        return k.includes(_this4.filterText);
      }).slice(0, this.paginationIndex * this.perPage).reduce(function (result, key) {
        // eslint-disable-next-line no-param-reassign
        result[key] = _this4.icons[key];
        return result;
      }, {});
    },
    toggleIconDrawer: function toggleIconDrawer() {
      this.calculateDrawerPosition();
      this.openDrawer = !this.openDrawer;
      this.innerDrawerRef = this.$refs.drawerRefElement;
    },
    setIcon: function setIcon(iconName, iconUrl) {
      this.selectedIcon.url = iconUrl;
      this.selectedIcon.name = iconName;
      this.toggleIconDrawer();
      this.setTableDirty();
    },
    observerVisible: function observerVisible() {
      this.paginationIndex += 1;
    },
    calculateDrawerPosition: function calculateDrawerPosition() {
      var xPadding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
      var buttonElement = this.$refs.iconSelectButton;
      var posObject = buttonElement.getBoundingClientRect();
      var drawerLeft = posObject.x + posObject.width + xPadding;
      var drawerTop = posObject.y;
      this.drawerPosition.top = this.toPx(drawerTop);
      this.drawerPosition.left = this.toPx(drawerLeft);
    },
    toPx: function toPx(val) {
      return "".concat(val, "px");
    }
  }
};
exports.default = _default;
        var $4a7874 = exports.default || module.exports;
      
      if (typeof $4a7874 === 'function') {
        $4a7874 = $4a7874.options;
      }
    
        /* template */
        Object.assign($4a7874, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wptb-settings-row wptb-settings-middle-xs" },
    [
      _c("div", { staticClass: "wptb-settings-space-between" }, [
        _c("p", { staticClass: "wptb-settings-item-title" }, [
          _vm._v(_vm._s(_vm.label))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "wptb-icon-select-wrapper" }, [
          _c("div", { staticClass: "wptb-icon-select-display" }, [
            _c(
              "div",
              {
                ref: "iconSelectButton",
                staticClass: "wptb-icon-select-preview",
                on: { click: _vm.toggleIconDrawer }
              },
              [_c("img", { attrs: { src: _vm.selectedIcon.url } })]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.openDrawer,
                    expression: "openDrawer"
                  }
                ],
                staticClass:
                  "wptb-icon-select-drawer wptb-plugin-box-shadow-md",
                style: _vm.drawerPosition
              },
              [
                _c("div", { staticClass: "wptb-icon-search-wrapper" }, [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model.trim",
                        value: _vm.debunkedFilterText,
                        expression: "debunkedFilterText",
                        modifiers: { trim: true }
                      }
                    ],
                    attrs: { type: "text", placeholder: "Search for icons..." },
                    domProps: { value: _vm.debunkedFilterText },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.debunkedFilterText = $event.target.value.trim()
                      },
                      blur: function($event) {
                        return _vm.$forceUpdate()
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    ref: "drawerRefElement",
                    staticClass: "wptb-icon-previews"
                  },
                  [
                    _c("div", {
                      staticClass:
                        "wptb-icon-select-drawer-preview wptb-icon-reset",
                      on: {
                        click: function($event) {
                          return _vm.setIcon("", "")
                        }
                      }
                    }),
                    _vm._v(" "),
                    _vm._l(_vm.fullIconList(), function(iconUrl, name) {
                      return _c(
                        "div",
                        {
                          key: name,
                          staticClass: "wptb-icon-select-drawer-preview",
                          class: {
                            "wptb-icon-preview-active":
                              _vm.selectedIcon.name === name
                          }
                        },
                        [
                          _c("img", {
                            attrs: {
                              src: iconUrl,
                              title: name,
                              draggable: false
                            },
                            on: {
                              click: function($event) {
                                return _vm.setIcon(name, iconUrl)
                              }
                            }
                          })
                        ]
                      )
                    }),
                    _vm._v(" "),
                    _c(
                      "intersection-observer",
                      {
                        attrs: {
                          "relative-element": _vm.innerDrawerRef,
                          "force-hide": _vm.observerHide
                        },
                        on: { visible: _vm.observerVisible }
                      },
                      [
                        _c("div", {
                          staticClass: "wptb-icon-select-drawer-end"
                        })
                      ]
                    )
                  ],
                  2
                )
              ]
            )
          ])
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../components/IntersectionObserver":"components/IntersectionObserver.vue","../mixins/ControlBase":"mixins/ControlBase.js"}],"mountPoints/WPTB_IconSelectControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

var _IconSelectControl = _interopRequireDefault(require("../containers/IconSelectControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Icon Selection Control
 */
// eslint-disable-next-line camelcase
var _default = {
  name: 'ControlIconSelect',

  /**
   *    Icon control script implementation.
   *
   * @param {string} uniqueId unique id for control element
   */
  handler: function iconControlSelectJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId);

    if (data.defaultValue === undefined) {
      data.defaultValue = null;
    }

    new _vue.default({
      data: data,
      components: {
        IconSelectControl: _IconSelectControl.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js","../containers/IconSelectControl":"containers/IconSelectControl.vue"}],"components/NumberPostfixInput.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  inheritAttrs: false,
  props: {
    postFix: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      default: 0
    },
    // with this prop is enabled, width of the component will be calculated according to its contents
    enableDynamicWidth: {
      type: Boolean,
      default: false
    },
    // extra padding value that will be applied to input element
    dynamicWidthPadding: {
      type: Number,
      default: 3
    },
    // only enable data update with enter key down
    onlyEnter: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1000
    },
    step: {
      type: Number,
      default: 1
    },
    enableLimit: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'valueChanged'
  },
  watch: {
    value: function value(n) {
      this.innerValue = n;
    }
  },
  data: function data() {
    return {
      innerValue: 0
    };
  },
  mounted: function mounted() {
    this.innerValue = this.value;
  },
  computed: {
    /**
     * Add a post fix to the value.
     *
     * Value will be chosen from the component prop.
     */
    postFixIt: function postFixIt() {
      return "".concat(this.innerValue).concat(this.postFix);
    },

    /**
     * Calculate width of input element according to its contents.
     */
    dynamicWidth: function dynamicWidth() {
      if (this.enableDynamicWidth) {
        return {
          width: "calc(".concat(this.innerValue.toString().length + this.postFix.length + this.dynamicWidthPadding, "ch) !important")
        };
      }

      return {};
    }
  },
  methods: {
    /**
     * Retrieve integer from a string in the base of 10 and limit it between min/max values of the component.
     *
     * @param {number|string} val value
     * @return {number} retrieved integer
     */
    getValue: function getValue(val) {
      var parsedValue = Number.parseFloat(val); // get rid of unnecessary decimal points by fixing the number based on step value

      var regex = new RegExp(/^([0-9]+)\.([0-9]+)/, 'g');
      var match = regex.exec(this.step.toString());

      if (match) {
        var decimalPoint = match[2].length;
        parsedValue = Number.parseFloat(parsedValue.toFixed(decimalPoint));
      } // eslint-disable-next-line no-restricted-globals


      parsedValue = isNaN(parsedValue) ? 0 : parsedValue;
      return this.enableLimit ? this.limitValue(parsedValue) : parsedValue;
    },

    /**
     * Limit given value between min/max properties of the component.
     *
     * @param {number} val value to be limited
     */
    limitValue: function limitValue(val) {
      if (val < this.min) {
        return this.min;
      }

      if (val > this.max) {
        return this.max;
      }

      return val;
    },

    /**
     * Handle input value change.
     *
     * @param {Event} e input event
     */
    handleOnInput: function handleOnInput(e) {
      // don't update prop data if only enter key update is enabled
      if (!this.onlyEnter) {
        this.$emit('valueChanged', this.getValue(e.target.value));
      }
    },

    /**
     * Handle enter value change.
     *
     * @param {Event} e input event
     */
    handleEnterInput: function handleEnterInput(e) {
      // only update prop data if enter key update is enabled
      if (this.onlyEnter) {
        this.$emit('valueChanged', this.getValue(e.target.value));
      }
    },

    /**
     * Handle key press event for input
     *
     * This callback will give up/down arrow key press incrementation to input.
     *
     * @param {string} type type of key
     */
    handleKeyPress: function handleKeyPress() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'up';
      var value = this.getValue(this.innerValue);

      switch (type) {
        case 'up':
          value += this.step;
          break;

        case 'down':
          value -= this.step;
          break;

        default:
          value += this.step;
          break;
      }

      value = this.getValue(value);
      this.$emit('valueChanged', value);
    }
  }
};
exports.default = _default;
        var $ea3a7f = exports.default || module.exports;
      
      if (typeof $ea3a7f === 'function') {
        $ea3a7f = $ea3a7f.options;
      }
    
        /* template */
        Object.assign($ea3a7f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("input", {
    style: _vm.dynamicWidth,
    attrs: { type: "text", disabled: _vm.$attrs.disabled },
    domProps: { value: _vm.postFixIt },
    on: {
      input: _vm.handleOnInput,
      keydown: [
        function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "up", 38, $event.key, ["Up", "ArrowUp"])
          ) {
            return null
          }
          $event.preventDefault()
          return _vm.handleKeyPress("up")
        },
        function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "down", 40, $event.key, [
              "Down",
              "ArrowDown"
            ])
          ) {
            return null
          }
          $event.preventDefault()
          return _vm.handleKeyPress("down")
        },
        function($event) {
          if (
            !$event.type.indexOf("key") &&
            _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
          ) {
            return null
          }
          $event.preventDefault()
          return _vm.handleEnterInput($event)
        }
      ]
    }
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/RangeInput.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NumberPostfixInput = _interopRequireDefault(require("./NumberPostfixInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    NumberPostfixInput: _NumberPostfixInput.default
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    uniqueId: {
      type: String,
      default: ''
    },
    elemContainer: {
      type: String,
      default: ''
    },
    min: {
      type: Number,
      default: 1,
      required: false
    },
    max: {
      type: Number,
      default: 10,
      required: false
    },
    step: {
      type: Number,
      default: 1,
      required: false
    },
    elementMainValue: {
      type: null
    },
    postFix: {
      type: String,
      default: ''
    },
    clamp: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'elementMainValue',
    event: 'valueChanged'
  },
  data: function data() {
    return {
      innerElementMainValue: 0
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.innerElementMainValue = _this.elementMainValue;
    });
  },
  watch: {
    elementMainValue: function elementMainValue() {
      this.innerElementMainValue = this.elementMainValue;
    },
    innerElementMainValue: function innerElementMainValue(n) {
      this.$emit('valueChanged', this.clamp ? this.clampValue(n) : n);
    }
  },
  methods: {
    /**
     * Clamp the value between min/max range.
     *
     * @param {number} val value
     * @return {number} clamped value
     */
    clampValue: function clampValue(val) {
      if (val < this.min) {
        return this.min;
      }

      if (val > this.max) {
        return this.max;
      }

      return val;
    }
  }
};
exports.default = _default;
        var $515a53 = exports.default || module.exports;
      
      if (typeof $515a53 === 'function') {
        $515a53 = $515a53.options;
      }
    
        /* template */
        Object.assign($515a53, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wptb-range-input-wrapper" }, [
    _c(
      "div",
      {
        staticClass: "wptb-settings-item-header wptb-text-transform-cap",
        attrs: { "data-wptb-text-disabled": _vm.disabled }
      },
      [_vm._v("\n\t\t" + _vm._s(_vm.label) + "\n\t")]
    ),
    _vm._v(" "),
    _c("div", { staticClass: "wptb-settings-row wptb-settings-middle-xs" }, [
      _c("div", { staticClass: "wptb-settings-col-xs-8" }, [
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.innerElementMainValue,
              expression: "innerElementMainValue"
            }
          ],
          staticClass: "wptb-element-property wptb-size-slider",
          class: _vm.uniqueId,
          attrs: {
            type: "range",
            "data-element": _vm.elemContainer,
            "data-type": "range",
            min: _vm.min,
            max: _vm.max,
            step: _vm.step,
            disabled: _vm.disabled
          },
          domProps: { value: _vm.innerElementMainValue },
          on: {
            __r: function($event) {
              _vm.innerElementMainValue = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "wptb-settings-col-xs-4" },
        [
          _c("number-postfix-input", {
            staticClass:
              "wptb-size-number wptb-number-input wptb-element-property",
            class: _vm.uniqueId,
            staticStyle: { "text-align": "center" },
            attrs: {
              disabled: _vm.disabled,
              "post-fix": _vm.postFix,
              "only-enter": true,
              min: _vm.min,
              max: _vm.max,
              "data-element": _vm.elemContainer,
              step: _vm.step,
              "enable-limit": _vm.clamp,
              "data-type": "range"
            },
            model: {
              value: _vm.innerElementMainValue,
              callback: function($$v) {
                _vm.innerElementMainValue = $$v
              },
              expression: "innerElementMainValue"
            }
          })
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./NumberPostfixInput":"components/NumberPostfixInput.vue"}],"containers/RangeControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

var _RangeInput = _interopRequireDefault(require("../components/RangeInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    min: {
      type: Number,
      default: 1,
      required: false
    },
    max: {
      type: Number,
      default: 10,
      required: false
    },
    step: {
      type: Number,
      default: 1,
      required: false
    },
    defaultValue: {
      type: Number,
      default: 1,
      required: false
    },
    postFix: {
      type: String,
      default: ''
    }
  },
  mixins: [_ControlBase.default],
  components: {
    RangeInput: _RangeInput.default
  },
  mounted: function mounted() {
    this.assignDefaultValue();
  },
  watch: {
    elementMainValue: function elementMainValue(n) {
      var clampedValue = n;
      this.setAllValues(clampedValue); // check to see if this update occurs from startup data retrieval, if it is, don't mark table as dirty

      this.generateChangeEvent(clampedValue);
      this.setTableDirty(true);
    }
  }
};
exports.default = _default;
        var $eeeedf = exports.default || module.exports;
      
      if (typeof $eeeedf === 'function') {
        $eeeedf = $eeeedf.options;
      }
    
        /* template */
        Object.assign($eeeedf, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("range-input", {
    attrs: {
      label: _vm.label,
      "unique-id": _vm.uniqueId,
      "elem-container": _vm.elemContainer,
      min: _vm.min,
      max: _vm.max,
      step: _vm.step,
      "post-fix": _vm.postFix,
      clamp: true
    },
    model: {
      value: _vm.elementMainValue,
      callback: function($$v) {
        _vm.elementMainValue = $$v
      },
      expression: "elementMainValue"
    }
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/ControlBase":"mixins/ControlBase.js","../components/RangeInput":"components/RangeInput.vue"}],"mountPoints/WPTB_RangeControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _RangeControl = _interopRequireDefault(require("../containers/RangeControl"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Range slider control.
 */

/* eslint-disable camelcase */
var _default = {
  name: 'ControlRange',
  handler: function rangeControlJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId);

    new _vue.default({
      data: data,
      components: {
        RangeControl: _RangeControl.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../containers/RangeControl":"containers/RangeControl.vue","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js"}],"containers/Select2Control.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    options: Object
  },
  mixins: [_ControlBase.default],
  mounted: function mounted() {
    this.assignDefaultValue();
  },
  watch: {
    elementMainValue: function elementMainValue(n) {
      this.generateChangeEvent(n);
      this.setAllValues(n);
      this.setTableDirty(true);
    }
  }
};
exports.default = _default;
        var $72f762 = exports.default || module.exports;
      
      if (typeof $72f762 === 'function') {
        $72f762 = $72f762.options;
      }
    
        /* template */
        Object.assign($72f762, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wptb-settings-row wptb-settings-middle-xs" },
    [
      _c("div", { staticClass: "wptb-settings-space-between" }, [
        _c("p", { staticClass: "wptb-settings-item-title" }, [
          _vm._v(_vm._s(_vm.label))
        ]),
        _vm._v(" "),
        _c("div", [
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.elementMainValue,
                  expression: "elementMainValue"
                }
              ],
              ref: "selectElement",
              staticClass: "wptb-element-property",
              class: _vm.uniqueId,
              attrs: {
                "data-element": _vm.elemContainer,
                "data-type": "select2"
              },
              on: {
                change: function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.elementMainValue = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0]
                }
              }
            },
            _vm._l(_vm.options, function(value, key) {
              return _c("option", { key: key, domProps: { value: key } }, [
                _vm._v(_vm._s(value))
              ])
            }),
            0
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/ControlBase":"mixins/ControlBase.js"}],"mountPoints/WPTB_Select2Control.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _Select2Control = _interopRequireDefault(require("../containers/Select2Control"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Select2 control
 */
// eslint-disable-next-line camelcase
var _default = {
  name: 'Select2',
  handler: function select2ControlJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId);

    new _vue.default({
      data: data,
      components: {
        Select2Control: _Select2Control.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../containers/Select2Control":"containers/Select2Control.vue","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js"}],"containers/MediaSelectControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  mixins: [_ControlBase.default],
  props: {
    mediaAttr: {
      type: Object,
      required: false,
      default: function _default() {
        return {
          title: 'Media Select',
          button: {
            text: 'Select'
          },
          multiple: false
        };
      }
    }
  },
  data: function data() {
    return {
      frame: null
    };
  },
  mounted: function mounted() {
    this.assignDefaultValue();
  },
  watch: {
    elementMainValue: function elementMainValue(n) {
      this.setAllValues(n);
      this.setTableDirty(true);
    }
  },
  computed: {
    previewImageUrl: function previewImageUrl() {
      return "url(\"".concat(this.elementMainValue, "\")");
    }
  },
  methods: {
    open: function open() {
      var _this = this;

      if (this.frame) {
        this.frame.open();
      } else {
        this.frame = wp.media(this.mediaAttr);
        this.frame.on('select', function () {
          var _this$frame$state$get = _this.frame.state().get('selection').first().toJSON(),
              url = _this$frame$state$get.url;

          _this.elementMainValue = url;
        });
        this.frame.open();
      }
    },
    resetImg: function resetImg() {
      this.elementMainValue = '';
    }
  }
};
exports.default = _default;
        var $d9cab9 = exports.default || module.exports;
      
      if (typeof $d9cab9 === 'function') {
        $d9cab9 = $d9cab9.options;
      }
    
        /* template */
        Object.assign($d9cab9, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wptb-settings-row wptb-settings-middle-xs" },
    [
      _c("div", { staticClass: "wptb-settings-space-between" }, [
        _c("p", { staticClass: "wptb-settings-item-title" }, [
          _vm._v(_vm._s(_vm.label))
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "wptb-control-media-button-wrapper" }, [
          _c("div", {
            staticClass: "wptb-control-media-select-button",
            style: { backgroundImage: _vm.previewImageUrl },
            on: { click: _vm.open }
          }),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "wptb-control-media-clear-button",
              on: {
                "!click": function($event) {
                  return _vm.resetImg($event)
                }
              }
            },
            [_c("span", { staticClass: "dashicons dashicons-dismiss" })]
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/ControlBase":"mixins/ControlBase.js"}],"mountPoints/WPTB_MediaSelectControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _MediaSelectControl = _interopRequireDefault(require("../containers/MediaSelectControl"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Media select control
 */

/* eslint-disable camelcase */
var _default = {
  name: 'ControlMediaSelect',
  handler: function rangeControlJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId);

    new _vue.default({
      data: data,
      components: {
        MediaSelectControl: _MediaSelectControl.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../containers/MediaSelectControl":"containers/MediaSelectControl.vue","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js"}],"functions/DeBouncer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * ⛹️‍️Debounce class.
 *
 * Add a timeout to supplied function to delay its execution on certain situations, mostly in order to increase performance on repeating functions.
 *
 * @return {function} main debounce function
 * @constructor
 */
function DeBouncer() {
  var actionIds = {};
  /**
   * Main debounce function.
   *
   * @param {number} id unique id for action
   * @param {function} callable function to be called
   * @param {number} timeout timeout duration in milliseconds
   */

  function deBounce(id, callable) {
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;

    if (Object.keys(actionIds).includes(id)) {
      clearTimeout(actionIds[id]);
    }

    actionIds[id] = setTimeout(callable, timeout);
  }

  return deBounce;
}
/**
 * @module DeBouncer module
 */


var _default = DeBouncer();

exports.default = _default;
},{}],"components/TableClone.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DeBouncer = _interopRequireDefault(require("../functions/DeBouncer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
var _default = {
  props: {
    clone: {
      type: Boolean,
      default: false,
      required: false
    },
    cloneQuery: {
      type: String,
      required: true
    },
    tableDirectives: {
      type: String,
      default: ''
    },
    tableStyle: {
      type: Object,
      default: function _default() {
        // eslint-disable-next-line no-empty,no-lone-blocks
        {}
      }
    }
  },
  inheritAttrs: false,
  data: function data() {
    return {
      // in order to not mutate the prop sent from the parent component, will be modifying the data prop instead
      cloneInner: false,
      clonedTable: null,
      mainTable: null,
      tableDirectiveDatasetId: 'wptbResponsiveDirectives',
      tableHaveDirectives: false
    };
  },
  mounted: function mounted() {
    this.cloneInner = this.clone;
  },
  watch: {
    /**
     * Watch clone prop.
     *
     * In order to prevent the mutation of the prop sent by parent element, will be directing any value change coming from parent to data property.
     *
     * @param {boolean} n new value
     */
    clone: function clone(n) {
      this.cloneInner = n;
    },
    // switch to decide whether to clone the main table into responsive area or not
    cloneInner: function cloneInner(n) {
      if (n) {
        this.startClone();
        this.cloneInner = false;
      }
    },
    tableDirectives: function tableDirectives(n) {
      if (n) {
        this.addDirectivesToTable(n);
      }
    },
    'appOptions.identifyCells': {
      handler: function handler(n) {
        if (n) {
          this.showCellIdentification();
          this.appOptions.identifyCells = false;
        }
      }
    },
    'directives.responsiveEnabled': {
      handler: function handler(n) {
        if (n) {
          this.mainTable.dataset.wptbAdaptiveTable = 0;
        }
      }
    }
  },
  methods: {
    /**
     * Start clone operation.
     *
     * Basic logic of this clone operation is to clone the main table from table builder and mount it to referenced element at template. This way, we will have the exact same copy of the element from table builder, and will only focus on responsive functionality of it.
     */
    startClone: function startClone() {
      this.mainTable = document.querySelector(this.cloneQuery);

      if (!this.mainTable) {
        throw new Error("no clone target is found with a query value of ".concat(this.cloneQuery));
      } // check for legacy responsive functionality on main table


      this.appOptions.hasLegacyResponsive = this.mainTable.dataset.wptbAdaptiveTable === '1';
      this.clonedTable = this.mainTable.cloneNode(true);
      this.clonedTable.classList.add('wptb-plugin-box-shadow-xl');
      this.$refs.tableClone.appendChild(this.clonedTable); // directives that are already present in the main table
      // this directives may be saved from on another session of table builder or added there in the current session, what matters is, always use the main table directives as the base of source and update the other directives currently available according to them

      var mainTableDirectives = this.mainTable.dataset[this.tableDirectiveDatasetId]; // since this component will be re-cloning the table at every visibility change of responsive menu, we should add necessary table directives to cloned table without waiting for them to be automatically added on change

      if (this.tableDirectives) {
        this.addDirectivesToTable(this.tableDirectives);
      } // switch for determining if we will merge already present directives at main table


      this.tableHaveDirectives = mainTableDirectives !== undefined;
      this.setupCellIdentification(this.clonedTable); // emit an event signalling cloning main table is completed

      this.$emit('tableCloned', mainTableDirectives, this.clonedTable);
    },

    /**
     * Add directives to dataset of cloned table and main table.
     *
     * @param {string} n new directives
     */
    addDirectivesToTable: function addDirectivesToTable(n) {
      if (this.clonedTable && this.mainTable) {
        // add directives to clone
        this.clonedTable.dataset[this.tableDirectiveDatasetId] = n; // add directives to main table

        this.mainTable.dataset[this.tableDirectiveDatasetId] = n; // emit an event signalling end of directive copy operation

        this.$emit('directivesCopied', this.tableHaveDirectives);
        this.tableHaveDirectives = false;
      }
    },

    /**
     * Setup cell identification elements.
     *
     * @param {HTMLElement} tableElement parent table element
     */
    setupCellIdentification: function setupCellIdentification(tableElement) {
      var cells = Array.from(tableElement.querySelectorAll('td')); // eslint-disable-next-line array-callback-return

      cells.map(function (c, i) {
        if (getComputedStyle(c).position !== 'relative') {
          // eslint-disable-next-line no-param-reassign
          c.style.position = 'relative';
        }

        var range = document.createRange();
        range.setStart(c, 0);
        var lightnessPercent = i % 2 === 0 ? 70 : 90;
        var style = "background-color: hsla(211, 25%, ".concat(lightnessPercent, "%, 80%)");
        var identifierStringRepresentation = "<div class=\"wptb-responsive-cell-identifier\" style=\"".concat(style, "\">").concat(i + 1, "</div>");
        var cellIdentifier = range.createContextualFragment(identifierStringRepresentation);
        c.appendChild(cellIdentifier.childNodes[0]);
      });
    },

    /**
     * Show cell identifications for table cells
     */
    showCellIdentification: function showCellIdentification() {
      var _this = this;

      var visibilityClass = 'wptb-responsive-show-cell-identifier';
      this.clonedTable.classList.add(visibilityClass);
      (0, _DeBouncer.default)('cellIdentification', function () {
        _this.clonedTable.classList.remove(visibilityClass);
      }, 2000);
    }
  }
};
exports.default = _default;
        var $e62505 = exports.default || module.exports;
      
      if (typeof $e62505 === 'function') {
        $e62505 = $e62505.options;
      }
    
        /* template */
        Object.assign($e62505, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wptb-responsive-clone-wrapper" }, [
    _c("div", { staticClass: "wptb-responsive-clone-inner-wrapper" }, [
      _c("div", { ref: "tableClone", style: _vm.tableStyle })
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../functions/DeBouncer":"functions/DeBouncer.js"}],"components/SliderStop.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NumberPostfixInput = _interopRequireDefault(require("./NumberPostfixInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    value: {
      type: Number,
      default: 0
    },
    rawValue: {
      type: Number,
      default: 0
    },
    active: {
      type: Boolean,
      default: false
    },
    stopId: String,
    enableBreakpointCustomization: {
      type: Boolean,
      default: false
    }
  },
  components: {
    NumberPostfixInput: _NumberPostfixInput.default
  },
  data: function data() {
    return {
      wrapperStyle: {
        left: 0,
        top: 0
      },
      innerRawValue: this.rawValue
    };
  },
  watch: {
    rawValue: function rawValue(n) {
      this.innerRawValue = n;
    },
    value: function value() {
      this.calculateStyle();
    },
    innerRawValue: function innerRawValue(n) {
      this.$emit('breakpointChange', n, this.stopId);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.calculateStyle();
    });
  },
  methods: {
    clickEvent: function clickEvent() {
      this.$emit('click', this.rawValue);
    },
    calculateStyle: function calculateStyle() {
      var wrapperElement = this.$refs.wrapper;
      var knobElement = this.$refs.knob;

      if (wrapperElement) {
        var _wrapperElement$getBo = wrapperElement.getBoundingClientRect(),
            width = _wrapperElement$getBo.width;

        this.wrapperStyle.left = "calc(".concat(this.value, "% - ").concat(width / 2, "px)");
      }

      if (knobElement) {
        var _knobElement$getBound = knobElement.getBoundingClientRect(),
            height = _knobElement$getBound.height;

        this.wrapperStyle.top = "-".concat(height / 2, "px");
      }
    }
  }
};
exports.default = _default;
        var $3c0812 = exports.default || module.exports;
      
      if (typeof $3c0812 === 'function') {
        $3c0812 = $3c0812.options;
      }
    
        /* template */
        Object.assign($3c0812, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "wrapper",
      staticClass: "wptb-slider-stop",
      class: { "wptb-slider-stop-active": _vm.active },
      style: _vm.wrapperStyle,
      on: {
        "!click": function($event) {
          $event.preventDefault()
          return _vm.clickEvent($event)
        }
      }
    },
    [
      _c("div", { ref: "knob", staticClass: "wptb-slider-stop-knob" }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "wptb-slider-stop-label" },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.enableBreakpointCustomization,
              expression: "enableBreakpointCustomization"
            }
          ]
        },
        [
          _c("number-postfix-input", {
            staticClass: "wptb-size-input",
            staticStyle: { "font-size": "90%" },
            attrs: {
              "enable-dynamic-width": true,
              "only-enter": true,
              "post-fix": "px"
            },
            model: {
              value: _vm.innerRawValue,
              callback: function($$v) {
                _vm.innerRawValue = $$v
              },
              expression: "innerRawValue"
            }
          })
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./NumberPostfixInput":"components/NumberPostfixInput.vue"}],"components/SliderFill.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
var _default = {
  props: {
    amount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    calculateStyle: function calculateStyle() {
      return {
        width: "".concat(this.amount, "%")
      };
    }
  }
};
exports.default = _default;
        var $1f3acb = exports.default || module.exports;
      
      if (typeof $1f3acb === 'function') {
        $1f3acb = $1f3acb.options;
      }
    
        /* template */
        Object.assign($1f3acb, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    staticClass: "wptb-screen-size-slider-fill",
    style: _vm.calculateStyle
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/SliderArrow.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    positionPercentage: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      style: {
        left: 0
      }
    };
  },
  watch: {
    positionPercentage: {
      handler: function handler() {
        this.calculateStyle();
      },
      deep: true
    }
  },
  mounted: function mounted() {
    this.calculateStyle();
  },
  methods: {
    calculateStyle: function calculateStyle() {
      var arrowWrapperElement = this.$refs.arrowWrapper;

      var _arrowWrapperElement$ = arrowWrapperElement.getBoundingClientRect(),
          width = _arrowWrapperElement$.width;

      this.style.left = "calc(".concat(this.positionPercentage, "% - ").concat(width / 2, "px)");
    },
    handleDrag: function handleDrag(e) {
      var screenX = e.screenX,
          screenY = e.screenY; // drag is interrupted/canceled prematurely

      if (screenX === 0 && screenY === 0) {
        return;
      }

      this.$emit('arrowDrag', e);
    }
  }
};
exports.default = _default;
        var $221e87 = exports.default || module.exports;
      
      if (typeof $221e87 === 'function') {
        $221e87 = $221e87.options;
      }
    
        /* template */
        Object.assign($221e87, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "arrowWrapper",
      staticClass: "wptb-screen-size-slider-arrow",
      style: _vm.style,
      attrs: { draggable: "true" },
      on: {
        drag: function($event) {
          $event.preventDefault()
          return _vm.handleDrag($event)
        },
        dragover: function($event) {
          $event.preventDefault()
        },
        dragend: function($event) {
          $event.preventDefault()
          return _vm.$emit("arrowDragEnd")
        },
        drop: function($event) {
          $event.preventDefault()
        },
        dragexit: function($event) {
          $event.preventDefault()
        },
        dragleave: function($event) {
          $event.preventDefault()
        }
      }
    },
    [
      _c(
        "svg",
        {
          attrs: {
            width: "17",
            height: "16",
            viewBox: "0 0 17 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }
        },
        [
          _c("path", {
            attrs: {
              d: "M8.5 16L0 0H17L8.5 16Z",
              fill: "var(--wptb-plugin-logo-color)"
            }
          })
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/ScreenSizeSlider.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _SliderStop = _interopRequireDefault(require("./SliderStop"));

var _SliderFill = _interopRequireDefault(require("./SliderFill"));

var _SliderArrow = _interopRequireDefault(require("./SliderArrow"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    stops: Object,
    // with endPadding, slider will ignore min/max values and calculate those with the supplied stops by adding/subtracting this endPadding prop
    endPadding: {
      type: Number,
      default: 0
    },
    modelVal: {
      type: Number,
      default: 0
    },
    enableBreakpointCustomization: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SliderStop: _SliderStop.default,
    SliderFill: _SliderFill.default,
    SliderArrow: _SliderArrow.default
  },
  data: function data() {
    return {
      min: 0,
      max: 100,
      currentVal: 0,
      isDragging: false,
      // minimum size between breakpoints to avoid them overlap or share the same breakpoint size
      minSizeBetweenBreakpoints: 100,
      repaintId: 0
    };
  },
  beforeMount: function beforeMount() {
    this.calculateMinMax();
  },
  watch: {
    currentVal: function currentVal() {
      this.$emit('slide', this.currentVal);
    },
    modelVal: function modelVal(n) {
      this.currentVal = Math.floor(n);
    },
    'directives.relativeWidth': {
      handler: function handler() {
        this.repaintId += 1;
      },
      deep: true
    }
  },
  methods: {
    handleBreakpointChange: function handleBreakpointChange(newSize, breakpointId) {
      var breakpointObj = this.directives.breakpoints;

      if (breakpointObj[breakpointId]) {
        var sortedIds = Object.keys(breakpointObj).sort(function (a, b) {
          return breakpointObj[a].width - breakpointObj[b].width;
        }); // limit assigning a higher or lower value then the changed breakpoints logical place

        var currentIndex = sortedIds.indexOf(breakpointId);
        var minSibling = sortedIds[currentIndex - 1];
        var maxSibling = sortedIds[currentIndex + 1];

        if (minSibling) {
          if (breakpointObj[minSibling].width >= newSize) {
            // eslint-disable-next-line no-param-reassign
            newSize = breakpointObj[minSibling].width + this.minSizeBetweenBreakpoints;
          }
        }

        if (maxSibling) {
          if (breakpointObj[maxSibling].width <= newSize) {
            // eslint-disable-next-line no-param-reassign
            newSize = breakpointObj[maxSibling].width - this.minSizeBetweenBreakpoints;
          }
        }

        breakpointObj[breakpointId].width = newSize;
        this.calculateMinMax();
        this.repaintId += 1;
      } else {
        throw new Error("no breakpoint found with the given ID: [".concat(breakpointId, "]"));
      }
    },

    /**
     * Calculate min/max values for the current slider.
     */
    calculateMinMax: function calculateMinMax() {
      var sortedValues = Object.values(this.stops).sort(function (a, b) {
        return (b.width - a.width) * -1;
      });
      this.min = sortedValues[0].width - this.endPadding;
      this.max = sortedValues[sortedValues.length - 1].width + this.endPadding;
      this.currentVal = sortedValues[sortedValues.length - 1].width;
    },

    /**
     * Translate the supplied value into percentage within the context of min/max values of slider.
     *
     * @param {Number} val value
     * @returns {number} percent
     */
    translateIntoPercent: function translateIntoPercent(val) {
      var range = this.max - this.min;
      return (val - this.min) * 100 / range;
    },
    slide: function slide(val) {
      this.currentVal = val;
    },
    handleArrowDrag: function handleArrowDrag(e) {
      this.isDragging = true;
      var sliderWrapper = this.$refs.sliderWrapper;

      var _sliderWrapper$getBou = sliderWrapper.getBoundingClientRect(),
          left = _sliderWrapper$getBou.left,
          width = _sliderWrapper$getBou.width; // relative position of arrow to the slider


      var relativePosition = e.clientX - left;
      var range = this.max - this.min; // value limited to range of min-max values

      var offsetVal = relativePosition * range / width; // floor the value to nearest integer

      this.currentVal = this.limitToRange(this.min + offsetVal);
    },

    /**
     * Limit given value to min/max values.
     *
     * @param {number} val value
     * @param {boolean} floor floor the value to nearest integer
     * @returns {number} limited value
     */
    limitToRange: function limitToRange(val) {
      var floor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var tempVal = val;

      if (val < this.min) {
        tempVal = this.min;
      }

      if (val > this.max) {
        tempVal = this.max;
      }

      if (floor) {
        tempVal = Math.floor(tempVal);
      }

      return tempVal;
    },

    /**
     * Calculate if given value represents the active section of the responsive range.
     *
     * @param {number} val value
     * @returns {boolean} is active
     */
    isStopActive: function isStopActive(val) {
      var _this = this;

      if (this.currentVal >= val) {
        var smallerVals = Object.values(this.stops).filter(function (s) {
          return s <= _this.currentVal;
        });
        return smallerVals.every(function (s) {
          return s <= val;
        });
      }

      return false;
    }
  }
};
exports.default = _default;
        var $a9eb9a = exports.default || module.exports;
      
      if (typeof $a9eb9a === 'function') {
        $a9eb9a = $a9eb9a.options;
      }
    
        /* template */
        Object.assign($a9eb9a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      key: _vm.repaintId,
      ref: "sliderWrapper",
      staticClass: "wptb-screen-size-slider-wrapper",
      class: { "wptb-drag-active": _vm.isDragging }
    },
    [
      _c(
        "div",
        { staticClass: "wptb-screen-size-slider-empty" },
        [
          _c("slider-arrow", {
            attrs: {
              "position-percentage": _vm.translateIntoPercent(
                _vm.limitToRange(_vm.currentVal)
              )
            },
            on: {
              arrowDrag: _vm.handleArrowDrag,
              arrowDragEnd: function($event) {
                _vm.isDragging = false
              }
            }
          }),
          _vm._v(" "),
          _c("slider-fill", {
            attrs: {
              amount: _vm.translateIntoPercent(_vm.limitToRange(_vm.currentVal))
            }
          }),
          _vm._v(" "),
          _vm._l(_vm.stops, function(ref, key) {
            var name = ref.name
            var width = ref.width
            return _c(
              "slider-stop",
              {
                key: key,
                attrs: {
                  active: _vm.isStopActive(width),
                  value: _vm.translateIntoPercent(width),
                  "raw-value": width,
                  "stop-id": key,
                  enableBreakpointCustomization:
                    _vm.enableBreakpointCustomization
                },
                on: {
                  click: _vm.slide,
                  breakpointChange: _vm.handleBreakpointChange
                }
              },
              [
                _vm._v(
                  _vm._s(
                    _vm.directives.relativeWidth === "window"
                      ? name
                      : width + "px"
                  ) + "\n\t\t"
                )
              ]
            )
          })
        ],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./SliderStop":"components/SliderStop.vue","./SliderFill":"components/SliderFill.vue","./SliderArrow":"components/SliderArrow.vue"}],"../../../../../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../../WPTB_ResponsiveFrontend.js":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Responsive class assignment for frontend operations.
 *
 * This file can be used as an UMD.
 */
(function assignToGlobal(key, context, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else {
    // eslint-disable-next-line no-param-reassign
    context[key] = factory();
  } // eslint-disable-next-line no-restricted-globals

})('WPTB_ResponsiveFrontend', self || global, function () {
  /**
   * Log a message to console.
   *
   * @param {string} message message to be logged
   * @param {string} type console log type (e.g info, warn, error)
   * @throws An error will be given for invalid type value
   */
  function logToConsole(message) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'log';

    if (typeof process !== 'undefined' && "development" === 'development') {
      if (console[type]) {
        console[type]("[WPTB]: ".concat(message));
      } else {
        throw new Error("no logging type found with given type value of [".concat(type, "]"));
      }
    }
  }
  /**
   * Object implementation for cell element operations.
   * If an empty cellElement parameter is given, a fresh cell element will be created.
   *
   * @param {HTMLElement | null} cellElement cell element
   * @param {null | CellObject} [isReference=null] main cell object if the current cell is a reference to that cell in cases like merged cells
   * @param reference
   * @class
   */


  function CellObject(cellElement) {
    var _this = this;

    var reference = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    // cell element
    this.element = cellElement;
    this.referenceObject = reference; // variable for deciding part of merged cells to be visible or not

    this.mergedRenderStatus = true; // connected merged cell references

    this.mergedCells = {
      row: [],
      column: []
    };
    /**
     * Get merged render status.
     *
     * @return {boolean} render status
     */

    this.getMergedRenderStatus = function () {
      return _this.mergedRenderStatus;
    };
    /**
     * Set merged render status.
     *
     * @param {boolean} status render status
     */


    this.setMergedRenderStatus = function (status) {
      _this.mergedRenderStatus = status;
    };
    /**
     * Add merged cells.
     *
     * @param {string} mergeType merge type
     * @param {CellObject} cellObj cell object instance
     */


    this.addToMergedCells = function (mergeType, cellObj) {
      _this.mergedCells[mergeType].push(cellObj);
    };
    /**
     * Determine if current cell is a reference to a main cell.
     *
     * @return {boolean} a reference or not
     */


    this.isReference = function () {
      return _this.referenceObject !== null;
    };

    if (this.isReference()) {
      this.element = cellElement.cloneNode(true);
    } // modifications object
    // this object will keep track of the modifications that has done to the cell to make sure we can roll them back to their original values


    this.modifications = {}; // spans object for cell's original merge values

    this.spans = {
      row: 1,
      col: 1
    };
    this.remainingSpans = {
      row: 0,
      col: 0
    };
    /**
     * Cache cell element's original span values.
     *
     * @private
     */

    this.cacheSpanValues = function () {
      // eslint-disable-next-line array-callback-return
      Object.keys(_this.spans).map(function (k) {
        if (Object.prototype.hasOwnProperty.call(_this.spans, k)) {
          var defaultVal = _this.spans[k];
          _this.spans[k] = _this.element.getAttribute("".concat(k, "Span")) || defaultVal;
        }
      });
    };

    this.cacheSpanValues();
    /**
     * Get original span value of cell object.
     *
     * @param {string} spanType span type, available values are row-column
     * @param {boolean} fromElement, instead of original value, get the assigned span value from HTMLElement itself
     * @param fromElement
     * @throws An error will be given for invalid span type
     */

    this.getSpan = function (spanType) {
      var fromElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var spanVal = fromElement ? _this.getElement().getAttribute("".concat(spanType, "Span")) : _this.spans[spanType];

      if (spanVal) {
        return spanVal;
      }

      throw new Error("no span value found with the given type of [".concat(spanType, "]"));
    };

    this.getRemainingSpans = function (spanType) {
      return _this.remainingSpans[spanType];
    };

    this.setRemainingSpans = function (spanType, value) {
      _this.remainingSpans[spanType] = value;
    };
    /**
     * Get cell element.
     *
     * @return {HTMLElement} cell element
     */


    this.getElement = function () {
      return _this.element;
    };
    /**
     * Create a cell element.
     *
     * @private
     * @return {HTMLTableDataCellElement}
     */


    this.createCellElement = function () {
      return document.createElement('td');
    }; // create a new cell element if no cellElement argument is given with constructor function


    if (!cellElement) {
      this.element = this.createCellElement();
    }
    /**
     * Add attribute to cell element.
     *
     * This function have the ability to add/remove attributes from cell element.
     * All attributes modified with this function will be cached with their before value for an easy reset on demand.
     *
     * @param {string} attributeKey attribute name in camelCase format, for sub-keys, use dot object notation
     * @param {any} attributeValue attribute value
     * @param {boolean} [append=false] append the value or replace it
     * @param {string} [glue=,] glue to join attribute value if append option is enabled
     */


    this.setAttribute = function (attributeKey, attributeValue) {
      var append = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var glue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';

      var defaultVal = _this.getElement()[attributeKey]; // if attribute value is a function or an object, it means we pulled a whole declaration instead of only inline attribute values, in that case, use getAttribute to get only inline values related to that attribute


      if (typeof defaultVal === 'function' || _typeof(defaultVal) === 'object') {
        defaultVal = _this.getElement().getAttribute(attributeKey);
      } // if there is already a default value defined, use that instead


      if (_this.modifications[attributeKey]) {
        defaultVal = _this.modifications[attributeKey].default;
      }

      var currentVal = defaultVal; // join attributes

      if (append) {
        currentVal += "".concat(currentVal).concat(glue).concat(attributeValue);
      } else {
        currentVal = attributeValue;
      }

      _this.modifications[attributeKey] = {
        value: currentVal,
        default: defaultVal
      };
      _this.getElement()[attributeKey] = currentVal;
    };
    /**
     * Set row/colspan for cell.
     *
     * @param {string} spanType span type
     * @param {number} value value to assign to span
     * @return {boolean} if any space left to render the element
     */


    this.setSpan = function (spanType, value) {
      // working on main cell
      if (!_this.isReference()) {
        var _valueToApply = _this.getSpan(spanType) - value < 0 ? _this.getSpan(spanType) : value;

        _this.setAttribute("".concat(spanType, "Span"), _valueToApply); // calculate remaining cells amount to merge in this span type


        _this.setRemainingSpans(spanType, _this.getSpan(spanType) - _valueToApply); // set visibility of connected merge group cells to false to not render them since we added necessary span values to main cell which will leak into their position


        for (var mc = 0; mc < _valueToApply - 1; mc += 1) {
          if (_this.mergedCells[spanType] && _this.mergedCells[spanType][mc]) {
            _this.mergedCells[spanType][mc].setMergedRenderStatus(false);
          }
        }

        return true;
      } // working on reference


      if (!_this.getMergedRenderStatus()) {
        return false;
      }

      var remainingVal = _this.referenceObject.getRemainingSpans(spanType); // no space left to put cell


      if (remainingVal === 0) {
        return false;
      }

      var valueToApply = remainingVal - value < 0 ? remainingVal : value;
      var remainingParentSpans = remainingVal - valueToApply;

      _this.referenceObject.setRemainingSpans(spanType, remainingParentSpans);

      _this.setAttribute("".concat(spanType, "Span"), valueToApply); // change render status of remaining connected merge cells


      if (remainingParentSpans !== 0) {
        var totalConnectedCells = _this.referenceObject.mergedCells[spanType].length;
        var startIndex = totalConnectedCells - remainingVal + 1;
        var endIndex = startIndex + valueToApply - 1;

        for (var _mc = startIndex; _mc < endIndex; _mc += 1) {
          _this.mergedCells[spanType][_mc].setMergedRenderStatus(false);
        }
      }

      return true;
    };
    /**
     * Reset a modified attribute to its default value
     *
     * @param {string} attributeKey attribute name
     */


    this.resetAttribute = function (attributeKey) {
      if (_this.modifications[attributeKey]) {
        _this.getElement()[attributeKey] = _this.modifications[attributeKey].default;
        _this.modifications[attributeKey] = undefined;
      }
    };
    /**
     * Reset all modified attributes of cell element to their default values.
     */


    this.resetAllAttributes = function () {
      // eslint-disable-next-line array-callback-return
      Object.keys(_this.modifications).map(function (k) {
        if (Object.prototype.hasOwnProperty.call(_this.modifications, k)) {
          _this.resetAttribute(k);
        }
      });
    };

    return {
      getElement: this.getElement,
      el: this.element,
      setAttribute: this.setAttribute,
      resetAllAttributes: this.resetAllAttributes,
      getSpan: this.getSpan,
      setSpan: this.setSpan,
      getRemainingSpans: this.getRemainingSpans,
      setRemainingSpans: this.setRemainingSpans,
      isReference: this.isReference,
      addToMergedCells: this.addToMergedCells,
      mergedCells: this.mergedCells,
      setMergedRenderStatus: this.setMergedRenderStatus,
      getMergedRenderStatus: this.getMergedRenderStatus
    };
  }

  CellObject.spanTypes = {
    row: 'row',
    column: 'col'
  };
  /**
   * Object implementation for table element operations.
   *
   * @param {HTMLElement} tableEl table element
   * @return {Object} instance
   * @class
   */

  function TableObject(tableEl) {
    var _this2 = this;

    /**
     * Table element.
     *
     * @private
     * @type {HTMLElement}
     */
    this.tableElement = tableEl;
    /**
     * Parsed table object.
     *
     * @private
     * @type {Array}
     */

    this.parsedTable = [];
    /**
     * An array of created table rows elements that are id'd according to their index in array.
     *
     * @type {[HTMLElement]}
     */

    this.rowCache = [];
    /**
     * Original table elements minus the cells.
     *
     * @type {{rows: []}}
     * @private
     */

    this.originals = {
      rows: []
    };
    /**
     * Row colors of original table.
     *
     * @type {{even: string, header: string, odd: string}}
     */

    this.rowColors = {
      header: null,
      even: null,
      odd: null
    };
    /**
     * Add cell to parsed array.
     *
     * @private
     * @param {number} r row id
     * @param {number} c column id
     * @param {CellObject} cellObject cell object to add to parsed array
     */

    this.addToParsed = function (r, c, cellObject) {
      if (!_this2.parsedTable[r]) {
        _this2.parsedTable[r] = [];
      }

      _this2.parsedTable[r][c] = cellObject;
    };
    /**
     * Assign table cells into row and column numbers.
     *
     * @private
     */


    this.parseTable = function () {
      var rows = Array.from(_this2.tableElement.querySelectorAll('tr')); // eslint-disable-next-line array-callback-return

      rows.map(function (r, ri) {
        // cache original rows for future use
        _this2.originals.rows.push(r);

        var cells = Array.from(r.querySelectorAll('td')); // eslint-disable-next-line array-callback-return

        cells.map(function (c, ci) {
          var currentCellObject = new CellObject(c);

          _this2.addToParsed(ri, ci, currentCellObject);

          var spanRow = currentCellObject.getSpan(CellObject.spanTypes.row);
          var spanCol = currentCellObject.getSpan(CellObject.spanTypes.column);

          if (spanRow > 1) {
            for (var sr = 1; sr < spanRow; sr += 1) {
              var referenceCell = new CellObject(c, currentCellObject);
              currentCellObject.addToMergedCells('row', referenceCell);

              _this2.addToParsed(ri + sr, ci, referenceCell);
            }
          }

          if (spanCol > 1) {
            for (var sc = 1; sc < spanCol; sc += 1) {
              var _referenceCell = new CellObject(c, currentCellObject);

              currentCellObject.addToMergedCells('column', _referenceCell);

              _this2.addToParsed(ri, ci + sc, _referenceCell);
            }
          }
        });
      });

      _this2.parseRowColors(rows);
    };
    /**
     * Parse row colors of original table for futures uses.
     *
     * @param {[HTMLElement]} rows html row elements
     * @private
     */


    this.parseRowColors = function (rows) {
      if (!rows || rows.length <= 0) {
        logToConsole('no rows are found to parse their colors', 'error');
      } // get row colors if they are defined as datasets on table element


      var headerDatasetColor = _this2.tableElement.dataset.wptbHeaderBackgroundColor;
      var evenRowDatasetColor = _this2.tableElement.dataset.wptbEvenRowBackgroundColor;
      var oddRowDatasetColor = _this2.tableElement.dataset.wptbOddRowBackgroundColor; // header row color

      _this2.rowColors.header = // eslint-disable-next-line no-nested-ternary
      headerDatasetColor !== undefined ? headerDatasetColor : rows[0].style.backgroundColor === '' ? null : rows[0].style.backgroundColor; // calculate needed number of rows to get even and odd row background colors
      // eslint-disable-next-line no-nested-ternary

      var rowsNeeded = rows.length / 3 >= 1 ? 0 : rows.length === 1 ? 2 : (rows.length - 1) % 2; // create additional rows and add them to table to get their row background colors since table row count may be lower to get even/odd rows

      for (var rn = 0; rn < rowsNeeded; rn += 1) {
        var tempRow = document.createElement('tr');

        _this2.tableElement.querySelector('tbody').appendChild(tempRow);

        rows.push(tempRow);
      } // even & odd row colors
      // dataset colors have priority over colors gathered from computed row styles


      _this2.rowColors.even = evenRowDatasetColor || getComputedStyle(rows[1]).backgroundColor;
      _this2.rowColors.odd = evenRowDatasetColor ? oddRowDatasetColor : getComputedStyle(rows[2]).backgroundColor; // remove created rows from DOM

      for (var r = 0; r < rowsNeeded; r += 1) {
        rows[rows.length - (r + 1)].remove();
      }
    };
    /**
     * Add a row to the table.
     *
     * @param {Array} classList an array of class names to be added to row
     * @param {boolean} fromOriginals use rows from original table instead of creating a new one
     * @param {number} originalIndex original row index
     */


    this.addRow = function (classList) {
      var fromOriginals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var originalIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (!Array.isArray(classList)) {
        // eslint-disable-next-line no-param-reassign
        classList = [classList];
      }

      var tableBody = _this2.tableElement.querySelector('tbody');

      var tempRow;

      if (!fromOriginals) {
        var range = document.createRange();
        range.setStart(tableBody, 0); // eslint-disable-next-line prefer-destructuring

        tempRow = range.createContextualFragment("<tr class=\"".concat(classList.join(' '), "\"></tr>")).childNodes[0];
      } else {
        tempRow = _this2.originals.rows[originalIndex];
      } // add row to table body


      tableBody.appendChild(tempRow); // cache row for future use

      _this2.rowCache.push(tempRow);

      return {
        el: tempRow,
        id: _this2.rowCache.length - 1
      };
    };
    /**
     * Clear the contents of table element.
     */


    this.clearTable = function () {
      // clear row cache
      _this2.rowCache = []; // clear children of `tbody` element

      _this2.tableElement.querySelector('tbody').innerHTML = '';
    };
    /**
     * Get row element from cache.
     *
     * @param {number} id row id
     * @return {null|HTMLElement} row element if present or null if not
     */


    this.getRow = function (id) {
      if (_this2.rowCache[id]) {
        return _this2.rowCache[id];
      } // eslint-disable-next-line no-console


      logToConsole("no row with id [".concat(id, "] found in the cache."), 'warn');
      return null;
    };
    /**
     * Get maximum number of rows available at table.
     *
     * @return {number} maximum amount of rows
     */


    this.maxRows = function () {
      return _this2.parsedTable.length;
    };
    /**
     * Get the number of maximum available column count in the table.
     *
     * @return {number} maximum available column count
     */


    this.maxColumns = function () {
      return _this2.parsedTable.reduce(function (p, c) {
        if (c.length > p) {
          // eslint-disable-next-line no-param-reassign
          p = c.length;
        }

        return p;
      }, 0);
    };
    /**
     * Get the table cell at specified row-column location.
     *
     * As in arrays, row and column numbering starts from number 0.
     *
     * @param {number} r row number
     * @param {number} c column number
     * @param {boolean} returnObject return object instead of HTMLElement
     * @return {HTMLElement | null | CellObject} element if address is possible, null if not
     */


    this.getCell = function (r, c) {
      var returnObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      try {
        if (_this2.parsedTable[r][c]) {
          if (returnObject) {
            return _this2.parsedTable[r][c];
          }

          return _this2.parsedTable[r][c].el;
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        logToConsole("no cell found at the given address of [".concat(r, "-").concat(c, "]"), 'warn');
        return null;
      } // eslint-disable-next-line no-console


      logToConsole("no cell found at the given address of [".concat(r, "-").concat(c, "]"), 'warn');
      return null;
    };
    /**
     * Get cells at a given row.
     *
     * @param {number} rowId row id
     * @param {boolean} returnObj return an array of CellObject instead
     * @return {Array} cells in row
     */


    this.getCellsAtRow = function (rowId) {
      var returnObj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var cells = [];

      for (var c = 0; c < _this2.maxColumns(); c += 1) {
        var tempCell = _this2.getCell(rowId, c, returnObj);

        if (tempCell) {
          cells.push(tempCell);
        }
      }

      return cells;
    };
    /**
     * Append the cell with given ids to a cached row
     *
     * @param {number} cellRowId cell row id
     * @param {number} cellColumnId cell column id
     * @param {number} rowId id of row in row cache
     */


    this.appendToRow = function (cellRowId, cellColumnId, rowId) {
      var cachedRow = _this2.getRow(rowId);

      var cell = _this2.getCell(cellRowId, cellColumnId, true);

      if (cell && cachedRow) {
        cachedRow.appendChild(cell.getElement());
      }

      return cell;
    };
    /**
     * Append html element to a cached row.
     *
     * @param {HTMLElement} el element
     * @param {number} rowId if of row in row cache
     */


    this.appendElementToRow = function (el, rowId) {
      var cachedRow = _this2.getRow(rowId);

      if (el && cachedRow) {
        cachedRow.appendChild(el);
      }
    };
    /**
     * Add cell object to a cached row.
     *
     * @param {CellObject} cellObj cell object
     * @param {number} rowId row id
     */


    this.appendObjectToRow = function (cellObj, rowId) {
      var cachedRow = _this2.getRow(rowId);

      if (cellObj && cachedRow) {
        cachedRow.appendChild(cellObj.getElement());
      }
    };

    this.parseTable();
    return {
      maxRows: this.maxRows,
      maxColumns: this.maxColumns,
      addRow: this.addRow,
      clearTable: this.clearTable,
      getCell: this.getCell,
      appendToRow: this.appendToRow,
      appendElementToRow: this.appendElementToRow,
      appendObjectToRow: this.appendObjectToRow,
      getCellsAtRow: this.getCellsAtRow,
      el: this.tableElement,
      rowColors: this.rowColors
    };
  } // default options for responsive class


  var responsiveClassDefaultOptions = {
    query: '.wptb-preview-table',
    defaultClasses: ['wptb-plugin-responsive-base'],
    bindToResize: false
  };
  /**
   * Class for handling operations related to responsive functionalities of tables.
   *
   * @class
   * @param {Object} options options object
   */

  function ResponsiveFront() {
    var _this3 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // merge default options with user sent options
    // this.options = { ...responsiveClassDefaultOptions, ...options };
    this.options = _objectSpread({}, responsiveClassDefaultOptions, {}, options);
    this.elements = Array.from(document.querySelectorAll(this.options.query));
    this.elementObjects = this.elements.map(function (e) {
      return {
        el: e,
        tableObject: new TableObject(e)
      };
    });
    /**
     * Bind rebuilding of tables to window resize event.
     */

    this.bindRebuildToResize = function () {
      window.addEventListener('resize', function () {
        _this3.rebuildTables();
      });
    };
    /**
     * Get responsive directives of table element.
     *
     * @private
     * @param {HTMLElement} el table element
     * @return {Object | null} JSON representation of the directive element, if not available, null will be returned
     */


    this.getDirective = function (el) {
      var directiveString = el.dataset.wptbResponsiveDirectives;

      if (!directiveString) {
        return null;
      }

      return JSON.parse(atob(directiveString));
    };
    /**
     * Add default classes to rebuilt tables.
     *
     * This classes are added to lay out a base style for the responsive table.
     *
     * @param {HTMLElement} el table element
     */


    this.addDefaultClasses = function (el) {
      el.classList.add(_this3.options.defaultClasses);
    };
    /**
     * Remove default classes from target table.
     *
     * @param {HTMLElement} el table element
     */


    this.removeDefaultClasses = function (el) {
      el.classList.remove(_this3.options.defaultClasses);
    };
    /**
     * Rebuild table in auto mode.
     *
     * Main characteristic of auto mode is table is rebuilt by stacking rows/columns on top of each other, leaving minimal effort from user to create a responsive table at breakpoints.
     *
     * @param {HTMLElement} tableEl table element
     * @param {string} sizeRange range id for current screen size
     * @param {Object} autoOption mode options
     * @param {TableObject} tableObj table object
     */


    this.autoBuild = function (tableEl, sizeRange, autoOption, tableObj) {
      // base options
      var direction = autoOption.cellStackDirection[sizeRange]; // eslint-disable-next-line prefer-destructuring

      var topRowAsHeader = autoOption.topRowAsHeader[sizeRange];
      var cellsPerRow = autoOption.cellsPerRow[sizeRange]; // new options

      var staticTopRow = autoOption.staticTopRow ? autoOption.staticTopRow[sizeRange] : false;
      tableObj.clearTable();

      if (sizeRange === 'desktop') {
        _this3.buildDefault(tableObj);

        _this3.removeDefaultClasses(tableEl);
      } else {
        _this3.autoDirectionBuild(tableObj, direction, topRowAsHeader, staticTopRow, cellsPerRow);

        _this3.addDefaultClasses(tableEl);
      }
    };
    /**
     * Rebuild table with a direction to read cells.
     *
     * Direction in question in here is either by row or column:
     * * row: cells will be read row by row, in each row starting from the first column
     * * column: cells will be read column by column, in each column starting from the first row of the table
     *
     * @param {TableObject} tableObj table object
     * @param {string} direction direction to read cells, possible options [row, column]
     * @param {boolean} topRowAsHeader use top row as header
     * @param {boolean} staticTopRow use top row as static
     * @param {number} cellsPerRow cells per row
     */


    this.autoDirectionBuild = function (tableObj, direction) {
      var topRowAsHeader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var staticTopRow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var cellsPerRow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      var rows = tableObj.maxRows();
      var columns = tableObj.maxColumns();
      var isRowStacked = direction === 'row'; // build table with top row as header

      if (topRowAsHeader) {
        _this3.headerBuild(tableObj, direction, cellsPerRow);
      } else {
        // cell stack direction is selected as row
        // for future new functionality additions, keep different cell stack direction logic separate instead of generalizing the inner logic
        // eslint-disable-next-line no-lonely-if
        if (isRowStacked) {
          (function () {
            var allCellsByRow = [];
            var rowStartIndex = 0; // static top row option is enabled

            if (staticTopRow) {
              var topCells = tableObj.getCellsAtRow(0, true);
              var baseCells = topCells.filter(function (c) {
                return !c.isReference();
              }); // eslint-disable-next-line array-callback-return

              baseCells.map(function (b) {
                rowStartIndex += 1;
                var rowObj = tableObj.addRow('wptb-row');
                rowObj.el.style.backgroundColor = tableObj.rowColors.header;
                tableObj.appendObjectToRow(b, rowObj.id);
                b.setAttribute('colSpan', cellsPerRow);
              });
            } // get cells by reading row by row


            for (var r = rowStartIndex; r < rows; r += 1) {
              // eslint-disable-next-line no-loop-func
              tableObj.getCellsAtRow(r, true).forEach(function (c) {
                // only use non reference cells to avoid duplication for non top row as header tables
                if (!c.isReference()) {
                  allCellsByRow.push(c);
                }
              });
            }

            var cellCount = allCellsByRow.length;

            for (var c = 0, _r = 0; c < cellCount; c += cellsPerRow, _r += 1) {
              // const rowId = tableObj.addRow('wptb-row').id;
              var rowObj = tableObj.addRow('wptb-row'); // preserve original row colors for even and odd rows

              rowObj.el.style.backgroundColor = tableObj.rowColors[_r % 2 === 0 ? 'odd' : 'even']; // place cells by 'cells by row' option value

              for (var pR = 0; pR < cellsPerRow; pR += 1) {
                var tempCell = allCellsByRow[c + pR];

                if (tempCell) {
                  tableObj.appendElementToRow(tempCell.getElement(), rowObj.id);
                  tempCell.resetAllAttributes();
                  tempCell.setAttribute('style', 'width: 100% !important', true, ';');
                  tempCell.setAttribute('colSpan', 1);
                  tempCell.setAttribute('rowSpan', 1);
                }
              }
            }
          })();
        } // cell stack direction is selected as column
        else {
            var allCellsByCol = [];
            var rowStartIndex = 0; // static top row option is enabled

            if (staticTopRow) {
              var topCells = tableObj.getCellsAtRow(0, true);
              var baseCells = topCells.filter(function (t) {
                return !t.isReference();
              }); // eslint-disable-next-line array-callback-return

              baseCells.map(function (b) {
                rowStartIndex += 1;
                var rowObj = tableObj.addRow('wptb-row');
                rowObj.el.style.backgroundColor = tableObj.rowColors.header;
                tableObj.appendObjectToRow(b, rowObj.id);
                b.setAttribute('colSpan', cellsPerRow);
              });
            } // read all cells column by column


            for (var c = 0; c < columns; c += 1) {
              for (var r = rowStartIndex; r < rows; r += 1) {
                var tCell = tableObj.getCell(r, c, true); // only use non reference cells to avoid duplication for non top row as header tables

                if (tCell && !tCell.isReference()) {
                  allCellsByCol.push(tCell);
                }
              }
            }

            var cellCount = allCellsByCol.length;

            for (var _c = 0, _r2 = 0; _c < cellCount; _c += cellsPerRow, _r2 += 1) {
              var rowObj = tableObj.addRow('wptb-row'); // preserve original row colors for even and odd rows

              rowObj.el.style.backgroundColor = tableObj.rowColors[_r2 % 2 === 0 ? 'odd' : 'even'];

              for (var cR = 0; cR < cellsPerRow; cR += 1) {
                var tempCell = allCellsByCol[_c + cR];

                if (tempCell) {
                  tableObj.appendElementToRow(tempCell.getElement(), rowObj.id);
                  tempCell.resetAllAttributes();
                  tempCell.setAttribute('style', 'width: 100% !important', true, ';');
                  tempCell.setAttribute('colSpan', 1);
                  tempCell.setAttribute('rowSpan', 1);
                }
              }
            }
          }
      }
    };
    /**
     * Build table with top row assigned as header.
     *
     * @param {TableObject} tableObj table object
     * @param {string} direction cell stack direction, possible options are [row, column]
     * @param {number} itemsPerHeader items bound to each header element
     */


    this.headerBuild = function (tableObj, direction) {
      var itemsPerHeader = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      // cells at header
      // applying header row color to cells
      var headerCells = tableObj.getCellsAtRow(0, true).map(function (h) {
        h.setAttribute('style', "background-color: ".concat(tableObj.rowColors.header), true, ';');
        return h;
      });
      var stackedAsColumn = direction === 'column'; // row count

      var rows = tableObj.maxRows(); // column count

      var columns = tableObj.maxColumns();
      var rowBorderStyle = '3px solid gray'; // stack direction is column

      if (stackedAsColumn) {
        /**
         * Add header cells as new row to table.
         *
         * @param {boolean} addBorder add top border to header row
         */
        // eslint-disable-next-line no-inner-declarations
        function addHeaderCells() {
          var addBorder = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
          var rowObj = tableObj.addRow('wptb-row');

          if (addBorder) {
            rowObj.el.style.borderTop = rowBorderStyle;
          } // eslint-disable-next-line array-callback-return


          headerCells.map(function (h) {
            // clone header cell to reuse it for multiple rows
            tableObj.appendElementToRow(h.el.cloneNode(true), rowObj.id);
          });
        } // count of header rows that will be created


        var headerCount = Math.ceil((rows - 1) / itemsPerHeader); // row index on original table

        var currentOriginalRow = 1;

        for (var r = 0; r < headerCount; r += 1) {
          // create header row and add to table
          addHeaderCells(r > 0);

          for (var c = 0; c < itemsPerHeader; c += 1) {
            // break iteration when current row surpasses original row amount
            if (currentOriginalRow >= rows) {
              break;
            }

            var rowObj = tableObj.addRow('wptb-row'); // apply row color relative to current header row

            rowObj.el.style.backgroundColor = tableObj.rowColors[c % 2 === 0 ? 'even' : 'odd'];

            for (var cc = 0; cc < columns; cc += 1) {
              var currentCell = tableObj.getCell(currentOriginalRow, cc, true);

              if (currentCell) {
                currentCell.resetAllAttributes(); // status to decide whether render cell or not

                var cellAddStatus = true;
                var rowSpan = currentCell.getSpan(CellObject.spanTypes.row);
                var colSpan = currentCell.getSpan(CellObject.spanTypes.column);

                if (rowSpan > 1) {
                  // items remaining in current header
                  var remainingItems = itemsPerHeader - c; // calculate whether to apply full rowspan value or remaining item value depending on the current position of the cell

                  var currentRowSpan = Math.min(rowSpan, remainingItems);
                  cellAddStatus = currentCell.setSpan(CellObject.spanTypes.row, currentRowSpan); // reset render status of cell to visible for future use

                  currentCell.setMergedRenderStatus(true);
                }

                if (cellAddStatus) {
                  tableObj.appendObjectToRow(currentCell, rowObj.id);
                }
              }
            }

            currentOriginalRow += 1;
          }
        }
      } else {
        // stack direction is row
        // number of headers that will be created
        var _headerCount = Math.ceil((rows - 1) / itemsPerHeader);

        var _currentOriginalRow = 1;

        for (var hc = 0; hc < _headerCount; hc += 1) {
          for (var _c2 = 0; _c2 < columns; _c2 += 1) {
            var _rowObj = tableObj.addRow('wptb-row'); // clear out row color to override row color with cell colors


            _rowObj.el.style.backgroundColor = 'none';

            if (hc > 0 && _c2 === 0) {
              _rowObj.el.style.borderTop = rowBorderStyle;
            }

            var clonedHeaderCell = headerCells[_c2].el.cloneNode(true); // apply header row color to header cell


            clonedHeaderCell.style.backgroundColor = "".concat(tableObj.rowColors.header, " !important");
            tableObj.appendElementToRow(clonedHeaderCell, _rowObj.id);

            for (var _r3 = 0; _r3 < itemsPerHeader; _r3 += 1) {
              if (_currentOriginalRow + _r3 >= rows) {
                break;
              } // const currentCell = tableObj.appendToRow(currentOriginalRow + r, c, rowObj.id);


              var _currentCell = tableObj.getCell(_currentOriginalRow + _r3, _c2, true);

              if (_currentCell) {
                _currentCell.resetAllAttributes();

                var _cellAddStatus = true;

                var _rowSpan = _currentCell.getSpan(CellObject.spanTypes.row);

                var _colSpan = _currentCell.getSpan(CellObject.spanTypes.column);

                if (_rowSpan > 1) {
                  var _remainingItems = itemsPerHeader - _r3;

                  var _currentRowSpan = Math.min(_rowSpan, _remainingItems);

                  _cellAddStatus = _currentCell.setSpan(CellObject.spanTypes.row, _currentRowSpan);

                  var rS = _currentCell.el.getAttribute('rowSpan');

                  var cS = _currentCell.el.getAttribute('colSpan'); // switch span values


                  _currentCell.setAttribute('rowSpan', cS);

                  _currentCell.setAttribute('colSpan', rS);

                  _currentCell.setMergedRenderStatus(true);
                }

                if (_cellAddStatus) {
                  // color index for the cell, this will be used to reflect table row colors to cells. currently, grouping up the same items with the same color code
                  var colorIndex = (_currentOriginalRow + _r3 + hc) % 2 === 0 ? 'even' : 'odd'; // for better visuals and distinction for tables with 1 item per header, using this calculation for color index

                  if (itemsPerHeader === 1) {
                    colorIndex = _currentOriginalRow % 2 === 0 ? 'even' : 'odd';
                  }

                  _currentCell.setAttribute('style', "background-color: ".concat(tableObj.rowColors[colorIndex]), true, ';');

                  tableObj.appendObjectToRow(_currentCell, _rowObj.id);
                }
              }
            }
          }

          _currentOriginalRow += itemsPerHeader;
        }
      }
    };
    /**
     * Build table in its default form.
     *
     * Default form of table is the layout it has in desktop breakpoint.
     *
     * @param {TableObject} tableObj table object
     */


    this.buildDefault = function (tableObj) {
      var rows = tableObj.maxRows();
      var columns = tableObj.maxColumns();

      for (var r = 0; r < rows; r += 1) {
        var rowId = tableObj.addRow('', true, r).id;

        for (var c = 0; c < columns; c += 1) {
          var tempCell = tableObj.getCell(r, c, true); // only render cell if a valid cell is found and it is not a reference

          if (tempCell && !tempCell.isReference()) {
            // reset all modified attributes of cell to their default values
            tempCell.resetAllAttributes();
            tableObj.appendElementToRow(tempCell.getElement(), rowId);
          }
        }
      }
    };
    /**
     * Calculate range id for given size value.
     *
     * @param {number} val value
     * @param {Object} stops an object containing stop ids as keys and respective sizes as values
     * @return {string} range id
     */


    this.calculateRangeId = function (val, stops) {
      // eslint-disable-next-line prefer-destructuring
      var sortedStops = Object.keys(stops).sort(function (a, b) {
        return stops[a].width - stops[b].width;
      });
      var rangeId = sortedStops[0]; // eslint-disable-next-line array-callback-return

      sortedStops.map(function (s) {
        if (val >= stops[s].width) {
          rangeId = s;
        }
      });
      return rangeId;
    };
    /**
     * Rebuild table according to its responsive directives.
     *
     * @private
     * @param {HTMLElement} el table element
     * @param {number} size size in pixels
     * @param {TableObject} tableObj table object instance
     * @throws An error will be given for invalid mode name
     */


    this.rebuildTable = function (el, size, tableObj) {
      var directive = _this3.getDirective(el);

      if (directive) {
        if (!directive.responsiveEnabled) {
          // this.buildDefault(tableObj);
          return;
        }

        var mode = directive.responsiveMode; // main build logic for different responsive modes should be named in the format of `{modeName}Build` to automatically call the associated function from here

        var buildCallable = _this3["".concat(mode, "Build")];

        if (!size) {
          // eslint-disable-next-line no-param-reassign
          size = el.getBoundingClientRect().width;
        }

        var sizeRangeId = _this3.calculateRangeId(size, directive.breakpoints);

        if (buildCallable) {
          var modeOptions = directive.modeOptions[mode];
          buildCallable.call(_this3, el, sizeRangeId, modeOptions, tableObj);
          WPTB_RecalculateIndexes(el);
          var tabEvent = new CustomEvent('table:rebuilt', {
            detail: {
              sizeRangeId: sizeRangeId,
              topRowAsHeader: directive.modeOptions[mode].topRowAsHeader
            }
          });
          el.dispatchEvent(tabEvent);
        } else {
          throw new Error("No build mode named as [".concat(mode, "] found."));
        }
      }
    };
    /**
     * Rebuild tables with the given screen size.
     *
     * @param {number} size screen size
     */


    this.rebuildTables = function (size) {
      // eslint-disable-next-line array-callback-return
      _this3.elementObjects.map(function (o) {
        var innerSize = size;

        if (!size) {
          // eslint-disable-next-line no-param-reassign
          innerSize = window.innerWidth;

          var directives = _this3.getDirective(o.el); // calculate size according to relative width directive


          if (directives && directives.relativeWidth) {
            switch (directives.relativeWidth) {
              case 'window':
                // eslint-disable-next-line no-param-reassign
                innerSize = window.innerWidth;
                break;

              case 'container':
                // get the size of the container table is in
                // eslint-disable-next-line no-param-reassign
                innerSize = o.el.parentNode.parentNode.parentNode.clientWidth;
                break;

              default:
                // eslint-disable-next-line no-param-reassign
                innerSize = window.innerWidth;
                break;
            }
          }
        }

        _this3.rebuildTable(o.el, innerSize, o.tableObject);
      });
    };

    if (this.options.bindToResize) {
      this.bindRebuildToResize();
    }

    return {
      rebuildTables: this.rebuildTables,
      getDirective: this.getDirective,
      calculateRangeId: this.calculateRangeId
    };
  }

  return ResponsiveFront;
});
},{"process":"../../../../../node_modules/process/browser.js"}],"../WPTB_SortableTable.js":[function(require,module,exports) {
var global = arguments[3];
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Responsive class assignment for frontend operations.
 *
 * This file can be used as an UMD.
 */
(function assignToGlobal(key, context, factory) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else {
    // eslint-disable-next-line no-param-reassign
    context[key] = factory();
  } // eslint-disable-next-line no-restricted-globals

})('WPTB_SortableTable', self || global, function () {
  function WPTB_SortTable() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var table = this.table = options.table;
    WPTB_RecalculateIndexes(table);
    var thisObject = this;
    this.itemsPerHeader = 0;
    this.tableMaxCols = table.maxCols;
    this.cellsStylesScheme = {};
    this.rowsStylesScheme = {};
    /**
     * sets the table to sort mode
     *
     * @param {string} type
     * @param {boolean} active
     * @param {number} number
     */

    this.sortModeSwitcher = function (type, active) {
      if (active) {
        this.sortModeSwitcher('horizontal', false);
        this.sortModeSwitcher('vertical', false);
      }

      if (type === 'vertical') {
        this.table.removeEventListener('click', this.sortableTableVerticalStart, false);

        if (active) {
          this.sortingCellMouseMoveSwitcher('vertical', true);
          this.table.addEventListener('click', this.sortableTableVerticalStart, false);
          this.table.dataset.wptbSortableTableVertical = '1';
          this.createTableElementsStylesScheme('td');
          this.createTableElementsStylesScheme('tr');
        } else {
          this.sortingCellMouseMoveSwitcher('vertical', false);
          delete this.table.dataset.wptbSortableTableVertical;
        }
      } else if (type === 'horizontal') {
        this.table.removeEventListener('click', this.sortableTableHorizontalStart, false);

        if (active) {
          this.sortingCellMouseMoveSwitcher('horizontal', true);
          this.table.addEventListener('click', this.sortableTableHorizontalStart, false);
          this.table.dataset.wptbSortableTableHorizontal = '1';
          this.createTableElementsStylesScheme('td');
          this.createTableElementsStylesScheme('tr');
        } else {
          this.sortingCellMouseMoveSwitcher('horizontal', false);
          delete this.table.dataset.wptbSortableTableHorizontal;
        }
      }
    };
    /**
     * changes table object for old reconstruction table type
     *
     * @param {boolean}start
     * @returns {*}
     */


    this.tableObjectChange = function () {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (this.table.classList.contains('wptb-mobile-view-active') && start) {
        this.table = table.parentNode.parentNode.querySelector('.wptb-preview-table-mobile');
      } else if (this.table.classList.contains('wptb-preview-table-mobile') && !start) {
        this.table = table.parentNode.querySelector('.wptb-preview-table');
      }

      return this.table;
    };
    /**
     * fills the object with data about cell styles for all locations (create scheme)
     *
     * @param elemSelector
     */


    this.createTableElementsStylesScheme = function (elemSelector) {
      this.tableObjectChange();
      var elements = this.table.querySelectorAll(elemSelector);

      if (elements.length) {
        for (var i = 0; i < elements.length; i++) {
          var elem = elements[i];
          var cellFullStyleObj = window.getComputedStyle(elem, null);
          var backgroundColor = cellFullStyleObj.getPropertyValue('background-color');
          var objectKey = '';

          if (elemSelector === 'td') {
            objectKey = elem.dataset.xIndex + '-' + elem.dataset.yIndex;
            this.cellsStylesScheme[objectKey] = {
              backgroundColor: backgroundColor
            };
          } else if (elemSelector === 'tr') {
            objectKey = String(i);
            this.rowsStylesScheme[objectKey] = {
              backgroundColor: backgroundColor
            };
          }
        }
      }

      this.tableObjectChange(false);
    };
    /**
     * applies saved cell styles data to all cells
     *
     * @param elemSelector
     */


    this.reassignElementsStyles = function (elemSelector) {
      this.tableObjectChange();
      var elements = this.table.querySelectorAll(elemSelector);
      var elementsStylesScheme;

      if (elemSelector === 'td') {
        elementsStylesScheme = this.cellsStylesScheme;
      } else if (elemSelector === 'tr') {
        elementsStylesScheme = this.rowsStylesScheme;
      }

      if (elements.length) {
        for (var i = 0; i < elements.length; i++) {
          var elem = elements[i];
          var objectKey = '';

          if (elemSelector === 'td') {
            objectKey = elem.dataset.xIndex + '-' + elem.dataset.yIndex;
          } else if (elemSelector === 'tr') {
            objectKey = i;
          }

          if (elementsStylesScheme.hasOwnProperty(objectKey)) {
            var elemStyles = elementsStylesScheme[objectKey];

            for (var key in elemStyles) {
              elem.style[key] = elemStyles[key];
            }
          }
        }
      }

      this.tableObjectChange(false);
    };
    /**
     * checks whether the table should be in the sort state
     * and connects the necessary handlers
     *
     * @param {object} responsiveFront
     */


    this.sortableTableInitialization = function (responsiveFront) {
      var type = '';
      var typeFirst;
      var typeSecond;

      if (this.table.dataset.wptbSortableTableVertical && this.table.dataset.wptbSortableTableVertical === '1') {
        typeFirst = 'vertical';
        typeSecond = 'horizontal';
      } else if (this.table.dataset.wptbSortableTableHorizontal && this.table.dataset.wptbSortableTableHorizontal === '1') {
        typeFirst = 'horizontal';
        typeSecond = 'vertical';
      }

      var switchMode = {};

      if (responsiveFront && responsiveFront.getDirective(this.table)) {
        switchMode.switch = function (e) {
          var directives = responsiveFront.getDirective(this.table);
          var sizeRangeId = 'desktop';

          if (e && e.detail) {
            sizeRangeId = e.detail.sizeRangeId;
          }

          type = typeFirst;

          if (sizeRangeId !== 'desktop') {
            if (directives.hasOwnProperty('modeOptions')) {
              var mode = directives.responsiveMode;
              var modeOptions = directives.modeOptions[mode];

              if (modeOptions.hasOwnProperty('topRowAsHeader') && modeOptions.topRowAsHeader.hasOwnProperty(sizeRangeId) && modeOptions.topRowAsHeader[sizeRangeId]) {
                if (modeOptions.hasOwnProperty('cellStackDirection') && modeOptions.cellStackDirection.hasOwnProperty(sizeRangeId)) {
                  if (modeOptions.cellStackDirection[sizeRangeId] === 'row') {
                    type = typeSecond;
                    this.itemsPerHeader = this.tableMaxCols - 1;
                  } else if (modeOptions.cellStackDirection[sizeRangeId] === 'column') {
                    if (modeOptions.hasOwnProperty('cellsPerRow')) {
                      this.itemsPerHeader = modeOptions.cellsPerRow[sizeRangeId];
                    }
                  }
                }
              } else {
                this.itemsPerHeader = 0;
              }
            }
          } else {
            this.itemsPerHeader = 0;
          }

          this.sortModeSwitcher(type, true);
        };
      } else {
        switchMode.switch = function (e) {
          var type = typeFirst;

          if (this.table.classList.contains('wptb-mobile-view-active')) {
            if (this.table.classList.contains('wptb-table-preview-head')) {
              type = typeSecond;

              if (type === 'vertical') {
                this.itemsPerHeader = this.tableMaxCols - 1;
              }
            }

            var _table = this.table;
            this.table = _table.parentNode.parentNode.querySelector('.wptb-preview-table-mobile');
            this.sortModeSwitcher(type, true);
            this.table = _table;
            return;
          }

          this.sortModeSwitcher(type, true);
        };
      }

      switchMode.switch.call(thisObject);
      this.table.addEventListener('table:rebuilt', function (e) {
        switchMode.switch.call(thisObject, e);
      }, false);
    };
    /**
     * adds and deletes mousemove and mouseleave events handlers when happens switch sorting mode
     * and also can add necessary attributes
     *
     * @param {string} type
     * @param {boolean} active
     */


    this.sortingCellMouseMoveSwitcher = function (type, active) {
      var _this = this;

      /**
       * removes and adds mousemove and mouseleave events handlers
       *
       * @param {HTMLElement} td
       * @param {func} sCMM
       * @param {boolean} active
       */
      function s(td, sCMM, active) {
        td.removeEventListener('mousemove', sCMM, false);
        td.removeEventListener('mouseleave', tdMouseLeave, false);

        if (active) {
          td.addEventListener('mousemove', sCMM, false);
          td.addEventListener('mouseleave', tdMouseLeave, false);
        }
      }
      /**
       * removes and adds data sorted attributes
       *
       * @param {HTMLElement} td
       * @param {string} dataAttr
       * @param {boolean} active
       */


      function dataAttrSortChange(td, dataAttr, active) {
        if (active) {
          if (!td.dataset[dataAttr] || td.dataset[dataAttr] !== 'desk-disabled') {
            td.dataset[dataAttr] = 'ask';
          } else {
            td.dataset[dataAttr] = 'desk';
          }
        } else if (td.dataset[dataAttr] === 'ask') {
          td.dataset[dataAttr] = 'ask-disabled';
        } else if (td.dataset[dataAttr] === 'desk') {
          td.dataset[dataAttr] = 'desk-disabled';
        }
      } // removes all mousemove and mouseleave events handlers
      // and also removes all data sorted attributes from all cells


      var tds = this.table.querySelectorAll('td');

      if (tds.length) {
        tds = _toConsumableArray(tds);
        tds.map(function (td) {
          s(td, sortingCellMouseMoveVertical, false);
          dataAttrSortChange(td, 'sortedVertical', false);
          s(td, sortingCellMouseMoveHorizontal, false);
          dataAttrSortChange(td, 'sortedHorizontal', false);
        });
      } // if active === true sets sorted events handlers
      // and data sorted attributes for all cells


      if (active) {
        if (type === 'vertical') {
          var rowsLength = this.table.rows.length;
          var dataYIndexStart = 0;

          while (rowsLength > 0) {
            var _tds = this.table.querySelectorAll("[data-y-index=\"".concat(dataYIndexStart, "\"]"));

            _tds = _toConsumableArray(_tds);

            _tds.map(function (td) {
              s(td, sortingCellMouseMoveVertical, active);
              dataAttrSortChange(td, 'sortedVertical', active);
            });

            if (this.itemsPerHeader) {
              rowsLength -= this.itemsPerHeader + 1;
              dataYIndexStart += this.itemsPerHeader + 1;
            } else {
              rowsLength = 0;
            }
          }
        } else if (type === 'horizontal') {
          var _tds2 = this.table.querySelectorAll('[data-x-index="0"]');

          _tds2 = _toConsumableArray(_tds2);

          _tds2.map(function (td) {
            var tdsPerAfter = _this.table.querySelectorAll("[data-y-index=\"".concat(td.dataset.yIndex, "\"]"));

            if (tdsPerAfter.length > 2) {
              s(td, sortingCellMouseMoveHorizontal, active);
              dataAttrSortChange(td, 'sortedHorizontal', active);
            }
          });
        }
      }
    };
    /**
     * adds a sortable-hover class for a cell when the cursor is over the sort icon (arrow)
     *
     * @param {event} e
     * @param {string} type
     * @param {HTMLElement} element td
     */


    function sortingCellMouseMov(e, type, element) {
      if (e.target.tagName === 'TD') {
        var x = e.offsetX == undefined ? e.layerX : e.offsetX;
        var y = e.offsetY == undefined ? e.layerY : e.offsetY;
        var xMatch = false;

        if (type === 'vertical' && e.target.clientWidth - x <= 35 || type === 'horizontal' && x <= 35) {
          xMatch = true;
        }

        if (xMatch && (e.target.clientHeight - 35) / 2 < y && (e.target.clientHeight + 35) / 2 > y) {
          element.classList.add('sortable-hover');
        } else {
          element.classList.remove('sortable-hover');
        }
      } else {
        element.classList.remove('sortable-hover');
      }
    }
    /**
     * calls sortingCellMouseMov with the type parameter set to vertical
     *
     * @param {event} e
     */


    function sortingCellMouseMoveVertical(e) {
      sortingCellMouseMov(e, 'vertical', this);
    }
    /**
     * calls sortingCellMouseMov with the type parameter set to horizontal
     *
     * @param {event} e
     */


    function sortingCellMouseMoveHorizontal(e) {
      sortingCellMouseMov(e, 'horizontal', this);
    }
    /**
     * remove sortable-hover class from cell when cursor leave cell
     */


    function tdMouseLeave() {
      this.classList.remove('sortable-hover');
    }
    /**
     * function for sorting the table vertically by the numeric content of cells
     *
     * @param {event} e
     * @param {HTMLElement} table
     * @param {string} type
     */


    function sortableTable(e, type) {
      if (e.target && e.target.tagName === 'TD' && !table.parentNode.classList.contains('wptb-preview-table-manage-cells')) {
        var _table2 = e.currentTarget;
        var tableWasSorted = false;

        if (type === 'vertical' && e.target.dataset.hasOwnProperty('sortedVertical')) {
          /**
           * if table have enabled param topRowAsHeader and sellsStackDirection is column
           * the top and bottom rows that will not be sorted are temporarily removed from the table
           */
          var tableRowsBefore = [];
          var tableRowsAfter = [];

          if (this.itemsPerHeader && this.itemsPerHeader < _table2.rows.length) {
            WPTB_RecalculateIndexes(_table2);

            var tableRowsArr = _toConsumableArray(_table2.rows);

            var tableLastCont = _table2.querySelector('tbody') ? _table2.querySelector('tbody') : _table2;

            for (var i = 0; i < tableRowsArr.length; i++) {
              if (i < e.target.dataset.yIndex) {
                tableRowsBefore.push(tableRowsArr[i]);
                tableLastCont.removeChild(tableRowsArr[i]);
              } else if (i > parseInt(e.target.dataset.yIndex, 10) + this.itemsPerHeader) {
                tableRowsAfter.push(tableRowsArr[i]);
                tableLastCont.removeChild(tableRowsArr[i]);
              }
            }

            WPTB_RecalculateIndexes(_table2);
          }

          var tds = _table2.querySelectorAll("[data-x-index=\"".concat(e.target.dataset.xIndex, "\"]"));

          tds = _toConsumableArray(tds);
          /**
           * preparing table for sorting
           */

          var rowspan;
          var rowNum;
          tds.map(function (td) {
            if (!(rowspan = parseInt(td.rowSpan, 10))) {
              rowspan = 1;
            }

            rowNum = td.dataset.yIndex;
            WPTB_CutGlueTable.cutTableHorizontally(rowNum, _table2);
            rowNum += rowspan;
            WPTB_CutGlueTable.cutTableHorizontally(rowNum, _table2);
          });
          var rowsValuesArr = [];
          var rowsTdFirst;
          var tdYCoordsRowSpanPrevious = 0;
          var tableRowsPushed = [];

          for (var _i = 0; _i < tds.length; _i++) {
            var tdsChanged = changeSortingTdsCollection(e, _table2, tds, _i, tdYCoordsRowSpanPrevious, 'vertical');

            if (tdsChanged && tdsChanged.hasOwnProperty('i')) {
              tds = tdsChanged.tds;
              _i = tdsChanged.i;
              continue;
            } else if (tdsChanged) {
              tds = tdsChanged.tds;
            }

            var td = tds[_i];
            var tdRowspan = parseInt(td.rowSpan, 10);
            if (!tdRowspan) tdRowspan = 1;
            tdYCoordsRowSpanPrevious = parseInt(td.dataset.yIndex, 10) + tdRowspan;
            var textElementsValues = textElementsValuesGet(td);
            var rowsTd = [];

            for (var j = 0; j < tdRowspan; j++) {
              rowsTd.push(_table2.rows[parseInt(td.dataset.yIndex, 10) + j]);
              tableRowsPushed.push(parseInt(td.dataset.yIndex, 10) + j);
            }

            if (td.dataset.yIndex > 0) {
              rowsValuesArr.push({
                rowsTd: rowsTd,
                value: textElementsValues
              });
            } else {
              rowsTdFirst = rowsTd;
            }
          }

          var orderBy = setSortedAscDataAttr(e, 'sortedVertical');
          if (!orderBy) return;
          if (rowsValuesArr.length) rowsValuesArr.sort(function (prev, next) {
            return sortOrder(orderBy, prev, next);
          });
          rowsValuesArr.unshift({
            rowsTd: rowsTdFirst
          });

          if (rowsValuesArr.length < _table2.rows.length) {
            for (var _i2 = 0; _i2 < _table2.rows.length; _i2++) {
              if (tableRowsPushed.indexOf(_i2) > -1) continue;
              var _rowsTd = [];

              _rowsTd.push(_table2.rows[_i2]);

              rowsValuesArr.push({
                rowsTd: _rowsTd
              });
            }
          }

          var tBody = _table2.querySelector('tbody');

          tBody.innerHTML = '';
          rowsValuesArr.map(function (rowsValObj) {
            rowsValObj.rowsTd.map(function (row) {
              tBody.appendChild(row);
            });
          });
          /**
           * returning previously deleted rows
           */

          if (tableRowsBefore.length) {
            var _tableLastCont = _table2.querySelector('tbody') ? _table2.querySelector('tbody') : _table2;

            if (_tableLastCont) {
              var trRef = _tableLastCont.querySelector('tr');

              tableRowsBefore.map(function (tr) {
                _tableLastCont.insertBefore(tr, trRef);
              });
            }
          }

          if (tableRowsAfter.length) {
            var _tableLastCont2 = _table2.querySelector('tbody') ? _table2.querySelector('tbody') : _table2;

            if (tBody) {
              tableRowsAfter.map(function (tr) {
                _tableLastCont2.appendChild(tr);
              });
            }
          }

          WPTB_RecalculateIndexes(_table2);
          WPTB_CutGlueTable.glueTableHorizontally(_table2);
          tableWasSorted = true;
        } else if (type === 'horizontal' && e.target.dataset.xIndex === '0') {
          var _tds3 = _table2.querySelectorAll("[data-y-index=\"".concat(e.target.dataset.yIndex, "\"]"));

          _tds3 = _toConsumableArray(_tds3); // preparing table for sorting

          var colspan;
          var colNum;

          _tds3.map(function (td) {
            if (!(colspan = parseInt(td.colSpan, 10))) {
              colspan = 1;
            }

            colNum = td.dataset.xIndex;
            WPTB_CutGlueTable.cutTableVertically(colNum, _table2);
            colNum += colspan;
            WPTB_CutGlueTable.cutTableVertically(colNum, _table2);
          });

          var columnsValuesArr = [];
          var columnsTdFirst;
          var tdXCoordsColSpanPrevious = 0;

          for (var _i3 = 0; _i3 < _tds3.length; _i3++) {
            var _tdsChanged = changeSortingTdsCollection(e, _table2, _tds3, _i3, tdXCoordsColSpanPrevious, 'horizontal');

            if (_tdsChanged && _tdsChanged.hasOwnProperty('i')) {
              _tds3 = _tdsChanged.tds;
              _i3 = _tdsChanged.i;
              continue;
            } else if (_tdsChanged) {
              _tds3 = _tdsChanged.tds;
            }

            var _td = _tds3[_i3];
            var tdColspan = parseInt(_td.colSpan, 10);
            if (!tdColspan) tdColspan = 1;
            tdXCoordsColSpanPrevious = parseInt(_td.dataset.xIndex, 10) + tdColspan;

            var _textElementsValues = textElementsValuesGet(_td);

            var columnsTd = [];

            for (var _j = 0; _j < tdColspan; _j++) {
              var tdsColumn = _toConsumableArray(_table2.querySelectorAll("[data-x-index=\"".concat(parseInt(_td.dataset.xIndex, 10) + _j, "\"]")));

              columnsTd.push(tdsColumn);
            }

            if (_td.dataset.xIndex > 0) {
              columnsValuesArr.push({
                columnsTd: columnsTd,
                value: _textElementsValues
              });
            } else {
              columnsTdFirst = columnsTd;
            }
          }

          var _orderBy = setSortedAscDataAttr(e, 'sortedHorizontal');

          if (!_orderBy) return;
          if (columnsValuesArr.length) columnsValuesArr.sort(function (prev, next) {
            return sortOrder(_orderBy, prev, next);
          });
          columnsValuesArr.unshift({
            columnsTd: columnsTdFirst
          });

          if (columnsValuesArr.length < _table2.maxCols) {
            var difference = _table2.maxCols - columnsValuesArr.length;

            for (var _i4 = 0; _i4 < difference; _i4++) {
              var _tdsColumn = _toConsumableArray(_table2.querySelectorAll("[data-x-index=\"".concat(parseInt(_table2.maxCols, 10) - parseInt(difference, 10) + _i4, "\"]")));

              columnsValuesArr.push({
                columnsTd: [_tdsColumn]
              });
            }
          }

          for (var _i5 = 0; _i5 < _table2.rows.length; _i5++) {
            _table2.rows[_i5].innerHTML = '';
          }

          columnsValuesArr.map(function (columnsValObj) {
            columnsValObj.columnsTd.map(function (tdsColumn) {
              tdsColumn.map(function (td) {
                _table2.rows[td.dataset.yIndex].appendChild(td);
              });
            });
          });
          WPTB_RecalculateIndexes(_table2);
          WPTB_CutGlueTable.glueTableVertically(_table2);
          tableWasSorted = true;
        }

        if (tableWasSorted) {
          removeCellsAttrAfterDivision(_table2);

          if (_table2.hasOwnProperty('tableSM')) {
            var tableSM = _table2.tableSM();

            new tableSM().tableStateSet();
          }

          this.reassignElementsStyles('td');
          this.reassignElementsStyles('tr');
        }
      }
    }
    /**
     * Function that sets the data-attribute with the number of the row or column
     * that the table was sorted by. Returns the number of a row or column
     *
     * @param {event} e
     * @param {string} dataAttr
     * @returns {null|boolean}
     */


    function setSortedAscDataAttr(e, dataAttr) {
      if (e.currentTarget && (e.currentTarget.classList.contains('wptb-preview-table') || e.currentTarget.classList.contains('wptb-preview-table-mobile'))) {
        if (!e.target.dataset[dataAttr] || e.target.dataset[dataAttr] === 'ask') {
          e.target.dataset[dataAttr] = 'desk';
        } else {
          e.target.dataset[dataAttr] = 'ask';
        }

        return e.target.dataset[dataAttr];
      }

      return false;
    }
    /**
     * defines the sorting order
     *
     * @param {string} orderBy
     * @param prev
     * @param next
     * @returns {number}
     */


    function sortOrder() {
      var orderBy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'ask';
      var prev = arguments.length > 1 ? arguments[1] : undefined;
      var next = arguments.length > 2 ? arguments[2] : undefined;
      var prevValue = prev.value;
      var nextValue = next.value;

      if (parseInt(prevValue) && parseInt(nextValue)) {
        prevValue = parseInt(prevValue);
        nextValue = parseInt(nextValue);
      }

      if (orderBy === 'ask') {
        if (prevValue < nextValue) {
          return -1;
        }

        if (prevValue === nextValue) {
          return 0;
        }

        return 1;
      }

      if (prevValue < nextValue) {
        return 1;
      }

      if (prevValue === nextValue) {
        return 0;
      }

      return -1;
    }
    /**
     * return cell text elements values
     *
     * @param cell {HTMLElement}
     * @returns {string}
     */


    function textElementsValuesGet(cell) {
      var textElements = cell.querySelectorAll('.wptb-text-container');
      textElements = _toConsumableArray(textElements);
      var value = '';

      for (var j = 0; j < textElements.length; j++) {
        var p = textElements[j].querySelector('p');
        value += p.innerText;
        if (j !== textElements.length - 1) value += ' ';
      }

      return value;
    }
    /**
     * adds cells to the collection of cells in the row or column that the table is sorted by.
     * These added cells are not originally were added in the collection,
     * because they are combined with cells from higher rows or left-side columns
     *
     * @param {event} e
     * @param {HTMLElement} table
     * @param {array} tds
     * @param {number} i
     * @param {number} tdIndexSpanPrev
     * @param {string} type
     * @returns {{tds: *}|boolean|{tds: *, i: *}}
     */


    function changeSortingTdsCollection(e, table, tds, i, tdIndexSpanPrev, type) {
      var td = tds[i];
      var tdsCollectionChanged = false;
      var collectionTds;
      var collectionTdsJSpan;
      var collectionTdsJSpanProperty;
      var indexName;
      var indexNameCamelCase;
      var indexNamePerpendicularCamelCase;
      var tdSpanProperty; // max rows or columns column

      var tableGroupCount;

      if (type === 'vertical') {
        collectionTdsJSpanProperty = 'colSpan';
        indexName = 'data-y-index';
        indexNameCamelCase = 'yIndex';
        indexNamePerpendicularCamelCase = 'xIndex';
        tdSpanProperty = 'rowSpan';
        tableGroupCount = table.rows.length;
      } else if (type === 'horizontal') {
        collectionTdsJSpanProperty = 'rowSpan';
        indexName = 'data-x-index';
        indexNameCamelCase = 'xIndex';
        indexNamePerpendicularCamelCase = 'yIndex';
        tdSpanProperty = 'colSpan';
        tableGroupCount = table.maxCols;
      }

      if (td.dataset[indexNameCamelCase] - tdIndexSpanPrev > 0) {
        collectionTds = table.querySelectorAll("[".concat(indexName, "=\"").concat(tdIndexSpanPrev, "\"]"));

        for (var j = 0; j < collectionTds.length; j++) {
          collectionTdsJSpan = collectionTds[j][collectionTdsJSpanProperty];
          if (!collectionTdsJSpan) collectionTdsJSpan = 1;

          if (collectionTds[j].dataset[indexNamePerpendicularCamelCase] < e.target.dataset[indexNamePerpendicularCamelCase] && parseInt(collectionTds[j].dataset[indexNamePerpendicularCamelCase], 10) + parseInt(collectionTdsJSpan, 10) > e.target.dataset[indexNamePerpendicularCamelCase]) {
            tds.splice(i, 0, collectionTds[j]);
            tdsCollectionChanged = true;
            i--;
            break;
          }
        }
      }

      if (tdsCollectionChanged) return {
        tds: tds,
        i: i
      };
      var tdSpan = parseInt(td[tdSpanProperty], 10);
      if (!tdSpan) tdSpan = 1;

      if (i == tds.length - 1 && parseInt(td.dataset[indexNameCamelCase], 10) + tdSpan < tableGroupCount) {
        collectionTds = table.querySelectorAll("[".concat(indexName, "=\"").concat(parseInt(td.dataset[indexNameCamelCase], 10) + tdSpan, "\"]"));

        for (var _j2 = 0; _j2 < collectionTds.length; _j2++) {
          collectionTdsJSpan = collectionTds[_j2][collectionTdsJSpanProperty];
          if (!collectionTdsJSpan) collectionTdsJSpan = 1;

          if (collectionTds[_j2].dataset[indexNamePerpendicularCamelCase] < e.target.dataset[indexNamePerpendicularCamelCase] && parseInt(collectionTds[_j2].dataset[indexNamePerpendicularCamelCase], 10) + parseInt(collectionTdsJSpan, 10) > e.target.dataset[indexNamePerpendicularCamelCase]) {
            tds.push(collectionTds[_j2]);
            tdsCollectionChanged = true;
            break;
          }
        }
      }

      if (tdsCollectionChanged) return {
        tds: tds
      };
      return false;
    }
    /**
     * remove cells attributes which were used for division table
     *
     * @param {HTMLElement} table
     */


    function removeCellsAttrAfterDivision(table) {
      var tdsAll = _toConsumableArray(table.getElementsByTagName('td'));

      for (var i = 0; i < tdsAll.length; i++) {
        if (tdsAll[i].hasAttribute('data-same-cell-before-division')) {
          tdsAll[i].removeAttribute('data-same-cell-before-division');
        }
      }
    }
    /**
     * function for run sorting table vertically
     *
     * @param {event} e
     */


    this.sortableTableVerticalStart = function (e) {
      sortableTable.call(thisObject, e, 'vertical');
    };
    /**
     * function for run sorting table horizontally
     *
     * @param {event} e
     */


    this.sortableTableHorizontalStart = function (e) {
      sortableTable.call(thisObject, e, 'horizontal');
    };

    return this;
  }

  return WPTB_SortTable;
});
},{}],"components/MaterialButton.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    click: {
      type: Function,
      default: function _default() {
        // eslint-disable-next-line no-console
        console.log('Material button clicked');
      }
    },
    size: {
      type: String,
      default: 'fit-content'
    },
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    buttonClass: function buttonClass() {
      return ["wptb-plugin-button-material-".concat(this.size)];
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.$emit('buttonClicked');
      this.click();
    }
  }
};
exports.default = _default;
        var $48fd91 = exports.default || module.exports;
      
      if (typeof $48fd91 === 'function') {
        $48fd91 = $48fd91.options;
      }
    
        /* template */
        Object.assign($48fd91, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wptb-plugin-button-material",
      class: _vm.buttonClass,
      attrs: { "data-type": _vm.type, "data-disabled": _vm.disabled },
      on: {
        click: function($event) {
          $event.preventDefault()
          return _vm.handleClick($event)
        }
      }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/ModalWindow.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MaterialButton = _interopRequireDefault(require("./MaterialButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    message: {
      type: String,
      default: 'This is a default message for modal window.'
    },
    visible: {
      type: Boolean,
      default: false
    },
    relativeRef: {
      type: HTMLElement,
      required: true
    },
    callback: {
      type: Function,
      default: function _default() {
        // eslint-disable-next-line no-console
        console.log('modal button clicked');
      }
    }
  },
  components: {
    MaterialButton: _MaterialButton.default
  },
  mounted: function mounted() {
    this.relativeRef.appendChild(this.$refs.mainWrapper);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.mainWrapper.remove();
  }
};
exports.default = _default;
        var $6a3b9d = exports.default || module.exports;
      
      if (typeof $6a3b9d === 'function') {
        $6a3b9d = $6a3b9d.options;
      }
    
        /* template */
        Object.assign($6a3b9d, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.visible,
          expression: "visible"
        }
      ],
      ref: "mainWrapper",
      staticClass: "wptb-plugin-modal-window"
    },
    [
      _c("div", { staticClass: "wptb-plugin-modal-inner-window" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "wptb-plugin-modal-message" }, [
          _vm._v(_vm._s(_vm.message))
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "wptb-plugin-modal-button-container" },
          [
            _c(
              "material-button",
              { attrs: { size: "full-size", click: _vm.callback } },
              [_vm._v(_vm._s(_vm.strings.okay))]
            )
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "wptb-plugin-modal-icon" }, [
      _c("span", { staticClass: "dashicons dashicons-warning" })
    ])
  }
]
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./MaterialButton":"components/MaterialButton.vue"}],"components/NumberPostfixButtons.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _NumberPostfixInput = _interopRequireDefault(require("./NumberPostfixInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  props: {
    value: {
      type: Number,
      default: 0
    },
    buttonStep: {
      type: Number,
      default: 10
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  model: {
    prop: 'value',
    event: 'modelChanged'
  },
  inheritAttrs: false,
  components: {
    NumberPostfixInput: _NumberPostfixInput.default
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.innerValue = _this.value;
    });
  },
  data: function data() {
    return {
      innerValue: 0
    };
  },
  watch: {
    value: function value(n) {
      this.innerValue = this.limitValue(n, this.min, this.max);
    },
    innerValue: function innerValue(n) {
      this.innerValue = this.limitValue(n, this.min, this.max);
      this.$emit('modelChanged', this.innerValue);
    }
  },
  methods: {
    affectValue: function affectValue(e) {
      var _this2 = this;

      var operation = e.target.dataset.type === 'increment' ? 1 : -1;

      var rangeValues = _toConsumableArray(new Array(Math.floor(this.max / this.buttonStep))).map(function (_, i) {
        return (i + 1) * _this2.buttonStep;
      });

      rangeValues.push(this.innerValue);
      rangeValues.sort(function (a, b) {
        return a - b;
      });
      rangeValues = Array.from(new Set(rangeValues));
      var indexOfValue = rangeValues.indexOf(this.innerValue);
      this.innerValue = rangeValues[this.limitValue(indexOfValue + operation, 0, rangeValues.length - 1)];
    },
    limitValue: function limitValue(val, min, max) {
      if (val < min) {
        return min;
      }

      if (val > max) {
        return max;
      }

      return val;
    }
  }
};
exports.default = _default;
        var $420dbf = exports.default || module.exports;
      
      if (typeof $420dbf === 'function') {
        $420dbf = $420dbf.options;
      }
    
        /* template */
        Object.assign($420dbf, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wptb-number-postfix-buttons-wrapper" },
    [
      _c(
        "div",
        {
          staticClass:
            "wptb-number-postfix-button wptb-plugin-box-shadow-xl wptb-unselectable",
          attrs: { "data-type": "decrement" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.affectValue($event)
            }
          }
        },
        [_vm._v("\n\t\t-\n\t")]
      ),
      _vm._v(" "),
      _c(
        "number-postfix-input",
        _vm._b(
          {
            class: _vm.$attrs["input-class"],
            attrs: { min: _vm.min, max: _vm.max },
            model: {
              value: _vm.innerValue,
              callback: function($$v) {
                _vm.innerValue = $$v
              },
              expression: "innerValue"
            }
          },
          "number-postfix-input",
          _vm.$attrs,
          false
        )
      ),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass:
            "wptb-number-postfix-button wptb-plugin-box-shadow-xl wptb-unselectable",
          attrs: { "data-type": "increment" },
          on: {
            click: function($event) {
              $event.preventDefault()
              return _vm.affectValue($event)
            }
          }
        },
        [_vm._v("\n\t\t+\n\t")]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./NumberPostfixInput":"components/NumberPostfixInput.vue"}],"containers/ResponsiveApp.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TableClone = _interopRequireDefault(require("../components/TableClone"));

var _ScreenSizeSlider = _interopRequireDefault(require("../components/ScreenSizeSlider"));

var _WPTB_ResponsiveFrontend = _interopRequireDefault(require("../../../WPTB_ResponsiveFrontend"));

var _WPTB_SortableTable = _interopRequireDefault(require("../../WPTB_SortableTable"));

var _DeBouncer = _interopRequireDefault(require("../functions/DeBouncer"));

var _ModalWindow = _interopRequireDefault(require("../components/ModalWindow"));

var _MaterialButton = _interopRequireDefault(require("../components/MaterialButton"));

var _NumberPostfixInput = _interopRequireDefault(require("../components/NumberPostfixInput"));

var _NumberPostfixButtons = _interopRequireDefault(require("../components/NumberPostfixButtons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = {
  props: {
    cloneQuery: {
      type: String,
      required: true
    },
    screenSizes: Object,
    compareSizes: Object
  },
  components: {
    NumberPostfixButtons: _NumberPostfixButtons.default,
    TableClone: _TableClone.default,
    ScreenSizeSlider: _ScreenSizeSlider.default,
    ModalWindow: _ModalWindow.default,
    MaterialButton: _MaterialButton.default,
    NumberPostfixInput: _NumberPostfixInput.default
  },
  data: function data() {
    return {
      isVisible: true,
      currentSize: 0,
      currentDirectives: null,
      currentSizeRangeName: 'desktop',
      sliderPadding: 20,
      sizeStops: {},
      responsiveFrontend: null,
      rebuilding: false,
      debounceTime: 1000,
      sizeLimitMin: 100,
      sizeLimitMax: 0,
      resizePercent: 100,
      firstMountStyle: true
    };
  },
  watch: {
    currentSizeRangeName: function currentSizeRangeName(n) {
      this.appOptions.currentBreakpoint = n;
    },
    directives: {
      handler: function handler() {
        this.currentDirectives = this.encodeResponsiveDirectives();
      },
      deep: true
    },
    'appOptions.currentSize': {
      handler: function handler(n) {
        var _this = this;

        var previousRangeName = this.currentSizeRangeName;
        this.currentSizeRangeName = this.calculateSizeRangeName(n);

        if (previousRangeName !== this.currentSizeRangeName && this.directives.responsiveEnabled) {
          this.rebuilding = true;
          (0, _DeBouncer.default)('currentSize', function () {
            // rebuilt table according to its responsive directives
            _this.responsiveFrontend.rebuildTables(_this.appOptions.currentSize);

            _this.rebuilding = false;
          }, this.debounceTime);
        }
      }
    }
  },
  beforeMount: function beforeMount() {// calculate slider size stops before mounting the component
    // this.sizeStops = this.sliderSizeStops();
  },
  mounted: function mounted() {
    var _this2 = this;

    // add a listener to section change event to hide/show component
    document.addEventListener('wptbSectionChanged', function (e) {
      _this2.isVisible = e.detail === 'table_responsive_menu';
    }); // @deprecated
    // const maxWidth = Number.parseInt(
    // 	document.querySelector(this.cloneQuery).dataset.wptbTableContainerMaxWidth,
    // 	10
    // );
    // const builderWidth = this.$refs.builderResponsive.getBoundingClientRect().width;
    //
    // // take maximum width of table to consideration while calculating size limit max
    // this.sizeLimitMax = Math.min(maxWidth, builderWidth);

    this.calculateSizeLimitMax();
  },
  computed: {
    /**
     * Calculate certain properties of responsive table element's style
     */
    tableStyle: function tableStyle() {
      // @deprecated
      // if (!this.directives.responsiveEnabled) {
      // 	return {};
      // }
      // don't make any style changes to table in desktop breakpoint to reflect the table builder styles intact since currently the breakpoint users are creating their table, by default, is desktop
      // if (this.currentSizeRangeName === 'desktop') {
      // 	return {};
      // }
      var width = this.limitToRange(this.appOptions.currentSize, Math.min(this.sizeLimitMin, this.sizeLimitMax), Math.max(this.sizeLimitMin, this.sizeLimitMax));
      return {
        width: "".concat(width, "px"),
        transform: "scale(".concat(this.resizePercent / 100, ")"),
        transformOrigin: 'center top',
        transition: 'all 0.2s ease-out'
      };
    },
    modalRelative: function modalRelative() {
      return document.querySelector('.wptb-builder-panel');
    }
  },
  methods: {
    /**
     * Limit a number between a min/max range.
     *
     * @param {number} val value to be limited
     * @param {number} min minimum value of range
     * @param {number} max maximum value of range
     * @return {number} limited value
     */
    limitToRange: function limitToRange(val, min, max) {
      if (val > max) {
        return max;
      }

      if (val < min) {
        return min;
      }

      return val;
    },
    // handler for `tableCloned` event of `TableClone` component. Mainly will be used to set up `WPTB_ResponsiveFrontend` class and update directives with the ones found on main table
    tableCloned: function tableCloned(mainDirectives, clonedTable) {
      // calculate new max size limit at every table clone to reflect changes if there is any
      this.calculateSizeLimitMax();
      this.responsiveFrontend = new _WPTB_ResponsiveFrontend.default({
        query: '.wptb-builder-responsive table'
      });
      var sortableTable = new _WPTB_SortableTable.default({
        table: clonedTable
      });
      sortableTable.sortableTableInitialization(this.responsiveFrontend); // there is already a directive at main table, decode and assign it to current ones

      if (mainDirectives) {
        var decodedMainDirectives = this.decodeResponsiveDirectives(mainDirectives);

        try {
          var mainDirectiveObj = JSON.parse(decodedMainDirectives);
          this.deepMergeObject(this.directives, mainDirectiveObj);
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn('[WPTB]: invalid directive found at main table');
        }
      }
    },

    /**
     * Deep merge two objects.
     *
     * In order to not break the object reference between store patterned objects, this function will be used to add every key of target object to base object, so instead of equalizing the store object to a new value, key values of the store will be updated, this way, object reference link will not be broken and reactive abilities of the store will continue to function.
     *
     * @param {Object} baseObj base object
     * @param {Object} targetObj target object
     */
    deepMergeObject: function deepMergeObject(baseObj, targetObj) {
      var _this3 = this;

      // eslint-disable-next-line array-callback-return
      Object.keys(targetObj).map(function (key) {
        if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
          if (baseObj[key] !== undefined) {
            if (_typeof(baseObj[key]) === 'object') {
              // eslint-disable-next-line no-param-reassign
              _this3.deepMergeObject(baseObj[key], targetObj[key]);
            } else {
              // eslint-disable-next-line no-param-reassign
              baseObj[key] = targetObj[key];
            }
          }
        }
      });
    },
    // handler for event that signals end of directive copy operation to table on DOM
    directivesCopied: function directivesCopied(mainTableHaveDirectives) {
      // rebuilt table according to its responsive directives
      this.responsiveFrontend.rebuildTables(this.appOptions.currentSize); // if main table have directives, it means that we are using them, so it is unnecessary to fire up save event for the table

      if (!mainTableHaveDirectives) {
        new WPTB_TableStateSaveManager().tableStateSet();
      }

      this.rebuilding = false;
    },

    /**
     * @deprecated
     * Recreate an object compatible with screen-size-slider component.
     *
     * This function will reduce the screen sizes object sent from backend to be compatible with screen-size-slider component.
     *
     * @return {Object} reformatted slider size object
     */
    sliderSizeStops: function sliderSizeStops() {
      var _this4 = this;

      var normalizedStops = Object.keys(this.screenSizes).reduce(function (p, c) {
        if (Object.prototype.hasOwnProperty.call(_this4.screenSizes, c)) {
          // eslint-disable-next-line no-param-reassign
          p[_this4.screenSizes[c].name] = _this4.screenSizes[c].width;
        }

        return p;
      }, {}); // add stops to directives
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties

      this.directives.stops = normalizedStops;
      return normalizedStops;
    },

    /**
     * Find out the range key name for the size value.
     *
     * @param {number} val size value
     * @return {string} range key name
     */
    calculateSizeRangeName: function calculateSizeRangeName(val) {
      var mainObject = this.directives.breakpoints;
      var ranges = Object.keys(mainObject).filter(function (s) {
        if (Object.prototype.hasOwnProperty.call(mainObject, s)) {
          return mainObject[s].width <= val;
        }

        return false;
      }).sort(function (a, b) {
        return mainObject[a].width - mainObject[b].width;
      });

      if (ranges.length === 0) {
        return 'mobile';
      }

      return ranges[ranges.length - 1];
    },
    handleSizeSlideChange: function handleSizeSlideChange(e) {
      this.appOptions.currentSize = e;
    },

    /**
     * Encode responsive directives.
     *
     * @return {string} base64 string representation of directives
     */
    encodeResponsiveDirectives: function encodeResponsiveDirectives() {
      var stringifiedDirectives = JSON.stringify(this.directives);
      return btoa(stringifiedDirectives);
    },

    /**
     * Decode responsive directives.
     *
     * @param {string} val
     * @return {string} decoded value
     */
    decodeResponsiveDirectives: function decodeResponsiveDirectives(val) {
      return atob(val);
    },
    showCellIdentifications: function showCellIdentifications() {
      this.appOptions.identifyCells = true;
    },
    calculateSizeLimitMax: function calculateSizeLimitMax() {
      var maxWidth = Number.parseInt(document.querySelector(this.cloneQuery).dataset.wptbTableContainerMaxWidth, 10);
      var builderWidth = this.$refs.builderResponsive.getBoundingClientRect().width; // take maximum width of table to consideration while calculating size limit max

      this.sizeLimitMax = Math.min(maxWidth, builderWidth);
    }
  }
};
exports.default = _default;
        var $26cd08 = exports.default || module.exports;
      
      if (typeof $26cd08 === 'function') {
        $26cd08 = $26cd08.options;
      }
    
        /* template */
        Object.assign($26cd08, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "wptb-fade" } }, [
    _vm.isVisible
      ? _c(
          "div",
          { ref: "builderResponsive", staticClass: "wptb-builder-responsive" },
          [
            _c(
              "div",
              { staticClass: "wptb-responsive-menu-tools" },
              [
                _c("screen-size-slider", {
                  attrs: {
                    "end-padding": _vm.sliderPadding,
                    stops: _vm.directives.breakpoints,
                    "model-val": _vm.appOptions.currentSize,
                    "enable-breakpoint-customization": false
                  },
                  on: { slide: _vm.handleSizeSlideChange }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass:
                  "wptb-responsive-builder-main wptb-checkerboard-pattern wptb-plugin-inset-shadow-md"
              },
              [
                _c(
                  "div",
                  { staticClass: "wptb-responsive-builder-toolbox-float" },
                  [
                    _c(
                      "div",
                      {
                        staticClass:
                          "wptb-responsive-builder-toolbox-left-float"
                      },
                      [
                        _c("number-postfix-input", {
                          staticClass:
                            "wptb-size-input wptb-plugin-box-shadow-xl",
                          attrs: { "post-fix": "px", "only-enter": true },
                          model: {
                            value: _vm.appOptions.currentSize,
                            callback: function($$v) {
                              _vm.$set(_vm.appOptions, "currentSize", $$v)
                            },
                            expression: "appOptions.currentSize"
                          }
                        }),
                        _vm._v(" "),
                        _c("number-postfix-buttons", {
                          attrs: {
                            "input-class": [
                              "wptb-size-input",
                              "wptb-plugin-box-shadow-xl"
                            ],
                            "post-fix": "%",
                            "only-enter": true,
                            min: 10,
                            max: 100,
                            enableLimit: true
                          },
                          model: {
                            value: _vm.resizePercent,
                            callback: function($$v) {
                              _vm.resizePercent = $$v
                            },
                            expression: "resizePercent"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "material-button",
                      {
                        staticClass: "wptb-plugin-box-shadow-xl",
                        attrs: {
                          size: "fit-content",
                          click: _vm.showCellIdentifications
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(_vm._f("cap")(_vm.strings.identifyCells)) +
                            "\n\t\t\t\t"
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c("table-clone", {
                  ref: "tableClone",
                  attrs: {
                    clone: _vm.isVisible,
                    "clone-query": _vm.cloneQuery,
                    "table-directives": _vm.currentDirectives,
                    "table-style": _vm.tableStyle
                  },
                  on: {
                    tableCloned: _vm.tableCloned,
                    directivesCopied: _vm.directivesCopied
                  }
                }),
                _vm._v(" "),
                _c("transition", { attrs: { name: "wptb-fade" } }, [
                  !_vm.directives.responsiveEnabled
                    ? _c("div", {
                        staticClass: "wptb-responsive-disabled-table-overlay"
                      })
                    : _vm._e()
                ]),
                _vm._v(" "),
                _c("transition", { attrs: { name: "wptb-fade" } }, [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.rebuilding,
                          expression: "rebuilding"
                        }
                      ],
                      staticClass: "wptb-responsive-wait-overlay"
                    },
                    [_vm._v(_vm._s(_vm.strings.rebuilding))]
                  )
                ]),
                _vm._v(" "),
                _c("modal-window", {
                  attrs: {
                    visible: _vm.appOptions.hasLegacyResponsive,
                    message: _vm.strings.legacyResponsiveWarning,
                    "relative-ref": _vm.modalRelative,
                    callback: function() {
                      _vm.appOptions.hasLegacyResponsive = false
                    }
                  }
                })
              ],
              1
            )
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../components/TableClone":"components/TableClone.vue","../components/ScreenSizeSlider":"components/ScreenSizeSlider.vue","../../../WPTB_ResponsiveFrontend":"../../WPTB_ResponsiveFrontend.js","../../WPTB_SortableTable":"../WPTB_SortableTable.js","../functions/DeBouncer":"functions/DeBouncer.js","../components/ModalWindow":"components/ModalWindow.vue","../components/MaterialButton":"components/MaterialButton.vue","../components/NumberPostfixInput":"components/NumberPostfixInput.vue","../components/NumberPostfixButtons":"components/NumberPostfixButtons.vue"}],"components/ResponsiveControlsRow.vue":[function(require,module,exports) {

        var $d55f26 = exports.default || module.exports;
      
      if (typeof $d55f26 === 'function') {
        $d55f26 = $d55f26.options;
      }
    
        /* template */
        Object.assign($d55f26, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wptb-controls-flex-row" },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"plugins/filters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Plugin for reusable.
 *
 * @param {object} Vue Vue instance
 * @param {object} options filter options
 */
// eslint-disable-next-line no-unused-vars
function install(Vue, options) {
  // capitalize filter
  Vue.filter('cap', function (val) {
    return val.split(' ').map(function (v) {
      return v[0].toUpperCase() + v.slice(1);
    }).join(' ');
  });
}

var _default = {
  install: install
};
exports.default = _default;
},{}],"plugins/strings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * plugin install method
 *
 * plugin for adding strings data field to all components to use
 *
 * @param {object} Vue Vue object
 * @param {object} options options to be used at plugin
 * @returns {{strings: boolean}}
 */
function install(Vue, options) {
  Vue.mixin({
    data: function data() {
      return {
        strings: options.strings
      };
    }
  });
}
/**
 * @module strings plugin
 */


var _default = {
  install: install
};
exports.default = _default;
},{}],"../../../../../node_modules/vue-fragment/dist/vue-fragment.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = exports.SSR = exports.Fragment = exports.default = void 0;

function _defineProperty(e, n, t) {
  return n in e ? Object.defineProperty(e, n, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[n] = t, e;
}

function _objectSpread(e) {
  for (var n = 1; n < arguments.length; n++) {
    var t = null != arguments[n] ? arguments[n] : {},
        r = Object.keys(t);
    "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(t).filter(function (e) {
      return Object.getOwnPropertyDescriptor(t, e).enumerable;
    }))), r.forEach(function (n) {
      _defineProperty(e, n, t[n]);
    });
  }

  return e;
}

var freeze = function (e, n, t) {
  Object.defineProperty(e, n, {
    configurable: !0,
    get: function () {
      return t;
    },
    set: function (e) {
      console.warn("tried to set frozen property ".concat(n, " with ").concat(e));
    }
  });
},
    unfreeze = function (e, n) {
  var t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
  Object.defineProperty(e, n, {
    configurable: !0,
    writable: !0,
    value: t
  });
},
    component = {
  abstract: !0,
  name: "Fragment",
  props: {
    name: {
      type: String,
      default: function () {
        return Math.floor(Date.now() * Math.random()).toString(16);
      }
    }
  },
  mounted: function () {
    var e = this.$el,
        n = e.parentNode,
        t = document.createComment("fragment#".concat(this.name, "#head")),
        r = document.createComment("fragment#".concat(this.name, "#tail"));
    n.insertBefore(t, e), n.insertBefore(r, e), e.appendChild = function (t) {
      n.insertBefore(t, r), freeze(t, "parentNode", e);
    }, e.insertBefore = function (t, r) {
      n.insertBefore(t, r), freeze(t, "parentNode", e);
    }, e.removeChild = function (e) {
      n.removeChild(e), unfreeze(e, "parentNode");
    }, Array.from(e.childNodes).forEach(function (n) {
      return e.appendChild(n);
    }), n.removeChild(e), freeze(e, "parentNode", n), freeze(e, "nextSibling", r.nextSibling);
    var o = n.insertBefore;

    n.insertBefore = function (r, i) {
      o.call(n, r, i !== e ? i : t);
    };

    var i = n.removeChild;

    n.removeChild = function (a) {
      if (a === e) {
        for (; t.nextSibling !== r;) e.removeChild(t.nextSibling);

        n.removeChild(t), n.removeChild(r), unfreeze(e, "parentNode"), n.insertBefore = o, n.removeChild = i;
      } else i.call(n, a);
    };
  },
  render: function (e) {
    var n = this,
        t = this.$slots.default;
    return t && t.length && t.forEach(function (e) {
      return e.data = _objectSpread({}, e.data, {
        attrs: _objectSpread({
          fragment: n.name
        }, (e.data || {}).attrs)
      });
    }), e("div", {
      attrs: {
        fragment: this.name
      }
    }, t);
  }
};

function ssr(e, n) {
  "production" !== "development" && console.warn("v-fragment SSR is not implemented yet.");
}

var Fragment = component,
    SSR = ssr,
    Plugin = {
  install: function (e) {
    e.component("fragment", component);
  }
},
    index = {
  Fragment: component,
  Plugin: Plugin,
  SSR: ssr
};
exports.Plugin = Plugin;
exports.SSR = SSR;
exports.Fragment = Fragment;
var _default = index;
exports.default = _default;
},{}],"mixins/PanelControlBase.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Base for left panel controls that will be hooked directly to Vue instances.
 */
var PanelControlBase = {
  props: {
    label: String,
    value: {
      type: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    dependsValue: {
      type: null,
      default: null
    },
    dependsCallback: {
      type: Function,
      default: function _default(d, c) {
        return c;
      }
    }
  },
  data: function data() {
    return {
      innerValue: ''
    };
  },
  model: {
    prop: 'value',
    event: 'valueChanged'
  },
  watch: {
    value: function value(n) {
      this.innerValue = n;
    },
    innerValue: function innerValue(n) {
      this.$emit('valueChanged', n);
    },
    dependsValue: function dependsValue(n) {
      if (n === null) {
        return;
      }

      this.innerValue = this.dependsCallback.call(this, n, this.innerValue);
    }
  },
  mounted: function mounted() {
    this.innerValue = this.value;
  }
};
var _default = PanelControlBase;
exports.default = _default;
},{}],"components/PanelToggleControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PanelControlBase = _interopRequireDefault(require("../mixins/PanelControlBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  mixins: [_PanelControlBase.default]
};
exports.default = _default;
        var $f6974b = exports.default || module.exports;
      
      if (typeof $f6974b === 'function') {
        $f6974b = $f6974b.options;
      }
    
        /* template */
        Object.assign($f6974b, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-element-option wptb-settings-items wptb-plugin-width-full"
    },
    [
      _c("div", { staticClass: "wptb-settings-row wptb-settings-middle-xs" }, [
        _c("label", { staticClass: "wptb-toggle" }, [
          _c("span", { staticStyle: { "font-size": "16px" } }, [
            _vm._v("\n\t\t\t\t" + _vm._s(_vm.label) + "\n\t\t\t")
          ]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.innerValue,
                expression: "innerValue"
              }
            ],
            staticClass: "wptb-element-property",
            attrs: { type: "checkbox", disabled: _vm.disabled },
            domProps: {
              checked: Array.isArray(_vm.innerValue)
                ? _vm._i(_vm.innerValue, null) > -1
                : _vm.innerValue
            },
            on: {
              change: function($event) {
                var $$a = _vm.innerValue,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 && (_vm.innerValue = $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      (_vm.innerValue = $$a
                        .slice(0, $$i)
                        .concat($$a.slice($$i + 1)))
                  }
                } else {
                  _vm.innerValue = $$c
                }
              }
            }
          }),
          _vm._v(" "),
          _c("i")
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/PanelControlBase":"mixins/PanelControlBase.js"}],"components/PanelDropdownControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PanelControlBase = _interopRequireDefault(require("../mixins/PanelControlBase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    options: {
      type: Object,
      default: function _default() {}
    }
  },
  mixins: [_PanelControlBase.default]
};
exports.default = _default;
        var $5b3d68 = exports.default || module.exports;
      
      if (typeof $5b3d68 === 'function') {
        $5b3d68 = $5b3d68.options;
      }
    
        /* template */
        Object.assign($5b3d68, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-element-option wptb-settings-items wptb-plugin-width-full"
    },
    [
      _c("div", { staticClass: "wptb-settings-row wptb-settings-middle-xs" }, [
        _c(
          "label",
          {
            staticClass:
              "wptb-control-row wptb-flex wptb-flex-row wptb-flex-align-center wptb-flex-justify-space-between"
          },
          [
            _c("span", { staticStyle: { "font-size": "16px" } }, [
              _vm._v("\n\t\t\t\t" + _vm._s(_vm.label) + "\n\t\t\t")
            ]),
            _vm._v(" "),
            _c(
              "select",
              {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.innerValue,
                    expression: "innerValue"
                  }
                ],
                attrs: { disabled: _vm.disabled },
                on: {
                  change: function($event) {
                    var $$selectedVal = Array.prototype.filter
                      .call($event.target.options, function(o) {
                        return o.selected
                      })
                      .map(function(o) {
                        var val = "_value" in o ? o._value : o.value
                        return val
                      })
                    _vm.innerValue = $event.target.multiple
                      ? $$selectedVal
                      : $$selectedVal[0]
                  }
                }
              },
              _vm._l(_vm.options, function(name, key) {
                return _c("option", { key: key, domProps: { value: key } }, [
                  _vm._v(_vm._s(_vm._f("cap")(name)))
                ])
              }),
              0
            )
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/PanelControlBase":"mixins/PanelControlBase.js"}],"components/ResponsivePanelGeneralControls.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueFragment = require("vue-fragment");

var _PanelToggleControl = _interopRequireDefault(require("./PanelToggleControl"));

var _PanelDropdownControl = _interopRequireDefault(require("./PanelDropdownControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    PanelToggleControl: _PanelToggleControl.default,
    PanelDropdownControl: _PanelDropdownControl.default,
    Fragment: _vueFragment.Fragment
  }
};
exports.default = _default;
        var $1e9780 = exports.default || module.exports;
      
      if (typeof $1e9780 === 'function') {
        $1e9780 = $1e9780.options;
      }
    
        /* template */
        Object.assign($1e9780, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "fragment",
    [
      _c("panel-toggle-control", {
        attrs: { label: _vm._f("cap")(_vm.strings.enableResponsive) },
        model: {
          value: _vm.directives.responsiveEnabled,
          callback: function($$v) {
            _vm.$set(_vm.directives, "responsiveEnabled", $$v)
          },
          expression: "directives.responsiveEnabled"
        }
      }),
      _vm._v(" "),
      _c("panel-dropdown-control", {
        attrs: {
          label: _vm._f("cap")(_vm.strings.relative),
          options: {
            window: _vm.strings.window,
            container: _vm.strings.container
          },
          disabled: !_vm.directives.responsiveEnabled
        },
        model: {
          value: _vm.directives.relativeWidth,
          callback: function($$v) {
            _vm.$set(_vm.directives, "relativeWidth", $$v)
          },
          expression: "directives.relativeWidth"
        }
      }),
      _vm._v(" "),
      _c("panel-dropdown-control", {
        attrs: {
          label: _vm._f("cap")(_vm.strings.mode),
          options: { auto: "auto" },
          disabled: !_vm.directives.responsiveEnabled
        },
        model: {
          value: _vm.directives.responsiveMode,
          callback: function($$v) {
            _vm.$set(_vm.directives, "responsiveMode", $$v)
          },
          expression: "directives.responsiveMode"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vue-fragment":"../../../../../node_modules/vue-fragment/dist/vue-fragment.esm.js","./PanelToggleControl":"components/PanelToggleControl.vue","./PanelDropdownControl":"components/PanelDropdownControl.vue"}],"components/PanelSectionGroupTabbed.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    header: {
      type: String,
      default: 'Tab Header'
    },
    // tabs object, keys for tab ids, values for translated tab names
    tabs: {
      type: Object,
      default: function _default() {
        return {
          default: 'Default'
        };
      }
    },
    // id of currentTab
    currentTab: {
      type: String,
      default: 'default'
    }
  },
  methods: {
    // decide if the tab is active based on current active tab property
    isActiveTab: function isActiveTab(tabId) {
      return this.currentTab === tabId;
    },
    handleTabClick: function handleTabClick(tabId) {
      this.$emit('tabClicked', tabId);
    }
  }
};
exports.default = _default;
        var $3d2461 = exports.default || module.exports;
      
      if (typeof $3d2461 === 'function') {
        $3d2461 = $3d2461.options;
      }
    
        /* template */
        Object.assign($3d2461, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-section-group-tabbed wptb-plugin-box-shadow-md wptb-plugin-width-full"
    },
    [
      _c(
        "div",
        { staticClass: "wptb-panel-toggle wptb-section-group-tabbed-header" },
        [_c("div", { staticClass: "header" }, [_vm._v(_vm._s(_vm.header))])]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "wptb-section-group-tabbed-tabs-buttons" },
        _vm._l(_vm.tabs, function(name, id) {
          return _c(
            "div",
            {
              key: id,
              staticClass: "wptb-settings-section-item static-active",
              class: {
                active: _vm.isActiveTab(id),
                disabled: !_vm.isActiveTab(id)
              },
              on: {
                "!click": function($event) {
                  $event.preventDefault()
                  return _vm.handleTabClick(id)
                }
              }
            },
            [_vm._v("\n\t\t\t" + _vm._s(name) + "\n\t\t")]
          )
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "wptb-section-group-tab-content" },
        [_vm._t("default")],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/PanelInputControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PanelControlBase = _interopRequireDefault(require("../mixins/PanelControlBase"));

var _NumberPostfixInput = _interopRequireDefault(require("./NumberPostfixInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    NumberPostfixInput: _NumberPostfixInput.default
  },
  mixins: [_PanelControlBase.default]
};
exports.default = _default;
        var $089a84 = exports.default || module.exports;
      
      if (typeof $089a84 === 'function') {
        $089a84 = $089a84.options;
      }
    
        /* template */
        Object.assign($089a84, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-element-option wptb-settings-items wptb-plugin-width-full"
    },
    [
      _c("div", { staticClass: "wptb-settings-row wptb-settings-middle-xs" }, [
        _c(
          "label",
          {
            staticClass:
              "wptb-control-row wptb-flex wptb-flex-row wptb-flex-align-center wptb-flex-justify-space-between"
          },
          [
            _c("span", { staticStyle: { "font-size": "16px" } }, [
              _vm._v("\n\t\t\t\t" + _vm._s(_vm.label) + "\n\t\t\t")
            ]),
            _vm._v(" "),
            _c("number-postfix-input", {
              staticClass: "wptb-size-input",
              attrs: {
                "enable-dynamic-width": true,
                min: 1,
                max: 100,
                "enable-limit": true,
                disabled: _vm.disabled
              },
              model: {
                value: _vm.innerValue,
                callback: function($$v) {
                  _vm.innerValue = $$v
                },
                expression: "innerValue"
              }
            })
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/PanelControlBase":"mixins/PanelControlBase.js","./NumberPostfixInput":"components/NumberPostfixInput.vue"}],"components/AutoModePanelControls.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueFragment = require("vue-fragment");

var _PanelToggleControl = _interopRequireDefault(require("./PanelToggleControl"));

var _PanelDropdownControl = _interopRequireDefault(require("./PanelDropdownControl"));

var _PanelInputControl = _interopRequireDefault(require("./PanelInputControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    Fragment: _vueFragment.Fragment,
    PanelToggleControl: _PanelToggleControl.default,
    PanelDropdownControl: _PanelDropdownControl.default,
    PanelInputControl: _PanelInputControl.default
  },
  methods: {
    isDisabled: function isDisabled() {
      return this.appOptions.currentBreakpoint === 'desktop' || !this.directives.responsiveEnabled;
    }
  },
  computed: {
    perLabelString: function perLabelString() {
      return this.directives.modeOptions.auto.topRowAsHeader[this.appOptions.currentBreakpoint] ? this.strings.itemsPerHeader : this.strings.cellsPerRow;
    }
  }
};
exports.default = _default;
        var $085e64 = exports.default || module.exports;
      
      if (typeof $085e64 === 'function') {
        $085e64 = $085e64.options;
      }
    
        /* template */
        Object.assign($085e64, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "fragment",
    [
      _c("panel-toggle-control", {
        attrs: {
          label: _vm._f("cap")(_vm.strings.topRowHeader),
          disabled: _vm.isDisabled(),
          "depends-value":
            _vm.directives.modeOptions.auto.staticTopRow[
              _vm.appOptions.currentBreakpoint
            ],
          "depends-callback": function(d, c) {
            if (d === true) {
              return false
            }
            return c
          }
        },
        model: {
          value:
            _vm.directives.modeOptions.auto.topRowAsHeader[
              _vm.appOptions.currentBreakpoint
            ],
          callback: function($$v) {
            _vm.$set(
              _vm.directives.modeOptions.auto.topRowAsHeader,
              _vm.appOptions.currentBreakpoint,
              $$v
            )
          },
          expression:
            "directives.modeOptions.auto.topRowAsHeader[appOptions.currentBreakpoint]"
        }
      }),
      _vm._v(" "),
      _c("panel-toggle-control", {
        attrs: {
          label: _vm._f("cap")(_vm.strings.staticTopRow),
          disabled: _vm.isDisabled(),
          "depends-value":
            _vm.directives.modeOptions.auto.topRowAsHeader[
              _vm.appOptions.currentBreakpoint
            ],
          "depends-callback": function(d, c) {
            if (d === true) {
              return false
            }
            return c
          }
        },
        model: {
          value:
            _vm.directives.modeOptions.auto.staticTopRow[
              _vm.appOptions.currentBreakpoint
            ],
          callback: function($$v) {
            _vm.$set(
              _vm.directives.modeOptions.auto.staticTopRow,
              _vm.appOptions.currentBreakpoint,
              $$v
            )
          },
          expression:
            "directives.modeOptions.auto.staticTopRow[appOptions.currentBreakpoint]"
        }
      }),
      _vm._v(" "),
      _c("panel-dropdown-control", {
        attrs: {
          label: _vm._f("cap")(_vm.strings.stackDirection),
          options: { row: _vm.strings.row, column: _vm.strings.column },
          disabled: _vm.isDisabled()
        },
        model: {
          value:
            _vm.directives.modeOptions.auto.cellStackDirection[
              _vm.appOptions.currentBreakpoint
            ],
          callback: function($$v) {
            _vm.$set(
              _vm.directives.modeOptions.auto.cellStackDirection,
              _vm.appOptions.currentBreakpoint,
              $$v
            )
          },
          expression:
            "directives.modeOptions.auto.cellStackDirection[appOptions.currentBreakpoint]"
        }
      }),
      _vm._v(" "),
      _c("panel-input-control", {
        attrs: {
          label: _vm._f("cap")(_vm.perLabelString),
          disabled: _vm.isDisabled()
        },
        model: {
          value:
            _vm.directives.modeOptions.auto.cellsPerRow[
              _vm.appOptions.currentBreakpoint
            ],
          callback: function($$v) {
            _vm.$set(
              _vm.directives.modeOptions.auto.cellsPerRow,
              _vm.appOptions.currentBreakpoint,
              $$v
            )
          },
          expression:
            "directives.modeOptions.auto.cellsPerRow[appOptions.currentBreakpoint]"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vue-fragment":"../../../../../node_modules/vue-fragment/dist/vue-fragment.esm.js","./PanelToggleControl":"components/PanelToggleControl.vue","./PanelDropdownControl":"components/PanelDropdownControl.vue","./PanelInputControl":"components/PanelInputControl.vue"}],"components/ResponsivePanelModeControls.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PanelSectionGroupTabbed = _interopRequireDefault(require("./PanelSectionGroupTabbed"));

var _AutoModePanelControls = _interopRequireDefault(require("./AutoModePanelControls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    PanelSectionGroupTabbed: _PanelSectionGroupTabbed.default,
    AutoModePanelControls: _AutoModePanelControls.default
  },
  computed: {
    breakpointsObject: function breakpointsObject() {
      var _this = this;

      return Object.keys(this.directives.breakpoints).sort(function (a, b) {
        // sort breakpoints by their width ascending
        return _this.directives.breakpoints[a].width - _this.directives.breakpoints[b].width;
      }).reduce(function (c, k) {
        if (Object.prototype.hasOwnProperty.call(_this.directives.breakpoints, k)) {
          // eslint-disable-next-line no-param-reassign
          c[k] = _this.directives.breakpoints[k].name;
        }

        return c;
      }, {});
    },
    currentPanelControls: function currentPanelControls() {
      return "".concat(this.directives.responsiveMode[0].toUpperCase() + this.directives.responsiveMode.slice(1), "ModePanelControls");
    }
  },
  methods: {
    /**
     * Handle tab change
     * @param {string} tabId breakpoint id
     */
    handleTabChange: function handleTabChange(tabId) {
      // assign tabId to breakpoint id property of global store
      this.appOptions.currentBreakpoint = tabId; // get breakpoint size and assign to size property of global store to force a rebuilding process

      this.appOptions.currentSize = this.directives.breakpoints[tabId].width;
    }
  }
};
exports.default = _default;
        var $b7cc79 = exports.default || module.exports;
      
      if (typeof $b7cc79 === 'function') {
        $b7cc79 = $b7cc79.options;
      }
    
        /* template */
        Object.assign($b7cc79, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "panel-section-group-tabbed",
    {
      attrs: {
        "current-tab": _vm.appOptions.currentBreakpoint,
        tabs: _vm.breakpointsObject,
        header: _vm.strings[_vm.directives.responsiveMode]
      },
      on: { tabClicked: _vm.handleTabChange }
    },
    [_c(_vm.currentPanelControls, { tag: "component" })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./PanelSectionGroupTabbed":"components/PanelSectionGroupTabbed.vue","./AutoModePanelControls":"components/AutoModePanelControls.vue"}],"mountPoints/WPTB_ResponsiveTable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _ResponsiveApp = _interopRequireDefault(require("../containers/ResponsiveApp"));

var _ResponsiveControlsRow = _interopRequireDefault(require("../components/ResponsiveControlsRow"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

var _filters = _interopRequireDefault(require("../plugins/filters"));

var _strings = _interopRequireDefault(require("../plugins/strings"));

var _ResponsivePanelGeneralControls = _interopRequireDefault(require("../components/ResponsivePanelGeneralControls"));

var _ResponsivePanelModeControls = _interopRequireDefault(require("../components/ResponsivePanelModeControls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'ResponsiveTable',
  handler: function responsiveTableJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData('responsiveMenuData');

    var mainTableQuery = '.wptb-preview-table';
    /**
     * Various options that will be used all around the app
     *
     * * identifyCells -> show visual unique identification for table cell elements
     * * hasLegacyResponsive -> indicates current table has legacy responsive functionality enabled
     * * currentBreakpoint -> id of the current breakpoint
     * * currentSize -> current screen size value that is being used in responsive builder. this is not the actual screen size value of the current window but a mock up value to provide a display of table's layout at different sizes
     *
     */

    var appOptions = {
      identifyCells: false,
      hasLegacyResponsive: false,
      currentBreakpoint: 'desktop',
      currentSize: 0
    }; // directives for responsive features
    // add default options value at here instead of assigning them at app dynamically. this way, default options can be used for error checking and will prevent bugs/security concerns beforehand

    var directives = {
      responsiveEnabled: false,
      responsiveMode: 'auto',
      preserveRowColor: false,
      relativeWidth: 'window',
      modeOptions: {
        auto: {
          topRowAsHeader: {
            desktop: false,
            tablet: false,
            mobile: false
          },
          staticTopRow: {
            desktop: false,
            tablet: false,
            mobile: false
          },
          cellStackDirection: {
            desktop: 'row',
            tablet: 'row',
            mobile: 'row'
          },
          cellsPerRow: {
            desktop: 1,
            tablet: 1,
            mobile: 1
          }
        }
      },
      breakpoints: data.screenSizes
    }; // singleton store object
    // this object implementation will give us the ability to persist the state of certain data properties across all app

    var optionsStore = {
      // eslint-disable-next-line no-shadow
      install: function install(Vue, options) {
        Vue.mixin({
          data: function data() {
            return options.data;
          }
        });
      }
    }; // app wide components that will be available for every component

    var appWideComponents = {
      // eslint-disable-next-line no-shadow
      install: function install(Vue, _ref) {
        var components = _ref.components;
        Vue.mixin({
          components: components
        });
      }
    }; // app wide components setup

    _vue.default.use(appWideComponents, {
      components: {
        ResponsiveControlsRow: _ResponsiveControlsRow.default
      }
    }); // options store setup


    _vue.default.use(optionsStore, {
      data: {
        appOptions: appOptions,
        directives: directives
      }
    }); // filters setup


    _vue.default.use(_filters.default); // translation strings setup


    _vue.default.use(_strings.default, data); // vue builder instance


    new _vue.default({
      components: {
        ResponsiveApp: _ResponsiveApp.default
      },
      data: _objectSpread({
        mainTableQuery: mainTableQuery
      }, data),
      template: '<responsive-app :clone-query="mainTableQuery" :screen-sizes="screenSizes" :compare-sizes="compareSizes"></responsive-app>'
    }).$mount("#".concat(uniqueId)); // left panel general controls instance

    new _vue.default({
      components: {
        ResponsivePanelGeneralControls: _ResponsivePanelGeneralControls.default
      },
      template: '<responsive-panel-general-controls></responsive-panel-general-controls>'
    }).$mount('#responsiveBuilderLeftPanelGeneralControls'); // left panel mode controls

    new _vue.default({
      components: {
        ResponsivePanelModeControls: _ResponsivePanelModeControls.default
      },
      data: _objectSpread({}, data),
      template: '<responsive-panel-mode-controls></responsive-panel-mode-controls>'
    }).$mount('#responsiveBuilderLeftPanelModeOptions');
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../containers/ResponsiveApp":"containers/ResponsiveApp.vue","../components/ResponsiveControlsRow":"components/ResponsiveControlsRow.vue","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js","../plugins/filters":"plugins/filters.js","../plugins/strings":"plugins/strings.js","../components/ResponsivePanelGeneralControls":"components/ResponsivePanelGeneralControls.vue","../components/ResponsivePanelModeControls":"components/ResponsivePanelModeControls.vue"}],"components/SideInput.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    label: {
      type: String,
      default: 'top'
    },
    value: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'value',
    event: 'valueChanged'
  },
  mounted: function mounted() {
    this.innerValue = this.value;
  },
  data: function data() {
    return {
      innerValue: 0
    };
  },
  watch: {
    value: function value(n) {
      this.innerValue = n;
    },
    innerValue: function innerValue(n) {
      this.$emit('valueChanged', Number.parseInt(n, 10));
    }
  },
  methods: {
    inputChange: function inputChange(e) {
      this.$emit('changedFromFront', this.$vnode.key, e.target.value);
      this.innerValue = e.target.value;
    }
  }
};
exports.default = _default;
        var $d91df7 = exports.default || module.exports;
      
      if (typeof $d91df7 === 'function') {
        $d91df7 = $d91df7.options;
      }
    
        /* template */
        Object.assign($d91df7, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-side-control-input-wrapper wptb-side-control-number-input"
    },
    [
      _c("div", { staticClass: "wptb-side-control-header" }, [
        _vm._v("\n\t\t" + _vm._s(_vm._f("cap")(_vm.label)) + "\n\t")
      ]),
      _vm._v(" "),
      _c("div", [
        _c("input", {
          staticClass: "wptb-side-control-main-input",
          attrs: { type: "number", disabled: _vm.disabled },
          domProps: { value: _vm.innerValue },
          on: { input: _vm.inputChange }
        })
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/SideDropdown.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    value: {
      type: String,
      default: 'px'
    }
  },
  model: {
    prop: 'value',
    event: 'valueChanged'
  },
  data: function data() {
    return {
      options: ['px', '%'],
      innerValue: ''
    };
  },
  mounted: function mounted() {
    this.innerValue = this.value;
  },
  watch: {
    value: function value(n) {
      this.innerValue = n;
    },
    innerValue: function innerValue(n) {
      this.$emit('valueChanged', n);
    }
  },
  methods: {
    isSelected: function isSelected(k) {
      return this.innerValue === k;
    }
  }
};
exports.default = _default;
        var $d95020 = exports.default || module.exports;
      
      if (typeof $d95020 === 'function') {
        $d95020 = $d95020.options;
      }
    
        /* template */
        Object.assign($d95020, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-side-control-input-wrapper wptb-side-control-dropdown-wrapper"
    },
    [
      _c(
        "select",
        {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.innerValue,
              expression: "innerValue"
            }
          ],
          staticClass:
            "wptb-side-control-main-input wptb-side-control-dropdown",
          on: {
            change: function($event) {
              var $$selectedVal = Array.prototype.filter
                .call($event.target.options, function(o) {
                  return o.selected
                })
                .map(function(o) {
                  var val = "_value" in o ? o._value : o.value
                  return val
                })
              _vm.innerValue = $event.target.multiple
                ? $$selectedVal
                : $$selectedVal[0]
            }
          }
        },
        _vm._l(_vm.options, function(option) {
          return _c(
            "option",
            {
              key: option,
              domProps: { value: option, selected: _vm.isSelected(option) }
            },
            [_vm._v(_vm._s(option))]
          )
        }),
        0
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"containers/SidesControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

var _SideInput = _interopRequireDefault(require("../components/SideInput"));

var _SideDropdown = _interopRequireDefault(require("../components/SideDropdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  props: {
    linkIcon: {
      type: String,
      default: null
    },
    unlinkIcon: {
      type: String,
      default: null
    },
    strings: {
      type: Object,
      required: true
    },
    defaultValue: {
      type: String,
      default: '0 0 0 0'
    },
    allowNegative: {
      type: Boolean,
      default: true
    }
  },
  mixins: [_ControlBase.default],
  components: {
    SideInput: _SideInput.default,
    SideDropdown: _SideDropdown.default
  },
  data: function data() {
    return {
      linkValues: false,
      sideValues: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      lastEdited: 'top',
      type: 'px',
      suppressDirty: true,
      forceUpdate: 1
    };
  },
  mounted: function mounted() {
    this.assignDefaultValue();
    this.parseElementValue();
  },
  updated: function updated() {
    this.suppressDirty = false;
  },
  watch: {
    sideValues: {
      handler: function handler() {
        this.forceUpdate += 1;
        this.calculateElementValue();
      },
      deep: true
    },
    elementMainValue: {
      handler: function handler(n) {
        this.setAllValues(n);
        this.generateChangeEvent(n);

        if (this.suppressDirty) {
          this.resetMountedState();
        }

        this.setTableDirty(true);
      },
      immediate: true
    },
    linkValues: function linkValues() {
      this.calculateElementValue();
    },
    type: function type() {
      this.calculateElementValue();
    }
  },
  methods: {
    inputChanged: function inputChanged(key) {
      this.lastEdited = key;
    },
    calculateElementValue: function calculateElementValue() {
      var _this = this;

      this.assignLinkedValues();
      this.elementMainValue = Object.keys(this.sideValues) // eslint-disable-next-line array-callback-return,consistent-return
      .map(function (k) {
        if (Object.prototype.hasOwnProperty.call(_this.sideValues, k)) {
          return _this.sideValues[k] + _this.type;
        }
      }).join(' ');
    },
    assignLinkedValues: function assignLinkedValues() {
      var _this2 = this;

      if (this.linkValues) {
        Object.keys(this.sideValues) // eslint-disable-next-line array-callback-return
        .map(function (k) {
          if (Object.prototype.hasOwnProperty.call(_this2.sideValues, k)) {
            var val = _this2.sideValues[_this2.lastEdited];

            if (!_this2.allowNegative) {
              // eslint-disable-next-line operator-assignment
              val = Math.sign(val) * val;
            }

            _this2.$set(_this2.sideValues, k, val); // this.sideValues[k] = val;

          }
        });
      }
    },
    parseElementValue: function parseElementValue() {
      var parsedType = 'px'; // find out value type from element main value or use the default type
      // eslint-disable-next-line array-callback-return

      this.elementMainValue.split(' ').map(function (s) {
        var match = s.match(/([a-z%?]+)/);

        if (match && match[1]) {
          var _match = _slicedToArray(match, 2);

          parsedType = _match[1];
        }
      }); // assign startup value type

      this.type = parsedType; // fetch style syntaxed values and split them into array elements

      var values = _toConsumableArray(this.elementMainValue.matchAll(/[-?\d]+/g)).flatMap(function (s) {
        return Number.parseInt(s[0], 10);
      });

      if (values) {
        // assign values to their respective properties
        if (values.length === 1) {
          var _values = _slicedToArray(values, 1);

          this.sideValues.top = _values[0];

          var _values2 = _slicedToArray(values, 1);

          this.sideValues.bottom = _values2[0];

          var _values3 = _slicedToArray(values, 1);

          this.sideValues.left = _values3[0];

          var _values4 = _slicedToArray(values, 1);

          this.sideValues.right = _values4[0];
          // link values if all of the parsed values are the same
          this.linkValues = true;
        } else if (values.length === 2) {
          var _values5 = _slicedToArray(values, 2);

          this.sideValues.bottom = _values5[0];
          this.sideValues.left = _values5[1];

          var _values6 = _slicedToArray(values, 2);

          this.sideValues.top = _values6[0];
          this.sideValues.right = _values6[1];
        } else if (values.length === 3) {
          var _values7 = _slicedToArray(values, 3);

          this.sideValues.top = _values7[0];
          this.sideValues.right = _values7[1];
          this.sideValues.bottom = _values7[2];
          this.sideValues.left = 0;
        } else {
          var _values8 = _slicedToArray(values, 4);

          this.sideValues.top = _values8[0];
          this.sideValues.right = _values8[1];
          this.sideValues.bottom = _values8[2];
          this.sideValues.left = _values8[3];
        }
      }
    }
  }
};
exports.default = _default;
        var $3b6a1a = exports.default || module.exports;
      
      if (typeof $3b6a1a === 'function') {
        $3b6a1a = $3b6a1a.options;
      }
    
        /* template */
        Object.assign($3b6a1a, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c("div", { staticClass: "wptb-settings-item-header-include-right" }, [
      _c("div", { staticClass: "wptb-settings-space-between" }, [
        _c("div", [_vm._v(_vm._s(_vm._f("cap")(_vm.label)))]),
        _vm._v(" "),
        _c(
          "div",
          {
            on: {
              click: function($event) {
                $event.preventDefault()
                _vm.linkValues = !_vm.linkValues
              }
            }
          },
          [
            !_vm.linkValues
              ? _c("div", { staticClass: "wptb-sides-link-icon-wrapper" }, [
                  _c("img", {
                    attrs: { src: _vm.linkIcon, title: _vm.strings.link }
                  })
                ])
              : _c("div", { staticClass: "wptb-sides-link-icon-wrapper" }, [
                  _c("img", {
                    attrs: { src: _vm.unlinkIcon, title: _vm.strings.unlink }
                  })
                ])
          ]
        )
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass:
          "wptb-settings-row wptb-settings-middle-xs wptb-sides-controls-wrapper",
        class: { "wptb-side-values-linked": _vm.linkValues }
      },
      [
        _vm._l(_vm.sideValues, function(v, k) {
          return _c("side-input", {
            key: k,
            attrs: { label: _vm.strings[k] },
            on: { changedFromFront: _vm.inputChanged },
            model: {
              value: _vm.sideValues[k],
              callback: function($$v) {
                _vm.$set(_vm.sideValues, k, $$v)
              },
              expression: "sideValues[k]"
            }
          })
        }),
        _vm._v(" "),
        _c("side-dropdown", {
          model: {
            value: _vm.type,
            callback: function($$v) {
              _vm.type = $$v
            },
            expression: "type"
          }
        })
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/ControlBase":"mixins/ControlBase.js","../components/SideInput":"components/SideInput.vue","../components/SideDropdown":"components/SideDropdown.vue"}],"mountPoints/WPTB_SidesControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

var _SidesControl = _interopRequireDefault(require("../containers/SidesControl"));

var _filters = _interopRequireDefault(require("../plugins/filters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sides control
 */
// eslint-disable-next-line camelcase
var _default = {
  name: 'ControlSides',
  handler: function sidesControlJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId); // add filters for vue instance


    _vue.default.use(_filters.default);

    new _vue.default({
      data: data,
      components: {
        SidesControl: _SidesControl.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js","../containers/SidesControl":"containers/SidesControl.vue","../plugins/filters":"plugins/filters.js"}],"components/NamedToggleItem.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    title: {
      type: String,
      default: 'item'
    },
    id: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    active: function active(n) {
      if (n === true) {
        this.$emit('activateItem', this.id, this.$refs.itemWrapper);
      }
    }
  },
  methods: {
    activateItem: function activateItem(e) {
      this.$emit('activateItem', this.id, e.target);
    }
  }
};
exports.default = _default;
        var $40eb3b = exports.default || module.exports;
      
      if (typeof $40eb3b === 'function') {
        $40eb3b = $40eb3b.options;
      }
    
        /* template */
        Object.assign($40eb3b, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      ref: "itemWrapper",
      staticClass: "wptb-named-toggle-item",
      attrs: { "data-wptb-named-toggle-active": _vm.active },
      on: {
        "!click": function($event) {
          $event.preventDefault()
          return _vm.activateItem($event)
        }
      }
    },
    [_vm._v("\n\t" + _vm._s(_vm.title) + "\n")]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/NamedToggleActiveIndicator.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
var _default = {
  props: {
    refElement: {
      type: HTMLElement,
      default: null
    }
  },
  data: function data() {
    return {
      style: {
        left: 0,
        top: 0,
        width: 0
      }
    };
  },
  watch: {
    refElement: function refElement(n) {
      if (n === null || n === undefined) {
        return;
      }

      this.calculatePosition();
    }
  },
  methods: {
    calculatePosition: function calculatePosition() {
      var mainWrapperPosObj = this.$refs.main.parentNode.getBoundingClientRect();
      var targetPosObj = this.refElement.getBoundingClientRect();
      var relativeX = targetPosObj.x - mainWrapperPosObj.x;
      this.style.left = "".concat(Math.floor(relativeX - 1), "px");
      this.style.width = "".concat(targetPosObj.width + 1, "px");
    }
  }
};
exports.default = _default;
        var $01554d = exports.default || module.exports;
      
      if (typeof $01554d === 'function') {
        $01554d = $01554d.options;
      }
    
        /* template */
        Object.assign($01554d, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    ref: "main",
    staticClass: "wptb-named-toggle-active-indicator",
    style: _vm.style
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"containers/NamedToggleControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

var _NamedToggleItem = _interopRequireDefault(require("../components/NamedToggleItem"));

var _NamedToggleActiveIndicator = _interopRequireDefault(require("../components/NamedToggleActiveIndicator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    NamedToggleActiveIndicator: _NamedToggleActiveIndicator.default,
    NamedToggleItem: _NamedToggleItem.default
  },
  props: {
    items: {
      type: Object,
      default: function _default() {
        return {
          item: 'item'
        };
      }
    }
  },
  mixins: [_ControlBase.default],
  data: function data() {
    return {
      activeElement: null
    };
  },
  mounted: function mounted() {
    this.assignDefaultValue();
  },
  watch: {
    elementMainValue: function elementMainValue(n) {
      this.basicValueUpdate(n);
    }
  },
  methods: {
    isItemActive: function isItemActive(id) {
      return this.elementMainValue === id;
    },
    activateItem: function activateItem(id, refElement) {
      this.elementMainValue = id;
      this.activeElement = refElement;
    }
  }
};
exports.default = _default;
        var $8f11fa = exports.default || module.exports;
      
      if (typeof $8f11fa === 'function') {
        $8f11fa = $8f11fa.options;
      }
    
        /* template */
        Object.assign($8f11fa, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-settings-row wptb-settings-middle-xs wptb-element-property",
      class: _vm.uniqueId,
      attrs: { "data-element": _vm.elemContainer }
    },
    [
      _c("div", { staticClass: "wptb-settings-space-between" }, [
        _c("p", { staticClass: "wptb-settings-item-title" }, [
          _vm._v(_vm._s(_vm.label))
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "wptb-named-toggle-control-wrapper" },
          [
            _c("named-toggle-active-indicator", {
              attrs: { "ref-element": _vm.activeElement }
            }),
            _vm._v(" "),
            _vm._l(_vm.items, function(v, k) {
              return _c("named-toggle-item", {
                key: k,
                attrs: { title: v, id: k, active: _vm.isItemActive(k) },
                on: { activateItem: _vm.activateItem }
              })
            })
          ],
          2
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/ControlBase":"mixins/ControlBase.js","../components/NamedToggleItem":"components/NamedToggleItem.vue","../components/NamedToggleActiveIndicator":"components/NamedToggleActiveIndicator.vue"}],"mountPoints/WPTB_NamedToggleControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

var _NamedToggleControl = _interopRequireDefault(require("../containers/NamedToggleControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Named toggle control.
 */
// eslint-disable-next-line camelcase
var _default = {
  name: 'ControlNamedToggle',
  handler: function namedToggleControlJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId);

    new _vue.default({
      data: data,
      components: {
        NamedToggleControl: _NamedToggleControl.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js","../containers/NamedToggleControl":"containers/NamedToggleControl.vue"}],"mixins/withTranslation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Mixin for adding easy translated strings sent from WordPress.
 * @type {{methods: {translation(*): (withTranslation.methods.strings.key|undefined)}, props: {strings: {default: (function(): []), type: ArrayConstructor}}}}
 */
var withTranslation = {
  props: {
    strings: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  methods: {
    translation: function translation(key) {
      if (this.strings[key]) {
        return this.strings[key];
      }

      throw new Error("no translation found with the given key of [".concat(key, "]"));
    }
  }
};
/* @module withTranslation mixin */

var _default = withTranslation;
exports.default = _default;
},{}],"components/TagRibbon.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    name: {
      type: String,
      default: 'tag name'
    },
    slug: {
      type: String,
      default: 'tagSlug'
    },
    description: {
      type: String,
      default: ''
    },
    addIcon: {
      type: String,
      default: '+'
    },
    removeIcon: {
      type: String,
      default: '-'
    },
    buttonOperationType: {
      type: String,
      default: 'add'
    },
    searchTerm: {
      type: String,
      default: ''
    }
  },
  computed: {
    buttonIcon: function buttonIcon() {
      return this.buttonOperationType === 'add' ? this.addIcon : this.removeIcon;
    },
    buttonClass: function buttonClass() {
      return {
        'wptb-tag-operation-add-button': this.buttonOperationType === 'add',
        'wptb-tag-operation-remove-button': this.buttonOperationType !== 'add'
      };
    },
    searchIndicatedName: function searchIndicatedName() {
      var regex = new RegExp("".concat(this.searchTerm), 'gi');
      return this.name.replaceAll(regex, '<span class="wptb-tag-control-search-indicator">$&</span>');
    }
  },
  methods: {
    handleClick: function handleClick() {
      this.$emit('click', this.slug);
    }
  }
};
exports.default = _default;
        var $5454bf = exports.default || module.exports;
      
      if (typeof $5454bf === 'function') {
        $5454bf = $5454bf.options;
      }
    
        /* template */
        Object.assign($5454bf, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wptb-tag-ribbon-wrapper",
      attrs: { title: _vm.description }
    },
    [
      _c("div", {
        staticClass: "wptb-tag-ribbon-name",
        domProps: { innerHTML: _vm._s(_vm.searchIndicatedName) }
      }),
      _vm._v(" "),
      _c("div", {
        staticClass: "wptb-tag-operation-button",
        class: _vm.buttonClass,
        domProps: { innerHTML: _vm._s(_vm.buttonIcon) },
        on: {
          click: function($event) {
            $event.preventDefault()
            return _vm.handleClick($event)
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/TagCloud.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TagRibbon = _interopRequireDefault(require("./TagRibbon"));

var _withTranslation = _interopRequireDefault(require("../mixins/withTranslation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    label: {
      type: String,
      default: 'Tag Cloud Label'
    },
    ribbonOperationType: {
      type: String,
      default: 'add'
    },
    tags: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    emptyDisplay: {
      type: String,
      default: 'empty'
    },
    searchTerm: {
      type: String,
      default: ''
    }
  },
  components: {
    TagRibbon: _TagRibbon.default
  },
  mixins: [_withTranslation.default],
  methods: {
    handleTagRibbonClick: function handleTagRibbonClick(termSlug) {
      this.$emit('ribbonClick', termSlug);
    }
  }
};
exports.default = _default;
        var $e2de97 = exports.default || module.exports;
      
      if (typeof $e2de97 === 'function') {
        $e2de97 = $e2de97.options;
      }
    
        /* template */
        Object.assign($e2de97, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wptb-tag-control-cloud-wrapper" }, [
    _c("p", { staticClass: "wptb-settings-item-title" }, [
      _vm._v(_vm._s(_vm.label))
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "wptb-tag-control-cloud" },
      [
        _vm._l(_vm.tags, function(tag) {
          return _c("tag-ribbon", {
            key: tag.slug,
            attrs: {
              name: tag.name,
              slug: tag.slug,
              description: tag.description,
              "button-operation-type": _vm.ribbonOperationType,
              "search-term": _vm.searchTerm
            },
            on: { click: _vm.handleTagRibbonClick }
          })
        }),
        _vm._v(" "),
        _vm.tags.length === 0
          ? _c("div", { staticClass: "wptb-tag-control-cloud-empty" }, [
              _vm._v("\n\t\t\t" + _vm._s(_vm.emptyDisplay) + "\n\t\t")
            ])
          : _vm._e()
      ],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./TagRibbon":"components/TagRibbon.vue","../mixins/withTranslation":"mixins/withTranslation.js"}],"components/TagSearch.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    searchTerm: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: '',
    event: 'termUpdate'
  },
  data: function data() {
    return {
      innerSearchTerm: ''
    };
  },
  watch: {
    searchTerm: function searchTerm() {
      this.innerSearchTerm = this.searchTerm;
    },
    innerSearchTerm: function innerSearchTerm() {
      this.$emit('termUpdate', this.innerSearchTerm);
      this.$emit('termUpdate', this.innerSearchTerm);
    }
  },
  methods: {
    clearSearch: function clearSearch() {
      this.innerSearchTerm = '';
    }
  }
};
exports.default = _default;
        var $7a0752 = exports.default || module.exports;
      
      if (typeof $7a0752 === 'function') {
        $7a0752 = $7a0752.options;
      }
    
        /* template */
        Object.assign($7a0752, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wptb-tag-control-search-wrapper" }, [
    _c("div", { staticClass: "wptb-tag-control-search-input" }, [
      _c("input", {
        directives: [
          {
            name: "model",
            rawName: "v-model.trim",
            value: _vm.innerSearchTerm,
            expression: "innerSearchTerm",
            modifiers: { trim: true }
          }
        ],
        staticClass: "wptb-tag-control-search",
        attrs: { type: "text", placeholder: _vm.placeholder },
        domProps: { value: _vm.innerSearchTerm },
        on: {
          input: function($event) {
            if ($event.target.composing) {
              return
            }
            _vm.innerSearchTerm = $event.target.value.trim()
          },
          blur: function($event) {
            return _vm.$forceUpdate()
          }
        }
      }),
      _vm._v(" "),
      _vm.innerSearchTerm !== ""
        ? _c(
            "div",
            {
              staticClass: "wptb-tag-control-search-clear",
              on: {
                click: function($event) {
                  $event.preventDefault()
                  return _vm.clearSearch($event)
                }
              }
            },
            [_vm._v("\n\t\t\tx\n\t\t")]
          )
        : _vm._e()
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/TagCreate.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    label: {
      type: String,
      default: 'Create new tag'
    },
    nameString: {
      type: String,
      default: 'name'
    },
    slugString: {
      type: String,
      default: 'slug'
    },
    descString: {
      type: String,
      default: 'description'
    },
    createString: {
      type: String,
      default: 'create'
    },
    allTagNames: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      formData: {
        name: '',
        slug: '',
        description: ''
      },
      disabled: true,
      busy: false,
      status: null
    };
  },
  watch: {
    'formData.name': {
      handler: function handler() {
        this.handleButtonDisable();
      }
    },
    status: function status() {
      var _this = this;

      setTimeout(function () {
        _this.$set(_this, 'status', null);
      }, 3000);
    }
  },
  mounted: function mounted() {
    this.handleButtonDisable();
  },
  methods: {
    handleButtonDisable: function handleButtonDisable() {
      var name = this.formData.name;

      if (name === '') {
        this.disabled = true;
      } else {
        this.disabled = this.allTagNames.includes(name);
      }
    },
    updateCompState: function updateCompState(busyVal) {
      var resultVal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.$set(this, 'disabled', busyVal);
      this.$set(this, 'busy', busyVal);
      this.$set(this, 'status', resultVal);
    },
    clearFormData: function clearFormData() {
      var _this2 = this;

      // eslint-disable-next-line array-callback-return
      Object.keys(this.formData).map(function (k) {
        if (Object.prototype.hasOwnProperty.call(_this2.formData, k)) {
          _this2.$set(_this2.formData, k, '');
        }
      });
    },
    handleCreate: function handleCreate() {
      var bindedClear = this.clearFormData.bind(this);
      var bindedBusy = this.updateCompState.bind(this);
      this.$emit('createTerm', this.formData, bindedClear, bindedBusy);
    }
  }
};
exports.default = _default;
        var $43e382 = exports.default || module.exports;
      
      if (typeof $43e382 === 'function') {
        $43e382 = $43e382.options;
      }
    
        /* template */
        Object.assign($43e382, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-tag-control-cloud-wrapper wptb-tag-control-create-wrapper"
    },
    [
      _c("p", { staticClass: "wptb-settings-item-title" }, [
        _vm._v(_vm._s(_vm.label))
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "wptb-tag-control-create-controls-wrapper" }, [
        _c(
          "label",
          {
            staticClass: "wptb-tag-control-create-control-label",
            attrs: { for: "new_tag_name" }
          },
          [_vm._v(_vm._s(_vm.nameString))]
        ),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model.trim",
              value: _vm.formData.name,
              expression: "formData.name",
              modifiers: { trim: true }
            }
          ],
          staticClass: "wptb-tag-control-search",
          attrs: { id: "new_tag_name", type: "text" },
          domProps: { value: _vm.formData.name },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.$set(_vm.formData, "name", $event.target.value.trim())
            },
            blur: function($event) {
              return _vm.$forceUpdate()
            }
          }
        }),
        _vm._v(" "),
        _vm.busy
          ? _c("div", {
              staticClass:
                "wptb-tag-control-busy dashicons dashicons-update-alt"
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.status
          ? _c("div", {
              staticClass: "wptb-tag-control-status dashicons dashicons-yes",
              attrs: { "data-status": "positive" }
            })
          : _vm._e(),
        _vm._v(" "),
        _vm.status === false
          ? _c("div", {
              staticClass:
                "wptb-tag-control-status dashicons dashicons-warning",
              attrs: { "data-status": "negative" }
            })
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "wptb-tag-control-create-button",
            attrs: { "data-disabled": _vm.disabled },
            on: {
              click: function($event) {
                $event.preventDefault()
                return _vm.handleCreate($event)
              }
            }
          },
          [_vm._v("\n\t\t\t" + _vm._s(_vm.createString) + "\n\t\t")]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"containers/TagControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

var _withTranslation = _interopRequireDefault(require("../mixins/withTranslation"));

var _TagCloud = _interopRequireDefault(require("../components/TagCloud"));

var _TagSearch = _interopRequireDefault(require("../components/TagSearch"));

var _TagCreate = _interopRequireDefault(require("../components/TagCreate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _default = {
  components: {
    TagCreate: _TagCreate.default,
    TagSearch: _TagSearch.default,
    TagCloud: _TagCloud.default
  },
  props: {
    availableTags: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    security: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  mixins: [_ControlBase.default, _withTranslation.default],
  data: function data() {
    return {
      selectedTags: [],
      mountedAssign: false,
      searchTerm: '',
      innerTags: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    document.addEventListener('wptb:save:before', this.beforeSave);
    this.$nextTick(function () {
      _this.selectedTags = WPTB_ControlsManager.getControlData('ControlTag');
    });
    this.innerTags = Array.from(this.availableTags);
  },
  watch: {
    selectedTags: {
      handler: function handler() {
        if (!this.mountedAssign) {
          this.mountedAssign = true;
        } else {
          WPTB_ControlsManager.setControlData('ControlTag', this.selectedTags);
          new WPTB_TableStateSaveManager().tableStateSet();
        }
      },
      deep: true
    }
  },
  computed: {
    filteredTagsLeft: function filteredTagsLeft() {
      var _this2 = this;

      return this.tagsLeft().filter(function (t) {
        return t.name.toLowerCase().includes(_this2.searchTerm);
      });
    },
    justTheNames: function justTheNames() {
      return this.innerTags.reduce(function (carry, tag) {
        carry.push(tag.name);
        return carry;
      }, []);
    }
  },
  methods: {
    tagsLeft: function tagsLeft() {
      var _this3 = this;

      return this.innerTags.filter(function (t) {
        return !_this3.selectedTags.some(function (s) {
          return s.slug === t.slug;
        });
      });
    },
    handleAdd: function handleAdd(slug) {
      this.selectedTags.push(this.innerTags.filter(function (t) {
        return t.slug === slug;
      })[0]);
    },
    handleRemove: function handleRemove(slug) {
      this.selectedTags = this.selectedTags.filter(function (t) {
        return t.slug !== slug;
      });
    },
    beforeSave: function beforeSave(_ref) {
      var detail = _ref.detail;

      if (_typeof(detail) === 'object') {
        // eslint-disable-next-line no-param-reassign
        detail.tags = JSON.stringify(this.selectedTags.map(function (t) {
          return t.term_id;
        }));
      }
    },
    createTerm: function createTerm(termData, clearFormSignal, updateBusy) {
      var _this4 = this;

      var _this$security$create = this.security.create,
          nonce = _this$security$create.nonce,
          action = _this$security$create.action,
          ajaxUrl = _this$security$create.ajaxUrl;
      var formData = new FormData();
      formData.append('nonce', nonce);
      formData.append('action', action);
      formData.append('termData', JSON.stringify(termData)); // set busy status to true for create component

      updateBusy(true);
      fetch(ajaxUrl, {
        method: 'POST',
        body: formData
      }).then(function (r) {
        if (r.ok) {
          return r.json();
        }

        throw new Error('an error occurred creating table term, refresh and try again');
      }).then(function (resp) {
        if (resp.error) {
          throw new Error(resp.error);
        }

        _this4.$set(_this4, 'innerTags', resp.data.tags);

        clearFormSignal();
        updateBusy(false, true);
      }).catch(function (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        updateBusy(false, false);
      });
    }
  }
};
exports.default = _default;
        var $d303c1 = exports.default || module.exports;
      
      if (typeof $d303c1 === 'function') {
        $d303c1 = $d303c1.options;
      }
    
        /* template */
        Object.assign($d303c1, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-settings-row wptb-settings-middle-xs wptb-element-property",
      class: _vm.uniqueId,
      attrs: { "data-element": _vm.elemContainer }
    },
    [
      _c("tag-cloud", {
        attrs: {
          label: _vm.translation("currentTags"),
          "ribbon-operation-type": "remove",
          tags: _vm.selectedTags,
          "search-term": _vm.searchTerm
        },
        on: { ribbonClick: _vm.handleRemove }
      }),
      _vm._v(" "),
      _c("tag-cloud", {
        attrs: {
          label: _vm.translation("availableTags"),
          "ribbon-operation-type": "add",
          tags: _vm.filteredTagsLeft,
          "search-term": _vm.searchTerm
        },
        on: { ribbonClick: _vm.handleAdd }
      }),
      _vm._v(" "),
      _c("tag-search", {
        attrs: { placeholder: _vm.translation("searchTags") },
        model: {
          value: _vm.searchTerm,
          callback: function($$v) {
            _vm.searchTerm = $$v
          },
          expression: "searchTerm"
        }
      }),
      _vm._v(" "),
      _c("tag-create", {
        attrs: {
          label: _vm.translation("createNewTag"),
          "name-string": _vm.translation("tagName"),
          "desc-string": _vm.translation("tagDesc"),
          "slug-string": _vm.translation("tagSlug"),
          "all-tag-names": _vm.justTheNames
        },
        on: { createTerm: _vm.createTerm }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/ControlBase":"mixins/ControlBase.js","../mixins/withTranslation":"mixins/withTranslation.js","../components/TagCloud":"components/TagCloud.vue","../components/TagSearch":"components/TagSearch.vue","../components/TagCreate":"components/TagCreate.vue"}],"mountPoints/WPTB_TagControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

var _TagControl = _interopRequireDefault(require("../containers/TagControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tag control.
 */
// eslint-disable-next-line camelcase
var _default = {
  name: 'ControlTag',
  handler: function tagControlJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId);

    new _vue.default({
      data: data,
      components: {
        TagControl: _TagControl.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js","../containers/TagControl":"containers/TagControl.vue"}],"components/TableCell.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    cell: {
      type: HTMLElement
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    cellStyle: function cellStyle() {
      return {
        gridColumn: "span ".concat(this.cell.getAttribute('colspan') || 1)
      };
    }
  },
  methods: {
    handleHover: function handleHover() {
      this.$emit('cellHover', this.cell);
    },
    handleExit: function handleExit() {
      this.$emit('cellHover', null);
    },
    handleClick: function handleClick() {
      this.$emit('cellClick', this.cell);
    }
  }
};
exports.default = _default;
        var $07112c = exports.default || module.exports;
      
      if (typeof $07112c === 'function') {
        $07112c = $07112c.options;
      }
    
        /* template */
        Object.assign($07112c, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    staticClass: "wptb-table-cell-select-cell",
    style: _vm.cellStyle,
    attrs: { "data-cell-selected": _vm.selected },
    on: {
      click: _vm.handleClick,
      mouseenter: _vm.handleHover,
      mouseleave: _vm.handleExit
    }
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/TableCellSelect.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TableCell = _interopRequireDefault(require("./TableCell"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  props: {
    table: {
      type: HTMLTableElement,
      default: null
    },
    hoveredCell: {
      type: HTMLElement,
      default: null
    },
    selectedCell: {
      type: HTMLElement,
      default: null
    },
    cellExtraStyling: {
      type: Function,
      default: function _default() {}
    },
    repaint: {
      type: Number,
      default: 0
    }
  },
  components: {
    TableCell: _TableCell.default
  },
  model: {
    prop: 'selectedCell',
    event: 'cellSelect'
  },
  data: function data() {
    return {
      cells: [],
      rows: 1,
      columns: 1,
      innerHoveredCell: null,
      innerSelectedCell: null
    };
  },
  watch: {
    selectedCell: function selectedCell() {
      this.innerSelectedCell = this.selectedCell;
    },
    innerSelectedCell: function innerSelectedCell(n) {
      this.$emit('cellSelect', n);
    },
    hoveredCell: function hoveredCell() {
      this.innerHoveredCell = this.hoveredCell;
    },
    innerHoveredCell: function innerHoveredCell() {
      this.$emit('cellHover', this.innerHoveredCell);
    },
    table: function table() {
      if (this.table) {
        this.cells = Array.from(this.table.querySelectorAll('td'));
        var rows = Array.from(this.table.querySelectorAll('tr'));
        this.rows = rows.length;
        this.columns = rows.reduce(function (carry, row) {
          var currentCellCount = Array.from(row.querySelectorAll('td')).length;
          return currentCellCount > carry ? currentCellCount : carry;
        }, 0);
      }
    }
  },
  computed: {
    gridStyle: function gridStyle() {
      return {
        gridTemplateColumns: "repeat(".concat(this.columns, ", 1fr)")
      };
    }
  },
  methods: {
    handleCellHover: function handleCellHover(cell) {
      this.innerHoveredCell = cell;
    },
    handleCellClick: function handleCellClick(cell) {
      this.innerSelectedCell = cell;
    },
    generateKey: function generateKey(length) {
      var letters = 'abcdef'.split('');
      var numbers = new Array(10).fill(1).map(function (_, i) {
        return i;
      });
      var all = [].concat(_toConsumableArray(letters), _toConsumableArray(numbers)); // eslint-disable-next-line no-unused-vars

      return new Array(length).fill(1).reduce(function (carry, _) {
        // eslint-disable-next-line no-param-reassign
        carry += all[Math.floor(Math.random() * all.length)];
        return carry;
      }, '');
    }
  }
};
exports.default = _default;
        var $019087 = exports.default || module.exports;
      
      if (typeof $019087 === 'function') {
        $019087 = $019087.options;
      }
    
        /* template */
        Object.assign($019087, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      key: _vm.repaint,
      staticClass: "wptb-table-cell-select-wrapper",
      style: _vm.gridStyle
    },
    _vm._l(_vm.cells, function(cell) {
      return _c("table-cell", {
        key: _vm.generateKey(5),
        style: _vm.cellExtraStyling(cell),
        attrs: { cell: cell, selected: _vm.innerSelectedCell === cell },
        on: { cellHover: _vm.handleCellHover, cellClick: _vm.handleCellClick }
      })
    }),
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./TableCell":"components/TableCell.vue"}],"components/CellIndicator.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
var _default = {
  props: {
    cell: {
      type: HTMLElement,
      default: null
    },
    repaint: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      styles: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      }
    };
  },
  watch: {
    cell: function cell() {
      this.calculatePos();
    },
    repaint: function repaint() {
      this.calculatePos();
    }
  },
  methods: {
    calculatePos: function calculatePos() {
      if (this.cell) {
        var _this$cell$getBoundin = this.cell.getBoundingClientRect(),
            x = _this$cell$getBoundin.x,
            y = _this$cell$getBoundin.y,
            width = _this$cell$getBoundin.width,
            height = _this$cell$getBoundin.height;

        this.styles.top = "".concat(y, "px");
        this.styles.left = "".concat(x, "px");
        this.styles.width = "".concat(width, "px");
        this.styles.height = "".concat(height, "px");
      }
    }
  }
};
exports.default = _default;
        var $6cbad5 = exports.default || module.exports;
      
      if (typeof $6cbad5 === 'function') {
        $6cbad5 = $6cbad5.options;
      }
    
        /* template */
        Object.assign($6cbad5, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.cell !== null
    ? _c("div", {
        staticClass: "wptb-table-cell-indicator wptb-repeating-linear-gradient",
        style: _vm.styles
      })
    : _vm._e()
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/ColorPicker.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    label: {
      type: String,
      default: 'label'
    },
    color: {
      type: String,
      default: '#000000'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'color',
    event: 'colorChanged'
  },
  data: function data() {
    return {
      innerColor: null
    };
  },
  watch: {
    color: function color(n) {
      this.innerColor = n === '' ? '#000000' : n;
    },
    innerColor: function innerColor(n) {
      this.$emit('colorChanged', n);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.innerColor = _this.color;
    });
  }
};
exports.default = _default;
        var $91dcc2 = exports.default || module.exports;
      
      if (typeof $91dcc2 === 'function') {
        $91dcc2 = $91dcc2.options;
      }
    
        /* template */
        Object.assign($91dcc2, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-color-picker-wrapper wptb-settings-row wptb-settings-middle-xs wptb-element-property"
    },
    [
      _c("div", { staticClass: "wptb-settings-space-between" }, [
        _c(
          "p",
          {
            staticClass: "wptb-settings-item-title wptb-text-transform-cap",
            attrs: { "data-wptb-text-disabled": _vm.disabled }
          },
          [_vm._v("\n\t\t\t" + _vm._s(_vm.label) + "\n\t\t")]
        ),
        _vm._v(" "),
        _c("div", { staticClass: "wptb-color-picker-input-wrapper" }, [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.innerColor,
                expression: "innerColor"
              }
            ],
            staticClass: "wptb-color-picker-input",
            attrs: { type: "color", disabled: _vm.disabled },
            domProps: { value: _vm.innerColor },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.innerColor = $event.target.value
              }
            }
          })
        ])
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"containers/DifferentBorderControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

var _TableCellSelect = _interopRequireDefault(require("../components/TableCellSelect"));

var _CellIndicator = _interopRequireDefault(require("../components/CellIndicator"));

var _RangeInput = _interopRequireDefault(require("../components/RangeInput"));

var _withTranslation = _interopRequireDefault(require("../mixins/withTranslation"));

var _ColorPicker = _interopRequireDefault(require("../components/ColorPicker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _default = {
  mixins: [_ControlBase.default, _withTranslation.default],
  components: {
    TableCellSelect: _TableCellSelect.default,
    CellIndicator: _CellIndicator.default,
    RangeInput: _RangeInput.default,
    ColorPicker: _ColorPicker.default
  },
  data: function data() {
    return {
      table: null,
      hoveredCell: null,
      selectedCell: null,
      borderProps: {
        currentBorderSize: 0,
        currentBorderColor: '#000000'
      },
      repaintId: 0,
      min: 0,
      max: 50,
      controlsActive: false
    };
  },
  watch: {
    borderProps: {
      handler: function handler(n) {
        if (this.selectedCell) {
          var _this$selectedCell$st = this.selectedCell.style,
              borderWidth = _this$selectedCell$st.borderWidth,
              borderColor = _this$selectedCell$st.borderColor;

          if (Number.parseInt(borderWidth, 10) !== n.currentBorderSize || borderColor !== n.currentBorderColor) {
            this.selectedCell.style.borderWidth = "".concat(n.currentBorderSize, "px");
            this.selectedCell.style.borderColor = "".concat(n.currentBorderColor);
            this.repaintId += 1;
            this.setTableDirty(false);
          }
        }
      },
      deep: true
    },
    selectedCell: {
      handler: function handler(n) {
        if (n) {
          var _n$style = n.style,
              borderWidth = _n$style.borderWidth,
              borderColor = _n$style.borderColor;
          this.$set(this.borderProps, 'currentBorderSize', Number.parseInt(borderWidth, 10));
          this.$set(this.borderProps, 'currentBorderColor', this.toHex(borderColor));
        }

        this.controlsActive = n !== null;
      },
      deep: true
    }
  },
  mounted: function mounted() {
    this.table = document.querySelector('.wptb-management_table_container .wptb-table-setup table');
  },
  methods: {
    toHex: function toHex(rgbVal) {
      if (!rgbVal.startsWith('#') && rgbVal !== '') {
        var regExp = new RegExp(/rgb\(\s?(\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)/);

        if (regExp) {
          var _regExp$exec = regExp.exec(rgbVal),
              _regExp$exec2 = _slicedToArray(_regExp$exec, 4),
              red = _regExp$exec2[1],
              green = _regExp$exec2[2],
              blue = _regExp$exec2[3];
          /**
           * Transform a decimal into its hexadecimal equal.
           *
           * @param {string} val value
           * @return {string} changed hex value
           */


          function hexConvertor(val) {
            var hex = Number.parseInt(val, 10).toString(16);
            return hex.length === 1 ? "0".concat(hex) : hex;
          }

          return "#".concat(hexConvertor(red)).concat(hexConvertor(green)).concat(hexConvertor(blue));
        }
      }

      return rgbVal;
    },
    cellStyling: function cellStyling(cell) {
      var _cell$style = cell.style,
          borderWidth = _cell$style.borderWidth,
          borderStyle = _cell$style.borderStyle,
          borderColor = _cell$style.borderColor;
      return {
        borderWidth: borderWidth,
        borderStyle: borderStyle,
        borderColor: borderColor
      };
    }
  }
};
exports.default = _default;
        var $b2736f = exports.default || module.exports;
      
      if (typeof $b2736f === 'function') {
        $b2736f = $b2736f.options;
      }
    
        /* template */
        Object.assign($b2736f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "wptb-fade" } }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.componentVisibility,
            expression: "componentVisibility"
          }
        ],
        staticClass:
          "wptb-settings-row wptb-settings-middle-xs wptb-different-border-control-wrapper"
      },
      [
        _c("table-cell-select", {
          attrs: {
            table: _vm.table,
            "cell-extra-styling": _vm.cellStyling,
            repaint: _vm.repaintId
          },
          model: {
            value: _vm.selectedCell,
            callback: function($$v) {
              _vm.selectedCell = $$v
            },
            expression: "selectedCell"
          }
        }),
        _vm._v(" "),
        _c("range-input", {
          staticClass: "wptb-different-border-range-input",
          attrs: {
            "post-fix": "px",
            label: _vm.translation("borderWidth"),
            min: _vm.min,
            max: _vm.max,
            disabled: !_vm.controlsActive
          },
          model: {
            value: _vm.borderProps.currentBorderSize,
            callback: function($$v) {
              _vm.$set(_vm.borderProps, "currentBorderSize", $$v)
            },
            expression: "borderProps.currentBorderSize"
          }
        }),
        _vm._v(" "),
        _c("cell-indicator", {
          attrs: { repaint: _vm.repaintId, cell: _vm.selectedCell }
        }),
        _vm._v(" "),
        _c("color-picker", {
          attrs: {
            label: _vm.translation("borderColor"),
            disabled: !_vm.controlsActive
          },
          model: {
            value: _vm.borderProps.currentBorderColor,
            callback: function($$v) {
              _vm.$set(_vm.borderProps, "currentBorderColor", $$v)
            },
            expression: "borderProps.currentBorderColor"
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/ControlBase":"mixins/ControlBase.js","../components/TableCellSelect":"components/TableCellSelect.vue","../components/CellIndicator":"components/CellIndicator.vue","../components/RangeInput":"components/RangeInput.vue","../mixins/withTranslation":"mixins/withTranslation.js","../components/ColorPicker":"components/ColorPicker.vue"}],"mountPoints/WPTB_DifferentBorderControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

var _DifferentBorderControl = _interopRequireDefault(require("../containers/DifferentBorderControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sides control.
 */
// eslint-disable-next-line camelcase
var _default = {
  name: 'ControlDifferentBorder',
  handler: function differentBorderControlJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId);

    new _vue.default({
      data: data,
      components: {
        DifferentBorderControl: _DifferentBorderControl.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js","../containers/DifferentBorderControl":"containers/DifferentBorderControl.vue"}],"components/MenuButton.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  props: {
    disabled: Boolean,
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  methods: {
    /**
     * Click event callback
     */
    handleClick: function handleClick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    }
  }
};
exports.default = _default;
        var $358d10 = exports.default || module.exports;
      
      if (typeof $358d10 === 'function') {
        $358d10 = $358d10.options;
      }
    
        /* template */
        Object.assign($358d10, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wptb-settings-button",
      class: [{ disabled: _vm.disabled }, _vm.type, _vm.size],
      on: { click: _vm.handleClick }
    },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/LocalImageCard.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    name: {
      type: String,
      default: 'image name'
    },
    url: {
      type: String,
      default: ''
    },
    activeCard: {
      type: String,
      default: null
    }
  },
  computed: {
    isSelectedCard: function isSelectedCard() {
      return this.name === this.activeCard;
    }
  },
  methods: {
    handleCardClick: function handleCardClick() {
      this.$emit('cardSelected', this.name, this.url);
    }
  }
};
exports.default = _default;
        var $1e0810 = exports.default || module.exports;
      
      if (typeof $1e0810 === 'function') {
        $1e0810 = $1e0810.options;
      }
    
        /* template */
        Object.assign($1e0810, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wptb-local-dev-image-card",
      attrs: { "data-active": _vm.isSelectedCard },
      on: {
        "!click": function($event) {
          $event.preventDefault()
          $event.stopPropagation()
          return _vm.handleCardClick($event)
        }
      }
    },
    [
      _c("div", { staticClass: "wptb-local-dev-image-holder" }, [
        _c("img", { attrs: { src: _vm.url } })
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "wptb-local-dev-image-name" }, [
        _vm._v("\n\t\t" + _vm._s(_vm.name) + "\n\t")
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/EmptyCover.vue":[function(require,module,exports) {

        var $9b2461 = exports.default || module.exports;
      
      if (typeof $9b2461 === 'function') {
        $9b2461 = $9b2461.options;
      }
    
        /* template */
        Object.assign($9b2461, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wptb-menu-empty-cover" },
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"containers/LocalDevFileControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ControlBase = _interopRequireDefault(require("../mixins/ControlBase"));

var _MenuButton = _interopRequireDefault(require("../components/MenuButton"));

var _LocalImageCard = _interopRequireDefault(require("../components/LocalImageCard"));

var _EmptyCover = _interopRequireDefault(require("../components/EmptyCover"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    EmptyCover: _EmptyCover.default,
    LocalImageCard: _LocalImageCard.default,
    MenuButton: _MenuButton.default
  },
  mixins: [_ControlBase.default],
  props: {
    images: {
      type: null,
      default: function _default() {
        return {};
      }
    },
    security: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      frameOpenStatus: false,
      innerImages: [],
      selectedCard: {
        name: null,
        url: null
      },
      cardLimbo: {
        name: null,
        url: null
      },
      assignDefaultValueAtMount: true,
      mutationObserver: null,
      fetching: false
    };
  },
  watch: {
    elementMainValue: function elementMainValue(n) {
      this.basicValueUpdate(n, true);
      this.selectedCard.name = n;
      this.selectedCard.url = this.getImageUrl(n);
    },
    selectedCard: {
      handler: function handler(n) {
        this.elementMainValue = n.name;
        this.cardLimbo.name = n.name;
        this.cardLimbo.url = this.getImageUrl(n.name);
        this.selectedCard.url = this.getImageUrl(n.name);
        this.setTargetImage(this.selectedCard.url);
      },
      deep: true
    },
    frameOpenStatus: function frameOpenStatus(n) {
      var _this = this;

      if (n) {
        document.addEventListener('keydown', function (e) {
          if (e.code === 'Escape') {
            _this.setFrameOpenStatus(false);
          }
        });
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.innerImages = _this2.images;
      var imageElement = document.querySelector(".".concat(_this2.elemContainer)); // observe image element src changes since button control don't fire necessary global events to track with WPTB_Helper.controlsInclude

      _this2.mutationObserver = new MutationObserver(_this2.mutationCallback);

      _this2.mutationObserver.observe(imageElement, {
        attributes: true,
        childList: true,
        subtree: true
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  },
  computed: {
    isImagesEmpty: function isImagesEmpty() {
      var _this3 = this;

      return !Object.keys(this.innerImages).filter(function (e) {
        return Object.prototype.hasOwnProperty.call(_this3.innerImages, e);
      }).length > 0;
    }
  },
  methods: {
    getLocalImages: function getLocalImages() {
      var _this4 = this;

      var ajaxUrl = new URL(this.security.ajaxUrl);
      ajaxUrl.searchParams.append('nonce', this.security.nonce);
      ajaxUrl.searchParams.append('action', this.security.action);
      this.fetching = true;
      fetch(ajaxUrl.toString()) // eslint-disable-next-line consistent-return
      .then(function (r) {
        if (r.ok) {
          return r.json();
        }

        throw new Error('an error occured');
      }).then(function (resp) {
        if (resp.error) {
          throw new Error(resp.error);
        }

        _this4.innerImages = resp.data.images;
      }).catch(function (err) {
        console.error(err);
      }).finally(function () {
        _this4.fetching = false;
      });
    },
    mutationCallback: function mutationCallback(mutations) {
      var _this5 = this;

      // eslint-disable-next-line array-callback-return
      Array.from(mutations).map(function (m) {
        if (m.target && m.target.nodeName === 'IMG' && m.attributeName === 'src') {
          if (m.target.getAttribute('src') !== _this5.selectedCard.url) {
            _this5.resetSelectedLocalFile();
          }
        }
      });
    },
    resetSelectedLocalFile: function resetSelectedLocalFile() {
      this.selectedCard.name = '';
      this.selectedCard.url = '';
    },
    setFrameOpenStatus: function setFrameOpenStatus(val) {
      this.frameOpenStatus = val;
    },
    handleCardSelect: function handleCardSelect(name, url) {
      this.cardLimbo.name = name;
      this.cardLimbo.url = url;
    },
    handleSelectButton: function handleSelectButton() {
      this.selectedCard.name = this.cardLimbo.name;
      this.selectedCard.url = this.cardLimbo.url;
      this.setFrameOpenStatus(false);
    },
    getImageUrl: function getImageUrl(name) {
      var url = null;

      if (this.innerImages[name]) {
        url = this.innerImages[name];
      }

      return url;
    },
    setTargetImage: function setTargetImage(url) {
      if (url !== null && url !== '') {
        // eslint-disable-next-line array-callback-return
        this.targetElements.map(function (elObject) {
          // eslint-disable-next-line array-callback-return
          elObject.elements.map(function (el) {
            // remove placeholder class else img will not be visible at frontend
            el.classList.remove('wptb-elem-placeholder');
            var img = el.querySelector('img');

            if (!img) {
              img = document.createElement('img');
              var imageWrapper = el.querySelector('.wptb-image-wrapper a');
              imageWrapper.innerHTML = '';
              imageWrapper.appendChild(img);
            }

            img.setAttribute('src', url);
            img.setAttribute('width', 'auto');
            img.setAttribute('height', 'auto');
          });
        });
      }
    }
  }
};
exports.default = _default;
        var $2d8a80 = exports.default || module.exports;
      
      if (typeof $2d8a80 === 'function') {
        $2d8a80 = $2d8a80.options;
      }
    
        /* template */
        Object.assign($2d8a80, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-settings-row wptb-settings-middle-xs wptb-plugin-width-full wptb-flex wptb-justify-content-center"
    },
    [
      _c(
        "menu-button",
        {
          on: {
            click: function($event) {
              return _vm.setFrameOpenStatus(true)
            }
          }
        },
        [_vm._v("\n\t\tPlugin Local Images\n\t")]
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "wptb-fade" } }, [
        _vm.frameOpenStatus
          ? _c("div", { staticClass: "wptb-local-dev-file-chooser" }, [
              _c("div", { staticClass: "wptb-local-dev-modal" }, [
                _c("div", { staticClass: "wptb-local-dev-modal-header" }, [
                  _c("div", { staticClass: "wptb-local-dev-modal-title" }, [
                    _vm._v("\n\t\t\t\t\t\tPlugin Images\n\t\t\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "wptb-local-dev-modal-close",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.setFrameOpenStatus(false)
                        }
                      }
                    },
                    [_vm._v("\n\t\t\t\t\t\tX\n\t\t\t\t\t")]
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "wptb-local-dev-modal-files" },
                  [
                    _vm._l(_vm.innerImages, function(url, name) {
                      return _c("local-image-card", {
                        key: url,
                        attrs: {
                          name: name,
                          url: url,
                          "active-card": _vm.cardLimbo.name
                        },
                        on: { cardSelected: _vm.handleCardSelect }
                      })
                    }),
                    _vm._v(" "),
                    _vm.isImagesEmpty
                      ? _c("empty-cover", [
                          _vm._v(
                            "\n\t\t\t\t\t\tno plugin images found...\n\t\t\t\t\t"
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.fetching
                      ? _c(
                          "empty-cover",
                          {
                            staticStyle: {
                              color: "red",
                              "background-color": "rgba(0, 0, 0, 0.4)"
                            }
                          },
                          [
                            _vm._v(
                              "\n\t\t\t\t\t\tfetching images...\n\t\t\t\t\t"
                            )
                          ]
                        )
                      : _vm._e()
                  ],
                  2
                ),
                _vm._v(" "),
                _c(
                  "div",
                  { staticClass: "wptb-local-dev-modal-footer" },
                  [
                    _c(
                      "menu-button",
                      {
                        attrs: { disabled: _vm.fetching },
                        on: { click: _vm.getLocalImages }
                      },
                      [_vm._v("refresh")]
                    ),
                    _vm._v(" "),
                    _c(
                      "menu-button",
                      {
                        attrs: { disabled: _vm.fetching },
                        on: { click: _vm.handleSelectButton }
                      },
                      [_vm._v("select")]
                    )
                  ],
                  1
                )
              ])
            ])
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/ControlBase":"mixins/ControlBase.js","../components/MenuButton":"components/MenuButton.vue","../components/LocalImageCard":"components/LocalImageCard.vue","../components/EmptyCover":"components/EmptyCover.vue"}],"mountPoints/WPTB_LocalDevFileControl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _WPTB_ControlsManager = _interopRequireDefault(require("../functions/WPTB_ControlsManager"));

var _LocalDevFileControl = _interopRequireDefault(require("../containers/LocalDevFileControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Local files for development
 */
// eslint-disable-next-line camelcase
var _default = {
  name: 'ControlLocalDevFile',
  handler: function localDevFileControlJS(uniqueId) {
    var data = _WPTB_ControlsManager.default.getControlData(uniqueId);

    new _vue.default({
      data: data,
      components: {
        LocalDevFileControl: _LocalDevFileControl.default
      }
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","../functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js","../containers/LocalDevFileControl":"containers/LocalDevFileControl.vue"}],"../../../../../node_modules/memize/index.js":[function(require,module,exports) {
/**
 * Memize options object.
 *
 * @typedef MemizeOptions
 *
 * @property {number} [maxSize] Maximum size of the cache.
 */

/**
 * Internal cache entry.
 *
 * @typedef MemizeCacheNode
 *
 * @property {?MemizeCacheNode|undefined} [prev] Previous node.
 * @property {?MemizeCacheNode|undefined} [next] Next node.
 * @property {Array<*>}                   args   Function arguments for cache
 *                                               entry.
 * @property {*}                          val    Function result.
 */

/**
 * Properties of the enhanced function for controlling cache.
 *
 * @typedef MemizeMemoizedFunction
 *
 * @property {()=>void} clear Clear the cache.
 */

/**
 * Accepts a function to be memoized, and returns a new memoized function, with
 * optional options.
 *
 * @template {Function} F
 *
 * @param {F}             fn        Function to memoize.
 * @param {MemizeOptions} [options] Options object.
 *
 * @return {F & MemizeMemoizedFunction} Memoized function.
 */
function memize(fn, options) {
  var size = 0;
  /** @type {?MemizeCacheNode|undefined} */

  var head;
  /** @type {?MemizeCacheNode|undefined} */

  var tail;
  options = options || {};

  function memoized()
  /* ...args */
  {
    var node = head,
        len = arguments.length,
        args,
        i;

    searchCache: while (node) {
      // Perform a shallow equality test to confirm that whether the node
      // under test is a candidate for the arguments passed. Two arrays
      // are shallowly equal if their length matches and each entry is
      // strictly equal between the two sets. Avoid abstracting to a
      // function which could incur an arguments leaking deoptimization.
      // Check whether node arguments match arguments length
      if (node.args.length !== arguments.length) {
        node = node.next;
        continue;
      } // Check whether node arguments match arguments values


      for (i = 0; i < len; i++) {
        if (node.args[i] !== arguments[i]) {
          node = node.next;
          continue searchCache;
        }
      } // At this point we can assume we've found a match
      // Surface matched node to head if not already


      if (node !== head) {
        // As tail, shift to previous. Must only shift if not also
        // head, since if both head and tail, there is no previous.
        if (node === tail) {
          tail = node.prev;
        } // Adjust siblings to point to each other. If node was tail,
        // this also handles new tail's empty `next` assignment.

        /** @type {MemizeCacheNode} */


        node.prev.next = node.next;

        if (node.next) {
          node.next.prev = node.prev;
        }

        node.next = head;
        node.prev = null;
        /** @type {MemizeCacheNode} */

        head.prev = node;
        head = node;
      } // Return immediately


      return node.val;
    } // No cached value found. Continue to insertion phase:
    // Create a copy of arguments (avoid leaking deoptimization)


    args = new Array(len);

    for (i = 0; i < len; i++) {
      args[i] = arguments[i];
    }

    node = {
      args: args,
      // Generate the result from original function
      val: fn.apply(null, args)
    }; // Don't need to check whether node is already head, since it would
    // have been returned above already if it was
    // Shift existing head down list

    if (head) {
      head.prev = node;
      node.next = head;
    } else {
      // If no head, follows that there's no tail (at initial or reset)
      tail = node;
    } // Trim tail if we're reached max size and are pending cache insertion


    if (size ===
    /** @type {MemizeOptions} */
    options.maxSize) {
      tail =
      /** @type {MemizeCacheNode} */
      tail.prev;
      /** @type {MemizeCacheNode} */

      tail.next = null;
    } else {
      size++;
    }

    head = node;
    return node.val;
  }

  memoized.clear = function () {
    head = null;
    tail = null;
    size = 0;
  };

  if ("development" === 'test') {
    // Cache is not exposed in the public API, but used in tests to ensure
    // expected list progression
    memoized.getCache = function () {
      return [head, tail, size];
    };
  } // Ignore reason: There's not a clear solution to create an intersection of
  // the function with additional properties, where the goal is to retain the
  // function signature of the incoming argument and add control properties
  // on the return value.
  // @ts-ignore


  return memoized;
}

module.exports = memize;
},{}],"../../../../../node_modules/sprintf-js/src/sprintf.js":[function(require,module,exports) {
var define;
/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else if (ph.param_no) { // positional argument (explicit)
                    arg = argv[ph.param_no]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0
                }

                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(ph.type)) {
                    output += arg
                }
                else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }

                parse_tree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                )
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (typeof exports !== 'undefined') {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (typeof define === 'function' && define['amd']) {
            define(function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            })
        }
    }
    /* eslint-enable quote-props */
}(); // eslint-disable-line

},{}],"../../../../../node_modules/@wordpress/i18n/build-module/sprintf.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sprintf = sprintf;

var _memize = _interopRequireDefault(require("memize"));

var _sprintfJs = _interopRequireDefault(require("sprintf-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * External dependencies
 */

/**
 * Log to console, once per message; or more precisely, per referentially equal
 * argument set. Because Jed throws errors, we log these to the console instead
 * to avoid crashing the application.
 *
 * @param {...*} args Arguments to pass to `console.error`
 */
var logErrorOnce = (0, _memize.default)(console.error); // eslint-disable-line no-console

/**
 * Returns a formatted string. If an error occurs in applying the format, the
 * original format string is returned.
 *
 * @param {string}    format The format of the string to generate.
 * @param {...string} args   Arguments to apply to the format.
 *
 * @see http://www.diveintojavascript.com/projects/javascript-sprintf
 *
 * @return {string} The formatted string.
 */

function sprintf(format) {
  try {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _sprintfJs.default.sprintf.apply(_sprintfJs.default, [format].concat(args));
  } catch (error) {
    logErrorOnce('sprintf error: \n\n' + error.toString());
    return format;
  }
}
},{"memize":"../../../../../node_modules/memize/index.js","sprintf-js":"../../../../../node_modules/sprintf-js/src/sprintf.js"}],"../../../../../node_modules/@babel/runtime/helpers/esm/defineProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _defineProperty;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
},{}],"../../../../../node_modules/@tannin/postfix/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = postfix;
var PRECEDENCE, OPENERS, TERMINATORS, PATTERN;
/**
 * Operator precedence mapping.
 *
 * @type {Object}
 */

PRECEDENCE = {
  '(': 9,
  '!': 8,
  '*': 7,
  '/': 7,
  '%': 7,
  '+': 6,
  '-': 6,
  '<': 5,
  '<=': 5,
  '>': 5,
  '>=': 5,
  '==': 4,
  '!=': 4,
  '&&': 3,
  '||': 2,
  '?': 1,
  '?:': 1
};
/**
 * Characters which signal pair opening, to be terminated by terminators.
 *
 * @type {string[]}
 */

OPENERS = ['(', '?'];
/**
 * Characters which signal pair termination, the value an array with the
 * opener as its first member. The second member is an optional operator
 * replacement to push to the stack.
 *
 * @type {string[]}
 */

TERMINATORS = {
  ')': ['('],
  ':': ['?', '?:']
};
/**
 * Pattern matching operators and openers.
 *
 * @type {RegExp}
 */

PATTERN = /<=|>=|==|!=|&&|\|\||\?:|\(|!|\*|\/|%|\+|-|<|>|\?|\)|:/;
/**
 * Given a C expression, returns the equivalent postfix (Reverse Polish)
 * notation terms as an array.
 *
 * If a postfix string is desired, simply `.join( ' ' )` the result.
 *
 * @example
 *
 * ```js
 * import postfix from '@tannin/postfix';
 *
 * postfix( 'n > 1' );
 * // ⇒ [ 'n', '1', '>' ]
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {string[]} Postfix terms.
 */

function postfix(expression) {
  var terms = [],
      stack = [],
      match,
      operator,
      term,
      element;

  while (match = expression.match(PATTERN)) {
    operator = match[0]; // Term is the string preceding the operator match. It may contain
    // whitespace, and may be empty (if operator is at beginning).

    term = expression.substr(0, match.index).trim();

    if (term) {
      terms.push(term);
    }

    while (element = stack.pop()) {
      if (TERMINATORS[operator]) {
        if (TERMINATORS[operator][0] === element) {
          // Substitution works here under assumption that because
          // the assigned operator will no longer be a terminator, it
          // will be pushed to the stack during the condition below.
          operator = TERMINATORS[operator][1] || operator;
          break;
        }
      } else if (OPENERS.indexOf(element) >= 0 || PRECEDENCE[element] < PRECEDENCE[operator]) {
        // Push to stack if either an opener or when pop reveals an
        // element of lower precedence.
        stack.push(element);
        break;
      } // For each popped from stack, push to terms.


      terms.push(element);
    }

    if (!TERMINATORS[operator]) {
      stack.push(operator);
    } // Slice matched fragment from expression to continue match.


    expression = expression.substr(match.index + operator.length);
  } // Push remainder of operand, if exists, to terms.


  expression = expression.trim();

  if (expression) {
    terms.push(expression);
  } // Pop remaining items from stack into terms.


  return terms.concat(stack.reverse());
}
},{}],"../../../../../node_modules/@tannin/evaluate/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluate;

/**
 * Operator callback functions.
 *
 * @type {Object}
 */
var OPERATORS = {
  '!': function (a) {
    return !a;
  },
  '*': function (a, b) {
    return a * b;
  },
  '/': function (a, b) {
    return a / b;
  },
  '%': function (a, b) {
    return a % b;
  },
  '+': function (a, b) {
    return a + b;
  },
  '-': function (a, b) {
    return a - b;
  },
  '<': function (a, b) {
    return a < b;
  },
  '<=': function (a, b) {
    return a <= b;
  },
  '>': function (a, b) {
    return a > b;
  },
  '>=': function (a, b) {
    return a >= b;
  },
  '==': function (a, b) {
    return a === b;
  },
  '!=': function (a, b) {
    return a !== b;
  },
  '&&': function (a, b) {
    return a && b;
  },
  '||': function (a, b) {
    return a || b;
  },
  '?:': function (a, b, c) {
    if (a) {
      throw b;
    }

    return c;
  }
};
/**
 * Given an array of postfix terms and operand variables, returns the result of
 * the postfix evaluation.
 *
 * @example
 *
 * ```js
 * import evaluate from '@tannin/evaluate';
 *
 * // 3 + 4 * 5 / 6 ⇒ '3 4 5 * 6 / +'
 * const terms = [ '3', '4', '5', '*', '6', '/', '+' ];
 *
 * evaluate( terms, {} );
 * // ⇒ 6.333333333333334
 * ```
 *
 * @param {string[]} postfix   Postfix terms.
 * @param {Object}   variables Operand variables.
 *
 * @return {*} Result of evaluation.
 */

function evaluate(postfix, variables) {
  var stack = [],
      i,
      j,
      args,
      getOperatorResult,
      term,
      value;

  for (i = 0; i < postfix.length; i++) {
    term = postfix[i];
    getOperatorResult = OPERATORS[term];

    if (getOperatorResult) {
      // Pop from stack by number of function arguments.
      j = getOperatorResult.length;
      args = Array(j);

      while (j--) {
        args[j] = stack.pop();
      }

      try {
        value = getOperatorResult.apply(null, args);
      } catch (earlyReturn) {
        return earlyReturn;
      }
    } else if (variables.hasOwnProperty(term)) {
      value = variables[term];
    } else {
      value = +term;
    }

    stack.push(value);
  }

  return stack[0];
}
},{}],"../../../../../node_modules/@tannin/compile/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compile;

var _postfix = _interopRequireDefault(require("@tannin/postfix"));

var _evaluate = _interopRequireDefault(require("@tannin/evaluate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a C expression, returns a function which can be called to evaluate its
 * result.
 *
 * @example
 *
 * ```js
 * import compile from '@tannin/compile';
 *
 * const evaluate = compile( 'n > 1' );
 *
 * evaluate( { n: 2 } );
 * // ⇒ true
 * ```
 *
 * @param {string} expression C expression.
 *
 * @return {(variables?:{[variable:string]:*})=>*} Compiled evaluator.
 */
function compile(expression) {
  var terms = (0, _postfix.default)(expression);
  return function (variables) {
    return (0, _evaluate.default)(terms, variables);
  };
}
},{"@tannin/postfix":"../../../../../node_modules/@tannin/postfix/index.js","@tannin/evaluate":"../../../../../node_modules/@tannin/evaluate/index.js"}],"../../../../../node_modules/@tannin/plural-forms/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluralForms;

var _compile = _interopRequireDefault(require("@tannin/compile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a C expression, returns a function which, when called with a value,
 * evaluates the result with the value assumed to be the "n" variable of the
 * expression. The result will be coerced to its numeric equivalent.
 *
 * @param {string} expression C expression.
 *
 * @return {Function} Evaluator function.
 */
function pluralForms(expression) {
  var evaluate = (0, _compile.default)(expression);
  return function (n) {
    return +evaluate({
      n: n
    });
  };
}
},{"@tannin/compile":"../../../../../node_modules/@tannin/compile/index.js"}],"../../../../../node_modules/tannin/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tannin;

var _pluralForms = _interopRequireDefault(require("@tannin/plural-forms"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Tannin constructor options.
 *
 * @typedef {Object} TanninOptions
 *
 * @property {string}   [contextDelimiter] Joiner in string lookup with context.
 * @property {Function} [onMissingKey]     Callback to invoke when key missing.
 */

/**
 * Domain metadata.
 *
 * @typedef {Object} TanninDomainMetadata
 *
 * @property {string}            [domain]       Domain name.
 * @property {string}            [lang]         Language code.
 * @property {(string|Function)} [plural_forms] Plural forms expression or
 *                                              function evaluator.
 */

/**
 * Domain translation pair respectively representing the singular and plural
 * translation.
 *
 * @typedef {[string,string]} TanninTranslation
 */

/**
 * Locale data domain. The key is used as reference for lookup, the value an
 * array of two string entries respectively representing the singular and plural
 * translation.
 *
 * @typedef {{[key:string]:TanninDomainMetadata|TanninTranslation,'':TanninDomainMetadata|TanninTranslation}} TanninLocaleDomain
 */

/**
 * Jed-formatted locale data.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @typedef {{[domain:string]:TanninLocaleDomain}} TanninLocaleData
 */

/**
 * Default Tannin constructor options.
 *
 * @type {TanninOptions}
 */
var DEFAULT_OPTIONS = {
  contextDelimiter: '\u0004',
  onMissingKey: null
};
/**
 * Given a specific locale data's config `plural_forms` value, returns the
 * expression.
 *
 * @example
 *
 * ```
 * getPluralExpression( 'nplurals=2; plural=(n != 1);' ) === '(n != 1)'
 * ```
 *
 * @param {string} pf Locale data plural forms.
 *
 * @return {string} Plural forms expression.
 */

function getPluralExpression(pf) {
  var parts, i, part;
  parts = pf.split(';');

  for (i = 0; i < parts.length; i++) {
    part = parts[i].trim();

    if (part.indexOf('plural=') === 0) {
      return part.substr(7);
    }
  }
}
/**
 * Tannin constructor.
 *
 * @class
 *
 * @param {TanninLocaleData} data      Jed-formatted locale data.
 * @param {TanninOptions}    [options] Tannin options.
 */


function Tannin(data, options) {
  var key;
  /**
   * Jed-formatted locale data.
   *
   * @name Tannin#data
   * @type {TanninLocaleData}
   */

  this.data = data;
  /**
   * Plural forms function cache, keyed by plural forms string.
   *
   * @name Tannin#pluralForms
   * @type {Object<string,Function>}
   */

  this.pluralForms = {};
  /**
   * Effective options for instance, including defaults.
   *
   * @name Tannin#options
   * @type {TanninOptions}
   */

  this.options = {};

  for (key in DEFAULT_OPTIONS) {
    this.options[key] = options !== undefined && key in options ? options[key] : DEFAULT_OPTIONS[key];
  }
}
/**
 * Returns the plural form index for the given domain and value.
 *
 * @param {string} domain Domain on which to calculate plural form.
 * @param {number} n      Value for which plural form is to be calculated.
 *
 * @return {number} Plural form index.
 */


Tannin.prototype.getPluralForm = function (domain, n) {
  var getPluralForm = this.pluralForms[domain],
      config,
      plural,
      pf;

  if (!getPluralForm) {
    config = this.data[domain][''];
    pf = config['Plural-Forms'] || config['plural-forms'] || // Ignore reason: As known, there's no way to document the empty
    // string property on a key to guarantee this as metadata.
    // @ts-ignore
    config.plural_forms;

    if (typeof pf !== 'function') {
      plural = getPluralExpression(config['Plural-Forms'] || config['plural-forms'] || // Ignore reason: As known, there's no way to document the empty
      // string property on a key to guarantee this as metadata.
      // @ts-ignore
      config.plural_forms);
      pf = (0, _pluralForms.default)(plural);
    }

    getPluralForm = this.pluralForms[domain] = pf;
  }

  return getPluralForm(n);
};
/**
 * Translate a string.
 *
 * @param {string}      domain   Translation domain.
 * @param {string|void} context  Context distinguishing terms of the same name.
 * @param {string}      singular Primary key for translation lookup.
 * @param {string=}     plural   Fallback value used for non-zero plural
 *                               form index.
 * @param {number=}     n        Value to use in calculating plural form.
 *
 * @return {string} Translated string.
 */


Tannin.prototype.dcnpgettext = function (domain, context, singular, plural, n) {
  var index, key, entry;

  if (n === undefined) {
    // Default to singular.
    index = 0;
  } else {
    // Find index by evaluating plural form for value.
    index = this.getPluralForm(domain, n);
  }

  key = singular; // If provided, context is prepended to key with delimiter.

  if (context) {
    key = context + this.options.contextDelimiter + singular;
  }

  entry = this.data[domain][key]; // Verify not only that entry exists, but that the intended index is within
  // range and non-empty.

  if (entry && entry[index]) {
    return entry[index];
  }

  if (this.options.onMissingKey) {
    this.options.onMissingKey(singular, domain);
  } // If entry not found, fall back to singular vs. plural with zero index
  // representing the singular value.


  return index === 0 ? singular : plural;
};
},{"@tannin/plural-forms":"../../../../../node_modules/@tannin/plural-forms/index.js"}],"../../../../../node_modules/@wordpress/i18n/build-module/create-i18n.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createI18n = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/esm/defineProperty"));

var _tannin = _interopRequireDefault(require("tannin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
/**
 * External dependencies
 */


/**
 * @typedef {Record<string,any>} LocaleData
 */

/**
 * Default locale data to use for Tannin domain when not otherwise provided.
 * Assumes an English plural forms expression.
 *
 * @type {LocaleData}
 */
var DEFAULT_LOCALE_DATA = {
  '': {
    /** @param {number} n */
    plural_forms: function plural_forms(n) {
      return n === 1 ? 0 : 1;
    }
  }
};
/**
 * An i18n instance
 *
 * @typedef {Object} I18n
 * @property {Function} setLocaleData Merges locale data into the Tannin instance by domain. Accepts data in a
 *                                    Jed-formatted JSON object shape.
 * @property {Function} __            Retrieve the translation of text.
 * @property {Function} _x            Retrieve translated string with gettext context.
 * @property {Function} _n            Translates and retrieves the singular or plural form based on the supplied
 *                                    number.
 * @property {Function} _nx           Translates and retrieves the singular or plural form based on the supplied
 *                                    number, with gettext context.
 * @property {Function} isRTL         Check if current locale is RTL.
 */

/**
 * Create an i18n instance
 *
 * @param {LocaleData} [initialData]    Locale data configuration.
 * @param {string}     [initialDomain]  Domain for which configuration applies.
 * @return {I18n}                       I18n instance
 */

var createI18n = function createI18n(initialData, initialDomain) {
  /**
   * The underlying instance of Tannin to which exported functions interface.
   *
   * @type {Tannin}
   */
  var tannin = new _tannin.default({});
  /**
   * Merges locale data into the Tannin instance by domain. Accepts data in a
   * Jed-formatted JSON object shape.
   *
   * @see http://messageformat.github.io/Jed/
   *
   * @param {LocaleData} [data]   Locale data configuration.
   * @param {string}     [domain] Domain for which configuration applies.
   */

  var setLocaleData = function setLocaleData(data) {
    var domain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
    tannin.data[domain] = _objectSpread({}, DEFAULT_LOCALE_DATA, {}, tannin.data[domain], {}, data); // Populate default domain configuration (supported locale date which omits
    // a plural forms expression).

    tannin.data[domain][''] = _objectSpread({}, DEFAULT_LOCALE_DATA[''], {}, tannin.data[domain]['']);
  };
  /**
   * Wrapper for Tannin's `dcnpgettext`. Populates default locale data if not
   * otherwise previously assigned.
   *
   * @param {string|undefined} domain   Domain to retrieve the translated text.
   * @param {string|undefined} context  Context information for the translators.
   * @param {string}           single   Text to translate if non-plural. Used as
   *                                    fallback return value on a caught error.
   * @param {string}           [plural] The text to be used if the number is
   *                                    plural.
   * @param {number}           [number] The number to compare against to use
   *                                    either the singular or plural form.
   *
   * @return {string} The translated string.
   */


  var dcnpgettext = function dcnpgettext() {
    var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
    var context = arguments.length > 1 ? arguments[1] : undefined;
    var single = arguments.length > 2 ? arguments[2] : undefined;
    var plural = arguments.length > 3 ? arguments[3] : undefined;
    var number = arguments.length > 4 ? arguments[4] : undefined;

    if (!tannin.data[domain]) {
      setLocaleData(undefined, domain);
    }

    return tannin.dcnpgettext(domain, context, single, plural, number);
  };
  /**
   * Retrieve the translation of text.
   *
   * @see https://developer.wordpress.org/reference/functions/__/
   *
   * @param {string} text     Text to translate.
   * @param {string} [domain] Domain to retrieve the translated text.
   *
   * @return {string} Translated text.
   */


  var __ = function __(text, domain) {
    return dcnpgettext(domain, undefined, text);
  };
  /**
   * Retrieve translated string with gettext context.
   *
   * @see https://developer.wordpress.org/reference/functions/_x/
   *
   * @param {string} text     Text to translate.
   * @param {string} context  Context information for the translators.
   * @param {string} [domain] Domain to retrieve the translated text.
   *
   * @return {string} Translated context string without pipe.
   */


  var _x = function _x(text, context, domain) {
    return dcnpgettext(domain, context, text);
  };
  /**
   * Translates and retrieves the singular or plural form based on the supplied
   * number.
   *
   * @see https://developer.wordpress.org/reference/functions/_n/
   *
   * @param {string} single   The text to be used if the number is singular.
   * @param {string} plural   The text to be used if the number is plural.
   * @param {number} number   The number to compare against to use either the
   *                          singular or plural form.
   * @param {string} [domain] Domain to retrieve the translated text.
   *
   * @return {string} The translated singular or plural form.
   */


  var _n = function _n(single, plural, number, domain) {
    return dcnpgettext(domain, undefined, single, plural, number);
  };
  /**
   * Translates and retrieves the singular or plural form based on the supplied
   * number, with gettext context.
   *
   * @see https://developer.wordpress.org/reference/functions/_nx/
   *
   * @param {string} single   The text to be used if the number is singular.
   * @param {string} plural   The text to be used if the number is plural.
   * @param {number} number   The number to compare against to use either the
   *                          singular or plural form.
   * @param {string} context  Context information for the translators.
   * @param {string} [domain] Domain to retrieve the translated text.
   *
   * @return {string} The translated singular or plural form.
   */


  var _nx = function _nx(single, plural, number, context, domain) {
    return dcnpgettext(domain, context, single, plural, number);
  };
  /**
   * Check if current locale is RTL.
   *
   * **RTL (Right To Left)** is a locale property indicating that text is written from right to left.
   * For example, the `he` locale (for Hebrew) specifies right-to-left. Arabic (ar) is another common
   * language written RTL. The opposite of RTL, LTR (Left To Right) is used in other languages,
   * including English (`en`, `en-US`, `en-GB`, etc.), Spanish (`es`), and French (`fr`).
   *
   * @return {boolean} Whether locale is RTL.
   */


  var isRTL = function isRTL() {
    return 'rtl' === _x('ltr', 'text direction');
  };

  if (initialData) {
    setLocaleData(initialData, initialDomain);
  }

  return {
    setLocaleData: setLocaleData,
    __: __,
    _x: _x,
    _n: _n,
    _nx: _nx,
    isRTL: isRTL
  };
};

exports.createI18n = createI18n;
},{"@babel/runtime/helpers/esm/defineProperty":"../../../../../node_modules/@babel/runtime/helpers/esm/defineProperty.js","tannin":"../../../../../node_modules/tannin/index.js"}],"../../../../../node_modules/@wordpress/i18n/build-module/default-i18n.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRTL = exports._nx = exports._n = exports._x = exports.__ = exports.setLocaleData = void 0;

var _createI18n = require("./create-i18n");

/**
 * Internal dependencies
 */
var i18n = (0, _createI18n.createI18n)();
/*
 * Comments in this file are duplicated from ./i18n due to
 * https://github.com/WordPress/gutenberg/pull/20318#issuecomment-590837722
 */

/**
 * @typedef {import('./create-i18n').LocaleData} LocaleData
 */

/**
 * Merges locale data into the Tannin instance by domain. Accepts data in a
 * Jed-formatted JSON object shape.
 *
 * @see http://messageformat.github.io/Jed/
 *
 * @param {LocaleData} [data]   Locale data configuration.
 * @param {string}     [domain] Domain for which configuration applies.
 */

var setLocaleData = i18n.setLocaleData.bind(i18n);
/**
 * Retrieve the translation of text.
 *
 * @see https://developer.wordpress.org/reference/functions/__/
 *
 * @param {string} text     Text to translate.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} Translated text.
 */

exports.setLocaleData = setLocaleData;

var __ = i18n.__.bind(i18n);
/**
 * Retrieve translated string with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_x/
 *
 * @param {string} text     Text to translate.
 * @param {string} context  Context information for the translators.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} Translated context string without pipe.
 */


exports.__ = __;

var _x = i18n._x.bind(i18n);
/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number.
 *
 * @see https://developer.wordpress.org/reference/functions/_n/
 *
 * @param {string} single   The text to be used if the number is singular.
 * @param {string} plural   The text to be used if the number is plural.
 * @param {number} number   The number to compare against to use either the
 *                          singular or plural form.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */


exports._x = _x;

var _n = i18n._n.bind(i18n);
/**
 * Translates and retrieves the singular or plural form based on the supplied
 * number, with gettext context.
 *
 * @see https://developer.wordpress.org/reference/functions/_nx/
 *
 * @param {string} single   The text to be used if the number is singular.
 * @param {string} plural   The text to be used if the number is plural.
 * @param {number} number   The number to compare against to use either the
 *                          singular or plural form.
 * @param {string} context  Context information for the translators.
 * @param {string} [domain] Domain to retrieve the translated text.
 *
 * @return {string} The translated singular or plural form.
 */


exports._n = _n;

var _nx = i18n._nx.bind(i18n);
/**
 * Check if current locale is RTL.
 *
 * **RTL (Right To Left)** is a locale property indicating that text is written from right to left.
 * For example, the `he` locale (for Hebrew) specifies right-to-left. Arabic (ar) is another common
 * language written RTL. The opposite of RTL, LTR (Left To Right) is used in other languages,
 * including English (`en`, `en-US`, `en-GB`, etc.), Spanish (`es`), and French (`fr`).
 *
 * @return {boolean} Whether locale is RTL.
 */


exports._nx = _nx;
var isRTL = i18n.isRTL.bind(i18n);
exports.isRTL = isRTL;
},{"./create-i18n":"../../../../../node_modules/@wordpress/i18n/build-module/create-i18n.js"}],"../../../../../node_modules/@wordpress/i18n/build-module/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  sprintf: true,
  setLocaleData: true,
  __: true,
  _x: true,
  _n: true,
  _nx: true,
  isRTL: true
};
Object.defineProperty(exports, "sprintf", {
  enumerable: true,
  get: function () {
    return _sprintf.sprintf;
  }
});
Object.defineProperty(exports, "setLocaleData", {
  enumerable: true,
  get: function () {
    return _defaultI18n.setLocaleData;
  }
});
Object.defineProperty(exports, "__", {
  enumerable: true,
  get: function () {
    return _defaultI18n.__;
  }
});
Object.defineProperty(exports, "_x", {
  enumerable: true,
  get: function () {
    return _defaultI18n._x;
  }
});
Object.defineProperty(exports, "_n", {
  enumerable: true,
  get: function () {
    return _defaultI18n._n;
  }
});
Object.defineProperty(exports, "_nx", {
  enumerable: true,
  get: function () {
    return _defaultI18n._nx;
  }
});
Object.defineProperty(exports, "isRTL", {
  enumerable: true,
  get: function () {
    return _defaultI18n.isRTL;
  }
});

var _sprintf = require("./sprintf");

var _createI18n = require("./create-i18n");

Object.keys(_createI18n).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _createI18n[key];
    }
  });
});

var _defaultI18n = require("./default-i18n");
},{"./sprintf":"../../../../../node_modules/@wordpress/i18n/build-module/sprintf.js","./create-i18n":"../../../../../node_modules/@wordpress/i18n/build-module/create-i18n.js","./default-i18n":"../../../../../node_modules/@wordpress/i18n/build-module/default-i18n.js"}],"../../../../../node_modules/portal-vue/dist/portal-vue.common.js":[function(require,module,exports) {

 /*! 
  * portal-vue © Thorsten Lünborg, 2019 
  * 
  * Version: 2.1.7
  * 
  * LICENCE: MIT 
  * 
  * https://github.com/linusborg/portal-vue
  * 
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var inBrowser = typeof window !== 'undefined';
function freeze(item) {
  if (Array.isArray(item) || _typeof(item) === 'object') {
    return Object.freeze(item);
  }

  return item;
}
function combinePassengers(transports) {
  var slotProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return transports.reduce(function (passengers, transport) {
    var temp = transport.passengers[0];
    var newPassengers = typeof temp === 'function' ? temp(slotProps) : transport.passengers;
    return passengers.concat(newPassengers);
  }, []);
}
function stableSort(array, compareFn) {
  return array.map(function (v, idx) {
    return [idx, v];
  }).sort(function (a, b) {
    return compareFn(a[1], b[1]) || a[0] - b[0];
  }).map(function (c) {
    return c[1];
  });
}
function pick(obj, keys) {
  return keys.reduce(function (acc, key) {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

var transports = {};
var targets = {};
var sources = {};
var Wormhole = Vue.extend({
  data: function data() {
    return {
      transports: transports,
      targets: targets,
      sources: sources,
      trackInstances: inBrowser
    };
  },
  methods: {
    open: function open(transport) {
      if (!inBrowser) return;
      var to = transport.to,
          from = transport.from,
          passengers = transport.passengers,
          _transport$order = transport.order,
          order = _transport$order === void 0 ? Infinity : _transport$order;
      if (!to || !from || !passengers) return;
      var newTransport = {
        to: to,
        from: from,
        passengers: freeze(passengers),
        order: order
      };
      var keys = Object.keys(this.transports);

      if (keys.indexOf(to) === -1) {
        Vue.set(this.transports, to, []);
      }

      var currentIndex = this.$_getTransportIndex(newTransport); // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays

      var newTransports = this.transports[to].slice(0);

      if (currentIndex === -1) {
        newTransports.push(newTransport);
      } else {
        newTransports[currentIndex] = newTransport;
      }

      this.transports[to] = stableSort(newTransports, function (a, b) {
        return a.order - b.order;
      });
    },
    close: function close(transport) {
      var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var to = transport.to,
          from = transport.from;
      if (!to || !from && force === false) return;

      if (!this.transports[to]) {
        return;
      }

      if (force) {
        this.transports[to] = [];
      } else {
        var index = this.$_getTransportIndex(transport);

        if (index >= 0) {
          // Copying the array here so that the PortalTarget change event will actually contain two distinct arrays
          var newTransports = this.transports[to].slice(0);
          newTransports.splice(index, 1);
          this.transports[to] = newTransports;
        }
      }
    },
    registerTarget: function registerTarget(target, vm, force) {
      if (!inBrowser) return;

      if (this.trackInstances && !force && this.targets[target]) {
        console.warn("[portal-vue]: Target ".concat(target, " already exists"));
      }

      this.$set(this.targets, target, Object.freeze([vm]));
    },
    unregisterTarget: function unregisterTarget(target) {
      this.$delete(this.targets, target);
    },
    registerSource: function registerSource(source, vm, force) {
      if (!inBrowser) return;

      if (this.trackInstances && !force && this.sources[source]) {
        console.warn("[portal-vue]: source ".concat(source, " already exists"));
      }

      this.$set(this.sources, source, Object.freeze([vm]));
    },
    unregisterSource: function unregisterSource(source) {
      this.$delete(this.sources, source);
    },
    hasTarget: function hasTarget(to) {
      return !!(this.targets[to] && this.targets[to][0]);
    },
    hasSource: function hasSource(to) {
      return !!(this.sources[to] && this.sources[to][0]);
    },
    hasContentFor: function hasContentFor(to) {
      return !!this.transports[to] && !!this.transports[to].length;
    },
    // Internal
    $_getTransportIndex: function $_getTransportIndex(_ref) {
      var to = _ref.to,
          from = _ref.from;

      for (var i in this.transports[to]) {
        if (this.transports[to][i].from === from) {
          return +i;
        }
      }

      return -1;
    }
  }
});
var wormhole = new Wormhole(transports);

var _id = 1;
var Portal = Vue.extend({
  name: 'portal',
  props: {
    disabled: {
      type: Boolean
    },
    name: {
      type: String,
      default: function _default() {
        return String(_id++);
      }
    },
    order: {
      type: Number,
      default: 0
    },
    slim: {
      type: Boolean
    },
    slotProps: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    tag: {
      type: String,
      default: 'DIV'
    },
    to: {
      type: String,
      default: function _default() {
        return String(Math.round(Math.random() * 10000000));
      }
    }
  },
  created: function created() {
    var _this = this;

    this.$nextTick(function () {
      wormhole.registerSource(_this.name, _this);
    });
  },
  mounted: function mounted() {
    if (!this.disabled) {
      this.sendUpdate();
    }
  },
  updated: function updated() {
    if (this.disabled) {
      this.clear();
    } else {
      this.sendUpdate();
    }
  },
  beforeDestroy: function beforeDestroy() {
    wormhole.unregisterSource(this.name);
    this.clear();
  },
  watch: {
    to: function to(newValue, oldValue) {
      oldValue && oldValue !== newValue && this.clear(oldValue);
      this.sendUpdate();
    }
  },
  methods: {
    clear: function clear(target) {
      var closer = {
        from: this.name,
        to: target || this.to
      };
      wormhole.close(closer);
    },
    normalizeSlots: function normalizeSlots() {
      return this.$scopedSlots.default ? [this.$scopedSlots.default] : this.$slots.default;
    },
    normalizeOwnChildren: function normalizeOwnChildren(children) {
      return typeof children === 'function' ? children(this.slotProps) : children;
    },
    sendUpdate: function sendUpdate() {
      var slotContent = this.normalizeSlots();

      if (slotContent) {
        var transport = {
          from: this.name,
          to: this.to,
          passengers: _toConsumableArray(slotContent),
          order: this.order
        };
        wormhole.open(transport);
      } else {
        this.clear();
      }
    }
  },
  render: function render(h) {
    var children = this.$slots.default || this.$scopedSlots.default || [];
    var Tag = this.tag;

    if (children && this.disabled) {
      return children.length <= 1 && this.slim ? this.normalizeOwnChildren(children)[0] : h(Tag, [this.normalizeOwnChildren(children)]);
    } else {
      return this.slim ? h() : h(Tag, {
        class: {
          'v-portal': true
        },
        style: {
          display: 'none'
        },
        key: 'v-portal-placeholder'
      });
    }
  }
});

var PortalTarget = Vue.extend({
  name: 'portalTarget',
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    slim: {
      type: Boolean,
      default: false
    },
    slotProps: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    tag: {
      type: String,
      default: 'div'
    },
    transition: {
      type: [String, Object, Function]
    }
  },
  data: function data() {
    return {
      transports: wormhole.transports,
      firstRender: true
    };
  },
  created: function created() {
    var _this = this;

    this.$nextTick(function () {
      wormhole.registerTarget(_this.name, _this);
    });
  },
  watch: {
    ownTransports: function ownTransports() {
      this.$emit('change', this.children().length > 0);
    },
    name: function name(newVal, oldVal) {
      /**
       * TODO
       * This should warn as well ...
       */
      wormhole.unregisterTarget(oldVal);
      wormhole.registerTarget(newVal, this);
    }
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.transition) {
      this.$nextTick(function () {
        // only when we have a transition, because it causes a re-render
        _this2.firstRender = false;
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    wormhole.unregisterTarget(this.name);
  },
  computed: {
    ownTransports: function ownTransports() {
      var transports = this.transports[this.name] || [];

      if (this.multiple) {
        return transports;
      }

      return transports.length === 0 ? [] : [transports[transports.length - 1]];
    },
    passengers: function passengers() {
      return combinePassengers(this.ownTransports, this.slotProps);
    }
  },
  methods: {
    // can't be a computed prop because it has to "react" to $slot changes.
    children: function children() {
      return this.passengers.length !== 0 ? this.passengers : this.$scopedSlots.default ? this.$scopedSlots.default(this.slotProps) : this.$slots.default || [];
    },
    // can't be a computed prop because it has to "react" to this.children().
    noWrapper: function noWrapper() {
      var noWrapper = this.slim && !this.transition;

      if (noWrapper && this.children().length > 1) {
        console.warn('[portal-vue]: PortalTarget with `slim` option received more than one child element.');
      }

      return noWrapper;
    }
  },
  render: function render(h) {
    var noWrapper = this.noWrapper();
    var children = this.children();
    var Tag = this.transition || this.tag;
    return noWrapper ? children[0] : this.slim && !Tag ? h() : h(Tag, {
      props: {
        // if we have a transition component, pass the tag if it exists
        tag: this.transition && this.tag ? this.tag : undefined
      },
      class: {
        'vue-portal-target': true
      }
    }, children);
  }
});

var _id$1 = 0;
var portalProps = ['disabled', 'name', 'order', 'slim', 'slotProps', 'tag', 'to'];
var targetProps = ['multiple', 'transition'];
var MountingPortal = Vue.extend({
  name: 'MountingPortal',
  inheritAttrs: false,
  props: {
    append: {
      type: [Boolean, String]
    },
    bail: {
      type: Boolean
    },
    mountTo: {
      type: String,
      required: true
    },
    // Portal
    disabled: {
      type: Boolean
    },
    // name for the portal
    name: {
      type: String,
      default: function _default() {
        return 'mounted_' + String(_id$1++);
      }
    },
    order: {
      type: Number,
      default: 0
    },
    slim: {
      type: Boolean
    },
    slotProps: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    tag: {
      type: String,
      default: 'DIV'
    },
    // name for the target
    to: {
      type: String,
      default: function _default() {
        return String(Math.round(Math.random() * 10000000));
      }
    },
    // Target
    multiple: {
      type: Boolean,
      default: false
    },
    targetSlim: {
      type: Boolean
    },
    targetSlotProps: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    targetTag: {
      type: String,
      default: 'div'
    },
    transition: {
      type: [String, Object, Function]
    }
  },
  created: function created() {
    if (typeof document === 'undefined') return;
    var el = document.querySelector(this.mountTo);

    if (!el) {
      console.error("[portal-vue]: Mount Point '".concat(this.mountTo, "' not found in document"));
      return;
    }

    var props = this.$props; // Target already exists

    if (wormhole.targets[props.name]) {
      if (props.bail) {
        console.warn("[portal-vue]: Target ".concat(props.name, " is already mounted.\n        Aborting because 'bail: true' is set"));
      } else {
        this.portalTarget = wormhole.targets[props.name];
      }

      return;
    }

    var append = props.append;

    if (append) {
      var type = typeof append === 'string' ? append : 'DIV';
      var mountEl = document.createElement(type);
      el.appendChild(mountEl);
      el = mountEl;
    } // get props for target from $props
    // we have to rename a few of them


    var _props = pick(this.$props, targetProps);

    _props.slim = this.targetSlim;
    _props.tag = this.targetTag;
    _props.slotProps = this.targetSlotProps;
    _props.name = this.to;
    this.portalTarget = new PortalTarget({
      el: el,
      parent: this.$parent || this,
      propsData: _props
    });
  },
  beforeDestroy: function beforeDestroy() {
    var target = this.portalTarget;

    if (this.append) {
      var el = target.$el;
      el.parentNode.removeChild(el);
    }

    target.$destroy();
  },
  render: function render(h) {
    if (!this.portalTarget) {
      console.warn("[portal-vue] Target wasn't mounted");
      return h();
    } // if there's no "manual" scoped slot, so we create a <Portal> ourselves


    if (!this.$scopedSlots.manual) {
      var props = pick(this.$props, portalProps);
      return h(Portal, {
        props: props,
        attrs: this.$attrs,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots
      }, this.$slots.default);
    } // else, we render the scoped slot


    var content = this.$scopedSlots.manual({
      to: this.to
    }); // if user used <template> for the scoped slot
    // content will be an array

    if (Array.isArray(content)) {
      content = content[0];
    }

    if (!content) return h();
    return content;
  }
});

function install(Vue$$1) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Vue$$1.component(options.portalName || 'Portal', Portal);
  Vue$$1.component(options.portalTargetName || 'PortalTarget', PortalTarget);
  Vue$$1.component(options.MountingPortalName || 'MountingPortal', MountingPortal);
}

var index = {
  install: install
};

exports.default = index;
exports.Portal = Portal;
exports.PortalTarget = PortalTarget;
exports.MountingPortal = MountingPortal;
exports.Wormhole = wormhole;


},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js"}],"../../../../../node_modules/vuex/dist/vuex.esm.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLogger = createLogger;
exports.install = install;
exports.mapState = exports.mapMutations = exports.mapGetters = exports.mapActions = exports.createNamespacedHelpers = exports.Store = exports.default = void 0;

/*!
 * vuex v3.5.1
 * (c) 2020 Evan You
 * @license MIT
 */
function applyMixin(Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({
      beforeCreate: vuexInit
    });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;

    Vue.prototype._init = function (options) {
      if (options === void 0) options = {};
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;

      _init.call(this, options);
    };
  }
  /**
   * Vuex init hook, injected into each instances init hooks list.
   */


  function vuexInit() {
    var options = this.$options; // store injection

    if (options.store) {
      this.$store = typeof options.store === 'function' ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin(store) {
  if (!devtoolHook) {
    return;
  }

  store._devtoolHook = devtoolHook;
  devtoolHook.emit('vuex:init', store);
  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });
  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, {
    prepend: true
  });
  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, {
    prepend: true
  });
}
/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */


function find(list, f) {
  return list.filter(f)[0];
}
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


function deepCopy(obj, cache) {
  if (cache === void 0) cache = []; // just return if obj is immutable value

  if (obj === null || typeof obj !== 'object') {
    return obj;
  } // if obj is hit, it is in circular structure


  var hit = find(cache, function (c) {
    return c.original === obj;
  });

  if (hit) {
    return hit.copy;
  }

  var copy = Array.isArray(obj) ? [] : {}; // put the copy into cache at first
  // because we want to refer it in recursive deepCopy

  cache.push({
    original: obj,
    copy: copy
  });
  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
}
/**
 * forEach for object
 */


function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return fn(obj[key], key);
  });
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}

function partial(fn, arg) {
  return function () {
    return fn(arg);
  };
} // Base data struct for store's module, package with some attribute and method


var Module = function Module(rawModule, runtime) {
  this.runtime = runtime; // Store some children item

  this._children = Object.create(null); // Store the origin module object which passed by programmer

  this._rawModule = rawModule;
  var rawState = rawModule.state; // Store the origin module's state

  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = {
  namespaced: {
    configurable: true
  }
};

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced;
};

Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};

Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};

Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;

  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }

  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }

  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties(Module.prototype, prototypeAccessors);

var ModuleCollection = function ModuleCollection(rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function (module, key) {
    return module.getChild(key);
  }, this.root);
};

ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '');
  }, '');
};

ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1 = this;
  if (runtime === void 0) runtime = true;

  if ("development" !== 'production') {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);

  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  } // register nested modules


  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ("development" !== 'production') {
      console.warn("[vuex] trying to unregister module '" + key + "', which is " + "not registered");
    }

    return;
  }

  if (!child.runtime) {
    return;
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  return parent.hasChild(key);
};

function update(path, targetModule, newModule) {
  if ("development" !== 'production') {
    assertRawModule(path, newModule);
  } // update target module


  targetModule.update(newModule); // update nested modules

  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ("development" !== 'production') {
          console.warn("[vuex] trying to add a new module '" + key + "' on hot reloading, " + 'manual reload is needed');
        }

        return;
      }

      update(path.concat(key), targetModule.getChild(key), newModule.modules[key]);
    }
  }
}

var functionAssert = {
  assert: function (value) {
    return typeof value === 'function';
  },
  expected: 'function'
};
var objectAssert = {
  assert: function (value) {
    return typeof value === 'function' || typeof value === 'object' && typeof value.handler === 'function';
  },
  expected: 'function or object with "handler" function'
};
var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) {
      return;
    }

    var assertOptions = assertTypes[key];
    forEachValue(rawModule[key], function (value, type) {
      assert(assertOptions.assert(value), makeAssertionMessage(path, key, type, value, assertOptions.expected));
    });
  });
}

function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";

  if (path.length > 0) {
    buf += " in module \"" + path.join('.') + "\"";
  }

  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}

var Vue; // bind on install

var Store = function Store(options) {
  var this$1 = this;
  if (options === void 0) options = {}; // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731

  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ("development" !== 'production') {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins;
  if (plugins === void 0) plugins = [];
  var strict = options.strict;
  if (strict === void 0) strict = false; // store internal state

  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null); // bind commit and dispatch to self

  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;

  this.dispatch = function boundDispatch(type, payload) {
    return dispatch.call(store, type, payload);
  };

  this.commit = function boundCommit(type, payload, options) {
    return commit.call(store, type, payload, options);
  }; // strict mode


  this.strict = strict;
  var state = this._modules.root.state; // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters

  installModule(this, state, [], this._modules.root); // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)

  resetStoreVM(this, state); // apply plugins

  plugins.forEach(function (plugin) {
    return plugin(this$1);
  });
  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;

  if (useDevtools) {
    devtoolPlugin(this);
  }
};

exports.Store = Store;
var prototypeAccessors$1 = {
  state: {
    configurable: true
  }
};

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state;
};

prototypeAccessors$1.state.set = function (v) {
  if ("development" !== 'production') {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1 = this; // check object-style commit

  var ref = unifyObjectStyle(_type, _payload, _options);
  var type = ref.type;
  var payload = ref.payload;
  var options = ref.options;
  var mutation = {
    type: type,
    payload: payload
  };
  var entry = this._mutations[type];

  if (!entry) {
    if ("development" !== 'production') {
      console.error("[vuex] unknown mutation type: " + type);
    }

    return;
  }

  this._withCommit(function () {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });

  this._subscribers.slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
  .forEach(function (sub) {
    return sub(mutation, this$1.state);
  });

  if ("development" !== 'production' && options && options.silent) {
    console.warn("[vuex] mutation type: " + type + ". Silent option has been removed. " + 'Use the filter functionality in the vue-devtools');
  }
};

Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1 = this; // check object-style dispatch

  var ref = unifyObjectStyle(_type, _payload);
  var type = ref.type;
  var payload = ref.payload;
  var action = {
    type: type,
    payload: payload
  };
  var entry = this._actions[type];

  if (!entry) {
    if ("development" !== 'production') {
      console.error("[vuex] unknown action type: " + type);
    }

    return;
  }

  try {
    this._actionSubscribers.slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .filter(function (sub) {
      return sub.before;
    }).forEach(function (sub) {
      return sub.before(action, this$1.state);
    });
  } catch (e) {
    if ("development" !== 'production') {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1 ? Promise.all(entry.map(function (handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers.filter(function (sub) {
          return sub.after;
        }).forEach(function (sub) {
          return sub.after(action, this$1.state);
        });
      } catch (e) {
        if ("development" !== 'production') {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }

      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers.filter(function (sub) {
          return sub.error;
        }).forEach(function (sub) {
          return sub.error(action, this$1.state, error);
        });
      } catch (e) {
        if ("development" !== 'production') {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }

      reject(error);
    });
  });
};

Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};

Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === 'function' ? {
    before: fn
  } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};

Store.prototype.watch = function watch(getter, cb, options) {
  var this$1 = this;

  if ("development" !== 'production') {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }

  return this._watcherVM.$watch(function () {
    return getter(this$1.state, this$1.getters);
  }, cb, options);
};

Store.prototype.replaceState = function replaceState(state) {
  var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0) options = {};

  if (typeof path === 'string') {
    path = [path];
  }

  if ("development" !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);

  installModule(this, this.state, path, this._modules.get(path), options.preserveState); // reset store to update getters...

  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1 = this;

  if (typeof path === 'string') {
    path = [path];
  }

  if ("development" !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);

  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });

  resetStore(this);
};

Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === 'string') {
    path = [path];
  }

  if ("development" !== 'production') {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path);
};

Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);

  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties(Store.prototype, prototypeAccessors$1);

function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }

  return function () {
    var i = subs.indexOf(fn);

    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state; // init all modules

  installModule(store, state, [], store._modules.root, true); // reset vm

  resetStoreVM(store, state, hot);
}

function resetStoreVM(store, state, hot) {
  var oldVm = store._vm; // bind store public getters

  store.getters = {}; // reset local getters cache

  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () {
        return store._vm[key];
      },
      enumerable: true // for local getters

    });
  }); // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins

  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent; // enable strict mode for new vm

  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }

    Vue.nextTick(function () {
      return oldVm.$destroy();
    });
  }
}

function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;

  var namespace = store._modules.getNamespace(path); // register in namespace map


  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && "development" !== 'production') {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join('/'));
    }

    store._modulesNamespaceMap[namespace] = module;
  } // set state


  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];

    store._withCommit(function () {
      if ("development" !== 'production') {
        if (moduleName in parentState) {
          console.warn("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + path.join('.') + "\"");
        }
      }

      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);
  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });
  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });
  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });
  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */


function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === '';
  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;

        if ("development" !== 'production' && !store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }

      return store.dispatch(type, payload);
    },
    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;

        if ("development" !== 'production' && !store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }

      store.commit(type, payload, options);
    }
  }; // getters and state object must be gotten lazily
  // because they will be changed by vm update

  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function () {
        return store.getters;
      } : function () {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function () {
        return getNestedState(store.state, path);
      }
    }
  });
  return local;
}

function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) {
        return;
      } // extract local getter type


      var localType = type.slice(splitPos); // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.

      Object.defineProperty(gettersProxy, localType, {
        get: function () {
          return store.getters[type];
        },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace];
}

function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);

    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }

    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);

        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ("development" !== 'production') {
      console.error("[vuex] duplicate getter key: " + type);
    }

    return;
  }

  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(local.state, // local state
    local.getters, // local getters
    store.state, // root state
    store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  store._vm.$watch(function () {
    return this._data.$$state;
  }, function () {
    if ("development" !== 'production') {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, {
    deep: true,
    sync: true
  });
}

function getNestedState(state, path) {
  return path.reduce(function (state, key) {
    return state[key];
  }, state);
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ("development" !== 'production') {
    assert(typeof type === 'string', "expects string as the type, but found " + typeof type + ".");
  }

  return {
    type: type,
    payload: payload,
    options: options
  };
}

function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if ("development" !== 'production') {
      console.error('[vuex] already installed. Vue.use(Vuex) should be called only once.');
    }

    return;
  }

  Vue = _Vue;
  applyMixin(Vue);
}
/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */


var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};

  if ("development" !== 'production' && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }

  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState() {
      var state = this.$store.state;
      var getters = this.$store.getters;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);

        if (!module) {
          return;
        }

        state = module.context.state;
        getters = module.context.getters;
      }

      return typeof val === 'function' ? val.call(this, state, getters) : state[val];
    }; // mark vuex getter for devtools


    res[key].vuex = true;
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */

exports.mapState = mapState;
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};

  if ("development" !== 'production' && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }

  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation() {
      var args = [],
          len = arguments.length;

      while (len--) args[len] = arguments[len]; // Get the commit method from store


      var commit = this.$store.commit;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);

        if (!module) {
          return;
        }

        commit = module.context.commit;
      }

      return typeof val === 'function' ? val.apply(this, [commit].concat(args)) : commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */

exports.mapMutations = mapMutations;
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};

  if ("development" !== 'production' && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }

  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val; // The namespace has been mutated by normalizeNamespace

    val = namespace + val;

    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return;
      }

      if ("development" !== 'production' && !(val in this.$store.getters)) {
        console.error("[vuex] unknown getter: " + val);
        return;
      }

      return this.$store.getters[val];
    }; // mark vuex getter for devtools


    res[key].vuex = true;
  });
  return res;
});
/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */

exports.mapGetters = mapGetters;
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};

  if ("development" !== 'production' && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }

  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction() {
      var args = [],
          len = arguments.length;

      while (len--) args[len] = arguments[len]; // get dispatch function from store


      var dispatch = this.$store.dispatch;

      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);

        if (!module) {
          return;
        }

        dispatch = module.context.dispatch;
      }

      return typeof val === 'function' ? val.apply(this, [dispatch].concat(args)) : dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});
/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */

exports.mapActions = mapActions;

var createNamespacedHelpers = function (namespace) {
  return {
    mapState: mapState.bind(null, namespace),
    mapGetters: mapGetters.bind(null, namespace),
    mapMutations: mapMutations.bind(null, namespace),
    mapActions: mapActions.bind(null, namespace)
  };
};
/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */


exports.createNamespacedHelpers = createNamespacedHelpers;

function normalizeMap(map) {
  if (!isValidMap(map)) {
    return [];
  }

  return Array.isArray(map) ? map.map(function (key) {
    return {
      key: key,
      val: key
    };
  }) : Object.keys(map).map(function (key) {
    return {
      key: key,
      val: map[key]
    };
  });
}
/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */


function isValidMap(map) {
  return Array.isArray(map) || isObject(map);
}
/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */


function normalizeNamespace(fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }

    return fn(namespace, map);
  };
}
/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */


function getModuleByNamespace(store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];

  if ("development" !== 'production' && !module) {
    console.error("[vuex] module namespace not found in " + helper + "(): " + namespace);
  }

  return module;
} // Credits: borrowed code from fcomb/redux-logger


function createLogger(ref) {
  if (ref === void 0) ref = {};
  var collapsed = ref.collapsed;
  if (collapsed === void 0) collapsed = true;
  var filter = ref.filter;
  if (filter === void 0) filter = function (mutation, stateBefore, stateAfter) {
    return true;
  };
  var transformer = ref.transformer;
  if (transformer === void 0) transformer = function (state) {
    return state;
  };
  var mutationTransformer = ref.mutationTransformer;
  if (mutationTransformer === void 0) mutationTransformer = function (mut) {
    return mut;
  };
  var actionFilter = ref.actionFilter;
  if (actionFilter === void 0) actionFilter = function (action, state) {
    return true;
  };
  var actionTransformer = ref.actionTransformer;
  if (actionTransformer === void 0) actionTransformer = function (act) {
    return act;
  };
  var logMutations = ref.logMutations;
  if (logMutations === void 0) logMutations = true;
  var logActions = ref.logActions;
  if (logActions === void 0) logActions = true;
  var logger = ref.logger;
  if (logger === void 0) logger = console;
  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return;
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + mutation.type + formattedTime;
          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + action.type + formattedTime;
          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  };
}

function startMessage(logger, message, collapsed) {
  var startMessage = collapsed ? logger.groupCollapsed : logger.group; // render

  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage(logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime() {
  var time = new Date();
  return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
}

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num;
}

var index = {
  Store: Store,
  install: install,
  version: '3.5.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};
var _default = index;
exports.default = _default;
},{}],"mixins/withNativeTranslationStore.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Translation mixin for stores with strings state and translation getter.
 *
 * @type {Object}
 */
var withNativeTranslationStore = {
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['translation'])),
  methods: {
    /**
     * Translation method to be used outside of templates.
     *
     * @param {string} key translation key
     */
    translationM: function translationM(key) {
      return this.$store.getters.translation(key);
    }
  }
};
/* @module withNativeTranslationStore */

var _default = withNativeTranslationStore;
exports.default = _default;
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js"}],"functions/DataSourceObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Data source card object.
 *
 * @param {string} id unique id
 * @param {string} title title
 * @param {string} info information for source
 * @param {string} icon icon
 * @param {boolean} isPro is data source related to pro version
 * @class
 */
function DataSourceObject(id, title, info, icon) {
  var isPro = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  this.id = id;
  this.title = title;
  this.info = info;
  this.icon = icon;
  this.pro = isPro;
}

var _default = DataSourceObject;
exports.default = _default;
},{}],"components/DataSourceCard.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _DataSourceObject = _interopRequireDefault(require("../functions/DataSourceObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  props: {
    dataSourceObject: {
      type: _DataSourceObject.default,
      required: true
    }
  },
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['getIcon'])),
  methods: _objectSpread({
    handleCardClick: function handleCardClick() {
      if (!this.isSelected() && this.proSourceStatus()) {
        this.softSelectCard(this.dataSourceObject.id);
      } else if (!this.proSourceStatus()) {
        var proWin = window.open(this.$store.state.proUrl, '_blank');
        proWin.focus();
      }
    },
    proSourceStatus: function proSourceStatus() {
      if (!this.dataSourceObject.pro) {
        return true;
      }

      return this.getProStatus();
    },
    isSelected: function isSelected() {
      return this.getSoftSelectedSourceCardId() === this.dataSourceObject.id;
    },
    handleConfirm: function handleConfirm() {
      this.$emit('sourceCardConfirm', this.dataSourceObject.id);
    }
  }, (0, _vuex.mapActions)(['softSelectCard']), {}, (0, _vuex.mapGetters)(['getSoftSelectedSourceCardId', 'getProStatus']))
};
exports.default = _default;
        var $034591 = exports.default || module.exports;
      
      if (typeof $034591 === 'function') {
        $034591 = $034591.options;
      }
    
        /* template */
        Object.assign($034591, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wptb-data-source-card-wrapper",
      attrs: { "data-card-selected": _vm.isSelected() },
      on: {
        "!click": function($event) {
          $event.preventDefault()
          return _vm.handleCardClick($event)
        }
      }
    },
    [
      _c("div", { staticClass: "wptb-data-source-card" }, [
        _c("div", {
          staticClass: "wptb-data-source-card-icon",
          domProps: { innerHTML: _vm._s(_vm.dataSourceObject.icon) }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "wptb-data-source-card-message" }, [
          _c("div", { staticClass: "wptb-data-source-card-header" }, [
            _vm._v(_vm._s(_vm.dataSourceObject.title))
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "wptb-data-source-card-info" }, [
            _vm._v(_vm._s(_vm.dataSourceObject.info))
          ])
        ])
      ]),
      _vm._v(" "),
      _vm.proSourceStatus()
        ? _c("div", {
            staticClass: "wptb-data-source-card-confirm",
            domProps: { innerHTML: _vm._s(_vm.getIcon("chevronRight")) },
            on: {
              "!click": function($event) {
                $event.preventDefault()
                return _vm.handleConfirm($event)
              }
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.dataSourceObject.pro
        ? _c("div", { staticClass: "wptb-data-source-card-pro-ribbon" }, [
            _vm._v("pro")
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","../functions/DataSourceObject":"functions/DataSourceObject.js"}],"mixins/withStoreBusy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Mixin for using store connected busy state to component.
 *
 * @type {Object}
 */
var withStoreBusy = {
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['busyStatus']), {
    isBusy: function isBusy() {
      return this.busyStatus;
    }
  })
};
var _default = withStoreBusy;
exports.default = _default;
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js"}],"components/DataTableLeftPanel.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _MaterialButton = _interopRequireDefault(require("./MaterialButton"));

var _withNativeTranslationStore = _interopRequireDefault(require("../mixins/withNativeTranslationStore"));

var _withStoreBusy = _interopRequireDefault(require("../mixins/withStoreBusy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  components: {
    MaterialButton: _MaterialButton.default
  },
  mixins: [_withNativeTranslationStore.default, _withStoreBusy.default],
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['isActiveScreenSourceSetup', 'isSetupDataImported'])),
  methods: _objectSpread({
    setScreenToSourceSelect: function setScreenToSourceSelect() {
      this.setCurrentScreen('DataSourceSelection');
    }
  }, (0, _vuex.mapActions)(['setCurrentScreen']))
};
exports.default = _default;
        var $a2c9cd = exports.default || module.exports;
      
      if (typeof $a2c9cd === 'function') {
        $a2c9cd = $a2c9cd.options;
      }
    
        /* template */
        Object.assign($a2c9cd, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "portal",
    { attrs: { to: "leftPanel" } },
    [
      _vm._t("default"),
      _vm._v(" "),
      _c("portal-target", { attrs: { name: "leftPanelAfter" } }),
      _vm._v(" "),
      _vm.isActiveScreenSourceSetup
        ? _c(
            "div",
            {
              staticClass:
                "wptb-data-table-left-panel-source-setup-general-button-wrapper"
            },
            [
              _c(
                "material-button",
                {
                  staticClass:
                    "wptb-plugin-box-shadow-md wptb-panel-button-material",
                  attrs: {
                    click: _vm.setScreenToSourceSelect,
                    type: "danger",
                    size: "full-size",
                    disabled: _vm.isBusy
                  }
                },
                [_vm._v(_vm._s(_vm._f("cap")(_vm.translationM("back"))))]
              ),
              _vm._v(" "),
              _c(
                "material-button",
                {
                  staticClass:
                    "wptb-plugin-box-shadow-md wptb-panel-button-material",
                  attrs: {
                    type: "confirm",
                    size: "full-size",
                    disabled: _vm.isBusy
                  }
                },
                [_vm._v(_vm._s(_vm._f("cap")(_vm.translationM("continue"))))]
              )
            ],
            1
          )
        : _vm._e()
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","./MaterialButton":"components/MaterialButton.vue","../mixins/withNativeTranslationStore":"mixins/withNativeTranslationStore.js","../mixins/withStoreBusy":"mixins/withStoreBusy.js"}],"components/LeftPanelInfoMessage.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  functional: true
};
exports.default = _default;
        var $45b588 = exports.default || module.exports;
      
      if (typeof $45b588 === 'function') {
        $45b588 = $45b588.options;
      }
    
        /* template */
        Object.assign($45b588, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wptb-panel-table-empty-message" }, [
    _c("i", [_vm._t("default")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/DataSourceSelection.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _withNativeTranslationStore = _interopRequireDefault(require("../mixins/withNativeTranslationStore"));

var _DataSourceObject = _interopRequireDefault(require("../functions/DataSourceObject"));

var _DataSourceCard = _interopRequireDefault(require("./DataSourceCard"));

var _DataTableLeftPanel = _interopRequireDefault(require("./DataTableLeftPanel"));

var _LeftPanelInfoMessage = _interopRequireDefault(require("./LeftPanelInfoMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  components: {
    DataSourceCard: _DataSourceCard.default,
    DataTableLeftPanel: _DataTableLeftPanel.default,
    LeftPanelInfoMessage: _LeftPanelInfoMessage.default
  },
  mixins: [_withNativeTranslationStore.default],
  data: function data() {
    return {
      sources: [new _DataSourceObject.default('csv', this.translationM('csvTitle'), this.translationM('csvInfo'), this.$store.getters.getIcon('csv')), new _DataSourceObject.default('wordpressPost', this.translationM('wordpressPostTitle'), this.translationM('wordpressPostInfo'), this.$store.getters.getIcon('wordpressPost'), true), new _DataSourceObject.default('database', this.translationM('databaseTitle'), this.translationM('databaseInfo'), this.$store.getters.getIcon('database'), true), new _DataSourceObject.default('remote', this.translationM('remoteTitle'), this.translationM('remoteInfo'), this.$store.getters.getIcon('server'), true)]
    };
  },
  methods: _objectSpread({
    handleSourceSelection: function handleSourceSelection(id) {
      this.startSourceSetup(id);
    },
    deselectSelection: function deselectSelection() {
      this.softSelectCard(null);
    }
  }, (0, _vuex.mapActions)(['startSourceSetup', 'softSelectCard']))
};
exports.default = _default;
        var $a6eb32 = exports.default || module.exports;
      
      if (typeof $a6eb32 === 'function') {
        $a6eb32 = $a6eb32.options;
      }
    
        /* template */
        Object.assign($a6eb32, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wptb-data-table-data-source-selection",
      on: {
        "!click": function($event) {
          $event.preventDefault()
          return _vm.deselectSelection($event)
        }
      }
    },
    [
      _c("div", { staticClass: "wptb-data-table-data-source-header" }, [
        _vm._v(_vm._s(_vm.translation("dataSourceHeader")))
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "wptb-data-table-data-source-cards-wrapper" },
        _vm._l(_vm.sources, function(source) {
          return _c("data-source-card", {
            key: source.id,
            attrs: { "data-source-object": source },
            on: { sourceCardConfirm: _vm.handleSourceSelection }
          })
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "data-table-left-panel",
        [
          _c("left-panel-info-message", [
            _vm._v(_vm._s(_vm.translation("sourceSelectLeftPanelInfo")))
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","../mixins/withNativeTranslationStore":"mixins/withNativeTranslationStore.js","../functions/DataSourceObject":"functions/DataSourceObject.js","./DataSourceCard":"components/DataSourceCard.vue","./DataTableLeftPanel":"components/DataTableLeftPanel.vue","./LeftPanelInfoMessage":"components/LeftPanelInfoMessage.vue"}],"components/PanelButtonControl.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MaterialButton = _interopRequireDefault(require("./MaterialButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    MaterialButton: _MaterialButton.default
  },
  inheritAttrs: false,
  methods: {
    handleClick: function handleClick() {
      this.$emit('buttonClick');
    }
  }
};
exports.default = _default;
        var $e86179 = exports.default || module.exports;
      
      if (typeof $e86179 === 'function') {
        $e86179 = $e86179.options;
      }
    
        /* template */
        Object.assign($e86179, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-element-option wptb-settings-items wptb-plugin-width-full"
    },
    [
      _c(
        "div",
        {
          staticClass:
            "wptb-settings-row wptb-settings-middle-xs wptb-justify-content-center"
        },
        [
          _c(
            "material-button",
            _vm._b(
              {
                staticClass: "wptb-panel-button-material",
                attrs: { click: _vm.handleClick }
              },
              "material-button",
              _vm.$attrs,
              false
            ),
            [_vm._t("default")],
            2
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"./MaterialButton":"components/MaterialButton.vue"}],"components/CsvSetupCsvPanelControls.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _PanelDropdownControl = _interopRequireDefault(require("./PanelDropdownControl"));

var _PanelButtonControl = _interopRequireDefault(require("./PanelButtonControl"));

var _withNativeTranslationStore = _interopRequireDefault(require("../mixins/withNativeTranslationStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  components: {
    PanelDropdownControl: _PanelDropdownControl.default,
    PanelButtonControl: _PanelButtonControl.default
  },
  mixins: [_withNativeTranslationStore.default],
  data: function data() {
    return {
      deLimiterOptions: {
        comma: this.translationM('commaDelimiter')
      }
    };
  },
  computed: _objectSpread({
    delimiter: {
      get: function get() {
        return this.$store.state.dataSource.setup.csv.controls.delimiter;
      },
      set: function set(n) {
        this.$store.commit('updateCsvDelimiter', n);
      }
    }
  }, (0, _vuex.mapGetters)(['isSetupDataImported'])),
  methods: _objectSpread({}, (0, _vuex.mapMutations)(['showDataManagerTabGroup']))
};
exports.default = _default;
        var $e98bc9 = exports.default || module.exports;
      
      if (typeof $e98bc9 === 'function') {
        $e98bc9 = $e98bc9.options;
      }
    
        /* template */
        Object.assign($e98bc9, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "fragment",
    [
      _c("panel-dropdown-control", {
        attrs: {
          label: _vm._f("cap")(_vm.translationM("csvDelimiter")),
          options: _vm.deLimiterOptions
        },
        model: {
          value: _vm.delimiter,
          callback: function($$v) {
            _vm.delimiter = $$v
          },
          expression: "delimiter"
        }
      }),
      _vm._v(" "),
      !_vm.isSetupDataImported
        ? _c(
            "panel-button-control",
            {
              on: {
                buttonClick: function($event) {
                  return _vm.showDataManagerTabGroup("csv")
                }
              }
            },
            [_vm._v(_vm._s(_vm._f("cap")(_vm.translationM("createYourData"))))]
          )
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","./PanelDropdownControl":"components/PanelDropdownControl.vue","./PanelButtonControl":"components/PanelButtonControl.vue","../mixins/withNativeTranslationStore":"mixins/withNativeTranslationStore.js"}],"components/PanelSectionGroupTabbedImproved.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _withStoreBusy = _interopRequireDefault(require("../mixins/withStoreBusy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    header: {
      type: String,
      default: 'Tab Header'
    },
    // tabs object, keys for tab ids, values for translated tab names
    tabs: {
      type: Object,
      default: function _default() {
        return {
          default: 'Default'
        };
      }
    },
    // id of currentTab
    currentTab: {
      type: String
    }
  },
  model: {
    prop: 'currentTab',
    event: 'tabClicked'
  },
  mixins: [_withStoreBusy.default],
  methods: {
    // decide if the tab is active based on current active tab property
    isActiveTab: function isActiveTab(tabId) {
      return this.currentTab === tabId;
    },
    handleTabClick: function handleTabClick(tabId) {
      this.$emit('tabClicked', tabId);
    }
  }
};
exports.default = _default;
        var $ff16e1 = exports.default || module.exports;
      
      if (typeof $ff16e1 === 'function') {
        $ff16e1 = $ff16e1.options;
      }
    
        /* template */
        Object.assign($ff16e1, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-section-group-tabbed wptb-plugin-box-shadow-md wptb-plugin-width-full"
    },
    [
      _c(
        "div",
        { staticClass: "wptb-panel-toggle wptb-section-group-tabbed-header" },
        [_c("div", { staticClass: "header" }, [_vm._v(_vm._s(_vm.header))])]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "wptb-section-group-tabbed-tabs-buttons" },
        _vm._l(_vm.tabs, function(name, id) {
          return _c(
            "div",
            {
              key: id,
              staticClass: "wptb-settings-section-item static-active",
              class: {
                active: _vm.isActiveTab(id),
                disabled: !_vm.isActiveTab(id),
                broken: _vm.isBusy
              },
              on: {
                "!click": function($event) {
                  $event.preventDefault()
                  return _vm.handleTabClick(id)
                }
              }
            },
            [_vm._v("\n\t\t\t" + _vm._s(name) + "\n\t\t")]
          )
        }),
        0
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "wptb-section-group-tab-content" },
        [_vm._t("default", null, { currentTab: _vm.currentTab })],
        2
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/withStoreBusy":"mixins/withStoreBusy.js"}],"components/PanelSectionGroupTabbedItem.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
var _default = {
  props: {
    activeId: {
      type: String,
      default: 'default'
    },
    id: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    isActive: function isActive() {
      return this.id === this.activeId;
    }
  }
};
exports.default = _default;
        var $3f93bd = exports.default || module.exports;
      
      if (typeof $3f93bd === 'function') {
        $3f93bd = $3f93bd.options;
      }
    
        /* template */
        Object.assign($3f93bd, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [_vm.isActive ? _vm._t("default") : _vm._e()], 2)
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/DataManagerLeftPanel.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _PanelSectionGroupTabbedItem = _interopRequireDefault(require("./PanelSectionGroupTabbedItem"));

var _PanelToggleControl = _interopRequireDefault(require("./PanelToggleControl"));

var _withNativeTranslationStore = _interopRequireDefault(require("../mixins/withNativeTranslationStore"));

var _withStoreBusy = _interopRequireDefault(require("../mixins/withStoreBusy"));

var _PanelButtonControl = _interopRequireDefault(require("./PanelButtonControl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  components: {
    PanelButtonControl: _PanelButtonControl.default,
    PanelToggleControl: _PanelToggleControl.default,
    PanelSectionGroupTabbedItem: _PanelSectionGroupTabbedItem.default
  },
  mixins: [_withNativeTranslationStore.default, _withStoreBusy.default],
  props: {
    currentTab: {
      type: String,
      default: 'default'
    }
  },
  computed: _objectSpread({
    firstRowAsColumnName: {
      get: function get() {
        return this.getDataManagerControls.firstRowAsColumnName;
      },
      set: function set(n) {
        this.setDataManagerControl({
          key: 'firstRowAsColumnName',
          value: n
        });
      }
    },
    rowForNamesVisibility: function rowForNamesVisibility() {
      var _this$getSelectOperat = this.getSelectOperationData,
          active = _this$getSelectOperat.active,
          callerId = _this$getSelectOperat.callerId;
      return !active && callerId !== 'selectRowForNames';
    }
  }, (0, _vuex.mapGetters)(['getDataManagerControls', 'parseCellId', 'getSelectOperationData'])),
  methods: _objectSpread({}, (0, _vuex.mapMutations)(['setDataManagerControl']), {}, (0, _vuex.mapActions)(['startRowSelectOperation', 'cancelRowSelectOperation']), {
    selectRowForNames: function selectRowForNames() {
      var _this = this;

      this.startRowSelectOperation('selectRowForNames').then(function (formedId) {
        if (formedId) {
          var _this$parseCellId = _this.parseCellId(formedId),
              rowId = _this$parseCellId.rowId;

          _this.setDataManagerControl({
            key: 'indexRow',
            value: rowId
          }); // turn of first row as column name control if a row is selected as index


          if (rowId !== null) {
            _this.setDataManagerControl({
              key: 'firstRowAsColumnName',
              value: false
            });
          }
        }
      });
    }
  })
};
exports.default = _default;
        var $b4a27f = exports.default || module.exports;
      
      if (typeof $b4a27f === 'function') {
        $b4a27f = $b4a27f.options;
      }
    
        /* template */
        Object.assign($b4a27f, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "PanelSectionGroupTabbedItem",
    { attrs: { "active-id": _vm.currentTab, id: "dataManager" } },
    [
      _c(
        "fragment",
        [
          _c("panel-toggle-control", {
            attrs: {
              disabled: _vm.isBusy,
              label: _vm._f("cap")(_vm.translationM("firstRowHeader"))
            },
            model: {
              value: _vm.firstRowAsColumnName,
              callback: function($$v) {
                _vm.firstRowAsColumnName = $$v
              },
              expression: "firstRowAsColumnName"
            }
          }),
          _vm._v(" "),
          _vm.rowForNamesVisibility
            ? _c(
                "panel-button-control",
                {
                  attrs: { disabled: _vm.isBusy },
                  on: { buttonClick: _vm.selectRowForNames }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(
                        _vm._f("cap")(_vm.translationM("selectRowForNames"))
                      ) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          !_vm.rowForNamesVisibility
            ? _c(
                "panel-button-control",
                {
                  attrs: { type: "danger" },
                  on: { buttonClick: _vm.cancelRowSelectOperation }
                },
                [
                  _vm._v(
                    "\n\t\t\t" +
                      _vm._s(_vm._f("cap")(_vm.translationM("cancel"))) +
                      "\n\t\t"
                  )
                ]
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","./PanelSectionGroupTabbedItem":"components/PanelSectionGroupTabbedItem.vue","./PanelToggleControl":"components/PanelToggleControl.vue","../mixins/withNativeTranslationStore":"mixins/withNativeTranslationStore.js","../mixins/withStoreBusy":"mixins/withStoreBusy.js","./PanelButtonControl":"components/PanelButtonControl.vue"}],"components/CsvSetupLeftPanel.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _CsvSetupCsvPanelControls = _interopRequireDefault(require("./CsvSetupCsvPanelControls"));

var _DataTableLeftPanel = _interopRequireDefault(require("./DataTableLeftPanel"));

var _PanelSectionGroupTabbedImproved = _interopRequireDefault(require("./PanelSectionGroupTabbedImproved"));

var _PanelSectionGroupTabbedItem = _interopRequireDefault(require("./PanelSectionGroupTabbedItem"));

var _withNativeTranslationStore = _interopRequireDefault(require("../mixins/withNativeTranslationStore"));

var _DataManagerLeftPanel = _interopRequireDefault(require("./DataManagerLeftPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'CsvSetupLeftPanel',
  props: {
    panelTabs: {
      type: Object,
      default: function _default() {
        return {
          default: 'default'
        };
      }
    }
  },
  mixins: [_withNativeTranslationStore.default],
  components: {
    DataManagerLeftPanel: _DataManagerLeftPanel.default,
    CsvSetupCsvPanelControls: _CsvSetupCsvPanelControls.default,
    DataTableLeftPanel: _DataTableLeftPanel.default,
    PanelSectionGroupTabbedImproved: _PanelSectionGroupTabbedImproved.default,
    PanelSectionGroupTabbedItem: _PanelSectionGroupTabbedItem.default
  },
  computed: _objectSpread({
    activeControlTab: {
      get: function get() {
        return this.currentSetupGroupTab('csv');
      },
      set: function set(n) {
        this.setActiveControlTabGroup({
          sourceId: 'csv',
          tabId: n
        });
      }
    }
  }, (0, _vuex.mapGetters)(['currentSetupGroupTab'])),
  methods: _objectSpread({}, (0, _vuex.mapMutations)(['setActiveControlTabGroup']))
};
exports.default = _default;
        var $ea5707 = exports.default || module.exports;
      
      if (typeof $ea5707 === 'function') {
        $ea5707 = $ea5707.options;
      }
    
        /* template */
        Object.assign($ea5707, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "data-table-left-panel",
    [
      _c("panel-section-group-tabbed-improved", {
        attrs: {
          header: _vm.translationM("csvControlHeader"),
          tabs: _vm.panelTabs
        },
        scopedSlots: _vm._u([
          {
            key: "default",
            fn: function(ref) {
              var currentTab = ref.currentTab
              return [
                _c(
                  "panel-section-group-tabbed-item",
                  { attrs: { "active-id": currentTab, id: "csv" } },
                  [_c("csv-setup-csv-panel-controls")],
                  1
                ),
                _vm._v(" "),
                _c("data-manager-left-panel", {
                  attrs: { "current-tab": currentTab }
                })
              ]
            }
          }
        ]),
        model: {
          value: _vm.activeControlTab,
          callback: function($$v) {
            _vm.activeControlTab = $$v
          },
          expression: "activeControlTab"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","./CsvSetupCsvPanelControls":"components/CsvSetupCsvPanelControls.vue","./DataTableLeftPanel":"components/DataTableLeftPanel.vue","./PanelSectionGroupTabbedImproved":"components/PanelSectionGroupTabbedImproved.vue","./PanelSectionGroupTabbedItem":"components/PanelSectionGroupTabbedItem.vue","../mixins/withNativeTranslationStore":"mixins/withNativeTranslationStore.js","./DataManagerLeftPanel":"components/DataManagerLeftPanel.vue"}],"components/DragDrop.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: ['texts', 'file', 'allowedFormats'],
  model: {
    prop: 'file',
    event: 'fileChanged'
  },
  data: function data() {
    return {
      dragActive: false,
      currentFile: null
    };
  },
  mounted: function mounted() {
    this.currentFile = this.file;
  },
  watch: {
    currentFile: function currentFile(n) {
      this.$emit('fileChanged', n);
    },
    file: function file(n) {
      this.currentFile = n;
    }
  },
  computed: {
    eventClass: function eventClass() {
      return this.dragActive ? 'dragenter' : '';
    }
  },
  methods: {
    handleDrop: function handleDrop(event) {
      this.dragActive = true;
      var dt = event.dataTransfer;

      if (dt.files[0]) {
        if (this.isTypeAllowed(dt.files[0])) {
          var _dt$files = _slicedToArray(dt.files, 1);

          this.currentFile = _dt$files[0];
        }
      }

      this.dragActive = false;
    },
    isTypeAllowed: function isTypeAllowed(fileName) {
      var extension = fileName.name.split('.').pop();
      return this.allowedFormats.includes(extension);
    },
    openFileSelect: function openFileSelect() {
      this.$refs.fileSelect.click();
    },
    handleFileSelect: function handleFileSelect(e) {
      if (e.target.files.length > 0 && this.isTypeAllowed(e.target.files[0])) {
        var _e$target$files = _slicedToArray(e.target.files, 1);

        this.currentFile = _e$target$files[0];
      }
    },
    clearCurrentFile: function clearCurrentFile() {
      this.currentFile = null;
    }
  }
};
exports.default = _default;
        var $74ec03 = exports.default || module.exports;
      
      if (typeof $74ec03 === 'function') {
        $74ec03 = $74ec03.options;
      }
    
        /* template */
        Object.assign($74ec03, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "wptb-menu-file-drop",
      class: _vm.eventClass,
      on: {
        dragenter: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
          _vm.dragActive = true
        },
        dragleave: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
          _vm.dragActive = false
        },
        drop: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
          return _vm.handleDrop($event)
        },
        dragover: function($event) {
          $event.stopPropagation()
          $event.preventDefault()
          _vm.dragActive = true
        }
      }
    },
    [
      _c("transition", { attrs: { name: "wptb-fade", mode: "out-in" } }, [
        _vm.dragActive
          ? _c("div", { key: "fileLogo", staticClass: "file-icon" }, [
              _c("span", {
                staticClass: "dashicons dashicons-media-spreadsheet"
              })
            ])
          : _c(
              "div",
              { key: "controls" },
              [
                _c(
                  "transition",
                  { attrs: { name: "wptb-fade", mode: "out-in" } },
                  [
                    _vm.currentFile === null
                      ? _c(
                          "div",
                          {
                            key: "selection",
                            staticClass:
                              "wptb-flex wptb-flex-col wptb-flex-align-center"
                          },
                          [
                            _c("div", { staticClass: "hint" }, [
                              _vm._v(_vm._s(_vm.texts.hint))
                            ]),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "supported wptb-text-transform-none"
                              },
                              [
                                _vm._v(
                                  "(" +
                                    _vm._s(_vm.allowedFormats.join(", ")) +
                                    ")"
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", [
                              _c(
                                "a",
                                {
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      return _vm.openFileSelect($event)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.texts.browse))]
                              ),
                              _vm._v(" "),
                              _c("input", {
                                ref: "fileSelect",
                                staticStyle: { display: "none" },
                                attrs: { type: "file" },
                                on: { change: _vm.handleFileSelect }
                              })
                            ])
                          ]
                        )
                      : _c(
                          "div",
                          {
                            key: "selected",
                            staticClass:
                              "wptb-flex wptb-flex-col wptb-flex-align-center"
                          },
                          [
                            _c("div", { staticClass: "file" }, [
                              _vm._v(_vm._s(_vm.currentFile.name))
                            ]),
                            _vm._v(" "),
                            _c("div", [
                              _c(
                                "a",
                                {
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      return _vm.clearCurrentFile($event)
                                    }
                                  }
                                },
                                [_vm._v(_vm._s(_vm.texts.clear))]
                              )
                            ])
                          ]
                        )
                  ]
                )
              ],
              1
            )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"components/StoreMaterialButton.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _MaterialButton = _interopRequireDefault(require("./MaterialButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  components: {
    MaterialButton: _MaterialButton.default
  },
  methods: {
    buttonClicked: function buttonClicked() {
      this.$emit('buttonClicked');
    }
  },
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['busyStatus']))
};
exports.default = _default;
        var $b90273 = exports.default || module.exports;
      
      if (typeof $b90273 === 'function') {
        $b90273 = $b90273.options;
      }
    
        /* template */
        Object.assign($b90273, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "material-button",
    _vm._b(
      {
        staticClass: "wptb-panel-button-material",
        attrs: { disabled: _vm.busyStatus, click: function() {} },
        on: { buttonClicked: _vm.buttonClicked }
      },
      "material-button",
      _vm.$attrs,
      false
    ),
    [_vm._t("default")],
    2
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","./MaterialButton":"components/MaterialButton.vue"}],"components/DataManagerCell.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _withStoreBusy = _interopRequireDefault(require("../mixins/withStoreBusy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    value: {
      type: null,
      default: 0
    },
    placeHolder: {
      type: String,
      default: 'enter data'
    },
    selectionEnabled: {
      type: Boolean,
      default: false
    },
    rowId: {
      type: String,
      default: ''
    },
    colId: {
      type: String,
      default: ''
    }
  },
  mixins: [_withStoreBusy.default],
  computed: {
    id: function id() {
      return "".concat(this.rowId, "-").concat(this.colId);
    }
  },
  methods: {
    handleHover: function handleHover() {
      if (this.selectionEnabled) {
        this.$emit('cellHover', this.rowId, this.colId);
      }
    },
    handleClick: function handleClick() {
      if (this.selectionEnabled) {
        this.$emit('cellClick', this.id);
      }
    }
  }
};
exports.default = _default;
        var $8ae122 = exports.default || module.exports;
      
      if (typeof $8ae122 === 'function') {
        $8ae122 = $8ae122.options;
      }
    
        /* template */
        Object.assign($8ae122, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "td",
    {
      staticClass: "wptb-data-manager-table-data-value",
      attrs: { id: _vm.id }
    },
    [
      _c(
        "div",
        {
          on: {
            mouseenter: _vm.handleHover,
            "!click": function($event) {
              $event.preventDefault()
              return _vm.handleClick($event)
            }
          }
        },
        [
          _c("input", {
            staticClass: "wptb-data-manager-cell-input",
            attrs: {
              disabled: _vm.isBusy,
              placeholder: _vm.placeHolder,
              type: "text"
            },
            domProps: { value: _vm.value }
          })
        ]
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../mixins/withStoreBusy":"mixins/withStoreBusy.js"}],"components/DataManagerSelect.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  data: function data() {
    return {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
  },
  watch: {
    'getSelectOperationData.hoverId': {
      handler: function handler(n) {
        if (n !== null) {
          var _this$parseCellId = this.parseCellId(n),
              rowId = _this$parseCellId.rowId,
              colId = _this$parseCellId.colId;

          var targetRow = document.getElementById("".concat(rowId));

          if (targetRow) {
            var _targetRow$getBoundin = targetRow.getBoundingClientRect(),
                width = _targetRow$getBoundin.width,
                height = _targetRow$getBoundin.height,
                x = _targetRow$getBoundin.x,
                y = _targetRow$getBoundin.y;

            this.width = width;
            this.height = height;
            this.left = x;
            this.top = y;
          }
        }
      }
    }
  },
  computed: _objectSpread({
    visibility: function visibility() {
      var _this$getSelectOperat = this.getSelectOperationData,
          active = _this$getSelectOperat.active,
          hoverId = _this$getSelectOperat.hoverId;
      return active && hoverId !== null;
    },
    style: function style() {
      return {
        left: "".concat(this.left, "px"),
        top: "".concat(this.top, "px"),
        width: "".concat(this.width, "px"),
        height: "".concat(this.height, "px")
      };
    }
  }, (0, _vuex.mapGetters)(['getSelectOperationData', 'parseCellId']))
};
exports.default = _default;
        var $52f7f9 = exports.default || module.exports;
      
      if (typeof $52f7f9 === 'function') {
        $52f7f9 = $52f7f9.options;
      }
    
        /* template */
        Object.assign($52f7f9, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    directives: [
      {
        name: "show",
        rawName: "v-show",
        value: _vm.visibility,
        expression: "visibility"
      }
    ],
    ref: "main",
    staticClass: "wptb-data-manager-select wptb-repeating-linear-gradient",
    style: _vm.style
  })
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js"}],"components/DataManager.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _DataManagerCell = _interopRequireDefault(require("./DataManagerCell"));

var _DataManagerSelect = _interopRequireDefault(require("./DataManagerSelect"));

var _withNativeTranslationStore = _interopRequireDefault(require("../mixins/withNativeTranslationStore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  props: {
    useTemp: {
      type: Boolean,
      default: true
    }
  },
  components: {
    DataManagerCell: _DataManagerCell.default,
    DataManagerSelect: _DataManagerSelect.default
  },
  mixins: [_withNativeTranslationStore.default],
  data: function data() {
    return {
      table: {
        header: [],
        values: []
      },
      columnNameRowIndex: null
    };
  },
  created: function created() {
    this.addDataManagerTempData([['', '', ''], ['', '', '']]);
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.calculateColumnNameRowIndex(_this.getDataManagerControls.firstRowAsColumnName);
    });
  },
  watch: {
    getDataManagerTempData: {
      handler: function handler(n) {
        this.prepareTableValues(n);
      },
      deep: true
    },
    'getDataManagerControls.firstRowAsColumnName': {
      handler: function handler(n) {
        this.calculateColumnNameRowIndex(n);
      }
    },
    getDataManagerControls: {
      handler: function handler() {
        this.prepareTableValues(this.getDataManagerTempData);
      },
      deep: true
    }
  },
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['getDataManagerTempData', 'getDataManagerControls', 'getDataManagerRowId', 'getColCount', 'isDataSelectionActive', 'getSelectOperationData']), {
    infoRowSpan: function infoRowSpan() {
      var _this$table$header$, _this$table$header$$v;

      return this.getColCount === 0 ? (_this$table$header$ = this.table.header[0]) === null || _this$table$header$ === void 0 ? void 0 : (_this$table$header$$v = _this$table$header$.values) === null || _this$table$header$$v === void 0 ? void 0 : _this$table$header$$v.length : this.getColCount;
    }
  }),
  methods: _objectSpread({
    handleCellClick: function handleCellClick(id) {
      if (this.getSelectOperationData.active) {
        this.setSelectId(id);
      }
    },
    handleCellHover: function handleCellHover(id) {
      if (this.getSelectOperationData.active) {
        this.setHoverId(id);
      }
    },
    calculateColumnNameRowIndex: function calculateColumnNameRowIndex(n) {
      if (n) {
        this.setDataManagerControl({
          key: 'indexRow',
          value: this.getDataManagerRowId(0)
        });
      }
    },
    generateEmptyRow: function generateEmptyRow(colCount) {
      var rowId = this.generateUniqueId()();
      var rowObject = {
        rowId: rowId,
        values: []
      };

      for (var i = 0; i < colCount; i += 1) {
        rowObject.values.push({
          colId: this.generateUniqueId()(),
          value: ''
        });
      }

      return rowObject;
    },
    prepareTableValues: function prepareTableValues(tableValue) {
      if (tableValue.length > 0) {
        var _this$getDataManagerC = this.getDataManagerControls,
            firstRowAsColumnName = _this$getDataManagerC.firstRowAsColumnName,
            indexRow = _this$getDataManagerC.indexRow; // recalculate first row index for column names

        this.calculateColumnNameRowIndex(firstRowAsColumnName);
        var header = tableValue.find(function (row) {
          return row.rowId === indexRow;
        });

        if (!header) {
          header = this.generateEmptyRow(this.getColCount);
        } // find column index row


        this.table.header = [header]; // filter out column index row

        this.table.values = tableValue.filter(function (t) {
          return t.rowId !== indexRow;
        });
      }
    },
    cellKey: function cellKey(rowId, colId) {
      return "".concat(rowId, "-").concat(colId);
    }
  }, (0, _vuex.mapGetters)(['generateUniqueId']), {}, (0, _vuex.mapActions)(['addDataManagerTempData']), {}, (0, _vuex.mapMutations)(['setSelectId', 'setHoverId', 'setDataManagerControl']))
};
exports.default = _default;
        var $6edceb = exports.default || module.exports;
      
      if (typeof $6edceb === 'function') {
        $6edceb = $6edceb.options;
      }
    
        /* template */
        Object.assign($6edceb, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wptb-plugin-width-full wptb-plugin-height-full" },
    [
      _c(
        "div",
        {
          staticClass: "wptb-data-manager-table",
          attrs: { "data-select": _vm.isDataSelectionActive }
        },
        [
          _c("table", [
            _c(
              "thead",
              [
                _c(
                  "tr",
                  { staticClass: "wptb-data-manager-table-column-name-info" },
                  [
                    _c("th", { attrs: { colspan: _vm.infoRowSpan } }, [
                      _vm._v(_vm._s(_vm.translationM("columnNames")))
                    ])
                  ]
                ),
                _vm._v(" "),
                _vm._l(_vm.table.header, function(headerRow) {
                  return _c(
                    "tr",
                    { key: headerRow.rowId, attrs: { id: headerRow.rowId } },
                    _vm._l(headerRow.values, function(headerCell) {
                      return _c("data-manager-cell", {
                        key: _vm.cellKey(headerRow.rowId, headerCell.colId),
                        attrs: {
                          "place-holder": _vm.translationM("columnName"),
                          value: headerCell.value,
                          "row-id": headerRow.rowId,
                          "col-id": headerCell.colId
                        }
                      })
                    }),
                    1
                  )
                }),
                _vm._v(" "),
                _c(
                  "tr",
                  { staticClass: "wptb-data-manager-table-column-name-info" },
                  [
                    _c("th", { attrs: { colspan: _vm.infoRowSpan } }, [
                      _vm._v(_vm._s(_vm.translationM("values")))
                    ])
                  ]
                )
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "tbody",
              _vm._l(_vm.table.values, function(valueRows) {
                return _c(
                  "tr",
                  { key: valueRows.rowId, attrs: { id: valueRows.rowId } },
                  _vm._l(valueRows.values, function(cell) {
                    return _c("data-manager-cell", {
                      key: _vm.cellKey(valueRows.rowId, cell.colId),
                      attrs: {
                        "place-holder": _vm.translationM("value"),
                        value: cell.value,
                        "row-id": valueRows.rowId,
                        "col-id": cell.colId,
                        "selection-enabled": true
                      },
                      on: {
                        cellClick: _vm.handleCellClick,
                        cellHover: _vm.handleCellHover
                      }
                    })
                  }),
                  1
                )
              }),
              0
            )
          ]),
          _vm._v(" "),
          _c("data-manager-select"),
          _vm._v(" "),
          _c("div", { staticClass: "wptb-repeating-linear-gradient" })
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","./DataManagerCell":"components/DataManagerCell.vue","./DataManagerSelect":"components/DataManagerSelect.vue","../mixins/withNativeTranslationStore":"mixins/withNativeTranslationStore.js"}],"components/CsvSetupBuilderView.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _DragDrop = _interopRequireDefault(require("./DragDrop"));

var _withNativeTranslationStore = _interopRequireDefault(require("../mixins/withNativeTranslationStore"));

var _StoreMaterialButton = _interopRequireDefault(require("./StoreMaterialButton"));

var _DataManager = _interopRequireDefault(require("./DataManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  name: 'CsvSetupBuilderView',
  props: {
    currentFile: {}
  },
  model: {
    prop: 'currentFile',
    event: 'fileSelected'
  },
  components: {
    StoreMaterialButton: _StoreMaterialButton.default,
    DragDrop: _DragDrop.default,
    DataManager: _DataManager.default
  },
  mixins: [_withNativeTranslationStore.default],
  data: function data() {
    return {
      innerFile: this.currentFile
    };
  },
  watch: {
    innerFile: function innerFile(n) {
      this.$emit('fileSelected', n);
    }
  },
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['currentSetupGroupTab'])),
  methods: {
    handleCsvImport: function handleCsvImport() {
      this.$emit('csvImport');
    }
  }
};
exports.default = _default;
        var $db31ef = exports.default || module.exports;
      
      if (typeof $db31ef === 'function') {
        $db31ef = $db31ef.options;
      }
    
        /* template */
        Object.assign($db31ef, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "wptb-plugin-height-full wptb-plugin-width-full" },
    [
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.currentSetupGroupTab("csv") === "csv",
              expression: "currentSetupGroupTab('csv') === 'csv'"
            }
          ],
          staticClass:
            "wptb-plugin-height-full wptb-plugin-width-full wptb-flex wptb-flex-justify-center wptb-flex-align-center wptb-flex-col"
        },
        [
          _c("drag-drop", {
            attrs: {
              texts: {
                hint: _vm.translationM("dragDropHint"),
                browse: _vm.translationM("browse"),
                clear: _vm.translationM("clear")
              },
              "allowed-formats": ["csv"]
            },
            model: {
              value: _vm.innerFile,
              callback: function($$v) {
                _vm.innerFile = $$v
              },
              expression: "innerFile"
            }
          }),
          _vm._v(" "),
          _c(
            "transition",
            { attrs: { name: "wptb-fade" } },
            [
              _c(
                "store-material-button",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.currentFile !== null,
                      expression: "currentFile !== null"
                    }
                  ],
                  on: { buttonClicked: _vm.handleCsvImport }
                },
                [
                  _vm._v(
                    _vm._s(_vm._f("cap")(_vm.translationM("import"))) +
                      "\n\t\t\t"
                  )
                ]
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("data-manager", {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.currentSetupGroupTab("csv") === "dataManager",
            expression: "currentSetupGroupTab('csv') === 'dataManager'"
          }
        ],
        key: "dataManager"
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","./DragDrop":"components/DragDrop.vue","../mixins/withNativeTranslationStore":"mixins/withNativeTranslationStore.js","./StoreMaterialButton":"components/StoreMaterialButton.vue","./DataManager":"components/DataManager.vue"}],"components/CsvSetup.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _withNativeTranslationStore = _interopRequireDefault(require("../mixins/withNativeTranslationStore"));

var _CsvSetupLeftPanel = _interopRequireDefault(require("./CsvSetupLeftPanel"));

var _CsvSetupBuilderView = _interopRequireDefault(require("./CsvSetupBuilderView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  components: {
    CsvSetupBuilderView: _CsvSetupBuilderView.default,
    CsvSetupLeftPanel: _CsvSetupLeftPanel.default
  },
  mixins: [_withNativeTranslationStore.default],
  data: function data() {
    return {
      panelTabs: {
        csv: this.translationM('csvTitle'),
        dataManager: this.translationM('dataManager')
      },
      currentFile: null
    };
  },
  mounted: function mounted() {
    // TODO [erdembircan] remove for production
    this.setSetupSourceId('csv');
  },
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['getSetupControls'])),
  methods: _objectSpread({
    readCsvFile: function readCsvFile() {
      var _this = this;

      if (FileReader && this.currentFile) {
        var csvReader = new FileReader(); // csv reader load event listener

        csvReader.addEventListener('load', function (e) {
          var fileContent = e.target.result; // read contents of file line by line

          var lines = fileContent.split(/[\r\n]+/g); // decide delimiter value

          var _this$getSetupControl = _this.getSetupControls('csv'),
              delimiterId = _this$getSetupControl.delimiter;

          var delimiter = ',';

          switch (delimiterId) {
            case 'comma':
              {
                delimiter = ',';
                break;
              }

            default:
              {
                delimiter = ',';
                break;
              }
          }

          var csvData = lines.reduce(function (carry, item) {
            // split individual cell data with defined delimiter
            var splitData = item.split(delimiter);
            carry.push(splitData);
            return carry;
          }, []); // set csv data to temp data manager

          _this.addDataManagerTempData(csvData); // show data manager setup


          _this.setActiveTabGroupForCurrentSource('dataManager');

          _this.setBusy(false);
        }); // csv reader error event listener

        csvReader.addEventListener('error', function (e) {
          _this.setBusy(false);
        }); // start reading file

        this.setBusy(true);
        csvReader.readAsText(this.currentFile);
      }
    }
  }, (0, _vuex.mapMutations)(['setBusy', 'setSetupSourceId']), {}, (0, _vuex.mapActions)(['addDataManagerTempData', 'setActiveTabGroupForCurrentSource']))
};
exports.default = _default;
        var $69ad22 = exports.default || module.exports;
      
      if (typeof $69ad22 === 'function') {
        $69ad22 = $69ad22.options;
      }
    
        /* template */
        Object.assign($69ad22, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "wptb-data-table-csv-setup wptb-plugin-width-full wptb-plugin-height-full"
    },
    [
      _c("CsvSetupLeftPanel", { attrs: { "panel-tabs": _vm.panelTabs } }),
      _vm._v(" "),
      _c("CsvSetupBuilderView", {
        on: { csvImport: _vm.readCsvFile },
        model: {
          value: _vm.currentFile,
          callback: function($$v) {
            _vm.currentFile = $$v
          },
          expression: "currentFile"
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","../mixins/withNativeTranslationStore":"mixins/withNativeTranslationStore.js","./CsvSetupLeftPanel":"components/CsvSetupLeftPanel.vue","./CsvSetupBuilderView":"components/CsvSetupBuilderView.vue"}],"components/DataScreenHandler.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _DataSourceSelection = _interopRequireDefault(require("./DataSourceSelection"));

var _CsvSetup = _interopRequireDefault(require("./CsvSetup"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  components: {
    DataSourceSelection: _DataSourceSelection.default,
    CsvSetup: _CsvSetup.default
  },
  computed: _objectSpread({}, (0, _vuex.mapGetters)(['currentScreen']))
};
exports.default = _default;
        var $544610 = exports.default || module.exports;
      
      if (typeof $544610 === 'function') {
        $544610 = $544610.options;
      }
    
        /* template */
        Object.assign($544610, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "transition",
    { attrs: { name: "wptb-fade", mode: "out-in" } },
    [_c(_vm.currentScreen, { tag: "component" })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","./DataSourceSelection":"components/DataSourceSelection.vue","./CsvSetup":"components/CsvSetup.vue"}],"containers/DataTableApp.vue":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = require("vuex");

var _DataScreenHandler = _interopRequireDefault(require("../components/DataScreenHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  props: {
    sectionName: {
      type: String,
      required: true
    },
    headerHeight: {
      type: Number,
      default: 0
    }
  },
  components: {
    DataScreenHandler: _DataScreenHandler.default
  },
  data: function data() {
    return {
      extraPadding: 0
    };
  },
  mounted: function mounted() {
    var _this = this;

    // change component visibility depending on section changes on builder
    document.addEventListener('wptbSectionChanged', function (_ref) {
      var detail = _ref.detail;

      _this.setComponentVisibility(detail === _this.sectionName);
    }); // change component visibility based on current active section

    this.setComponentVisibility(WPTB_Helper.getCurrentSection() === this.sectionName); // set startup screen
    // TODO [erdembircan] uncomment for production
    // this.setCurrentScreen('DataSourceSelection');
    // TODO [erdembircan] comment for production
    // TODO [erdembircan] dev tool for setting startup screen to work on specific modules on browser reloads

    this.setCurrentScreen(this.devStartupScreen);
  },
  methods: _objectSpread({}, (0, _vuex.mapActions)(['setComponentVisibility', 'setCurrentScreen'])),
  computed: _objectSpread({
    /**
     * Style for main app component.
     *
     * @return {Object} style
     */
    mainStyle: function mainStyle() {
      return {
        marginTop: "".concat(this.headerHeight + this.extraPadding, "px"),
        height: "calc( 100% - ".concat(this.headerHeight + this.extraPadding, "px)")
      };
    }
  }, (0, _vuex.mapGetters)(['isVisible']), {}, (0, _vuex.mapState)(['leftPanelId', 'devStartupScreen']))
};
exports.default = _default;
        var $d6e744 = exports.default || module.exports;
      
      if (typeof $d6e744 === 'function') {
        $d6e744 = $d6e744.options;
      }
    
        /* template */
        Object.assign($d6e744, (function () {
          var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("transition", { attrs: { name: "wptb-fade" } }, [
    _c(
      "div",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.isVisible,
            expression: "isVisible"
          }
        ],
        ref: "dataTableMain",
        staticClass: "wptb-data-table-main",
        style: _vm.mainStyle
      },
      [
        _c("data-screen-handler"),
        _vm._v(" "),
        _c(
          "mounting-portal",
          { attrs: { "mount-to": _vm.leftPanelId } },
          [_c("portal-target", { attrs: { name: "leftPanel" } })],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","../components/DataScreenHandler":"components/DataScreenHandler.vue"}],"stores/dataTables/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Data table state.
 *
 *
 *    - For source setup data
 *        Default source setup object should include these object properties to be in sync with the rest of the application
 *            - controls: left panel control values
 *            - controlGroupTab: active tabbed group id
 *
 * @type {Object}
 */
var selectId = {
  id: null,
  resolve: null
};
var clickIdHandler = {
  set: function set(obj, prop, val) {
    if (prop === 'resolve') {
      // eslint-disable-next-line no-param-reassign
      obj[prop] = val;
    } else {
      // eslint-disable-next-line no-param-reassign
      obj[prop] = val; // if resolve property is defined, call it with assigned value

      if (obj.resolve) {
        obj.resolve(val);
      }
    }

    return true;
  }
}; // proxy for clicked cell id of select operation

var clickIdProxy = new Proxy(selectId, clickIdHandler);
var state = {
  visibility: false,
  busy: false,
  screen: null,
  proEnabled: false,
  dataSource: {
    selected: null,
    card: {
      softSelectedId: null
    },
    setup: {
      sourceId: null,
      csv: {
        controls: {
          delimiter: 'comma'
        },
        controlGroupTab: 'dataManager'
      }
    }
  },
  dataManager: {
    tempData: {
      rowIds: [],
      colIds: [],
      values: [],
      colCount: 0,
      rowCount: 0
    },
    controls: {
      firstRowAsColumnName: true,
      indexRow: null
    },
    select: {
      callerId: null,
      active: false,
      hoverId: null,
      clickId: clickIdProxy,
      type: 'row'
    }
  },
  leftPanelId: '#dataTableLeftPanel',
  devStartupScreen: 'CsvSetup'
};
var _default = state;
exports.default = _default;
},{}],"stores/dataTables/mutations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-param-reassign */

/**
 * Data table mutations.
 *
 * @type {Object}
 */
var mutations = {
  /**
   * Set app visibility.
   *
   * @param {Object} state data table state
   * @param {boolean} visible visibility value
   */
  appVisibility: function appVisibility(state, visible) {
    state.visibility = visible;
  },

  /**
   * Set screen.
   *
   * @param {Object} state data table state
   * @param {string} screenName screen name
   */
  setScreen: function setScreen(state, screenName) {
    state.screen = screenName;
  },

  /**
   * Set soft selected source card id.
   *
   * @param {Object} state data table state
   * @param {string} sourceId source card id
   */
  setSoftSelected: function setSoftSelected(state, sourceId) {
    state.dataSource.card.softSelectedId = sourceId;
  },

  /**
   * Set  selected source id for source that will be initialized.
   *
   * @param {Object} state data table state
   * @param {string} sourceId source card id
   */
  setSetupSourceId: function setSetupSourceId(state, sourceId) {
    state.dataSource.setup.sourceId = sourceId;
  },

  /**
   * Set csv delimiter.
   *
   * @param {Object} state data table state
   * @param {string} delimiter csv delimiter
   */
  updateCsvDelimiter: function updateCsvDelimiter(state, delimiter) {
    state.dataSource.setup.csv.controls.delimiter = delimiter;
  },

  /**
   * Switch to data manaager tab and screen at any source setup.
   *
   * @param {Object} state data table state
   * @param {string} sourceId active source setup id
   */
  showDataManagerTabGroup: function showDataManagerTabGroup(state, sourceId) {
    state.dataSource.setup[sourceId].controlGroupTab = 'dataManager';
  },

  /**
   * Set active tab group for source setup.
   *
   * @param {Object} state data table state
   * @param {{sourceId, tabId}} payload
   */
  setActiveControlTabGroup: function setActiveControlTabGroup(state, _ref) {
    var sourceId = _ref.sourceId,
        tabId = _ref.tabId;
    state.dataSource.setup[sourceId].controlGroupTab = tabId;
  },

  /**
   * Set busy state of the app.
   *
   * @param {Object} state data table state
   * @param {boolean} busyStatus busy status
   */
  setBusy: function setBusy(state, busyStatus) {
    state.busy = busyStatus;
  },

  /**
   * Clear contents of temp data manager.
   *
   * @param {Object} state data table state
   */
  clearTempDataManager: function clearTempDataManager(state) {
    state.dataManager.tempData.values = [];
    state.dataManager.tempData.rowIds = [];
    state.dataManager.tempData.colIds = [];
  },

  /**
   * Replace current data in temp data manager with new one.
   *
   * @param {Object} state data table state
   * @param {Array} data data array
   */
  setDataManagerTempData: function setDataManagerTempData(state, data) {
    state.dataManager.tempData.values = data;
  },

  /**
   * Set control value for data manager.
   *
   * @param {Object} state data table state
   * @param {{key, value}} mutation payload
   */
  setDataManagerControl: function setDataManagerControl(state, _ref2) {
    var key = _ref2.key,
        value = _ref2.value;
    state.dataManager.controls[key] = value;
  },

  /**
   * Push a row id to data manager.
   *
   * @param {Object} state data table state
   * @param {string} id id to be pushed
   */
  pushDataManagerRowId: function pushDataManagerRowId(state, id) {
    state.dataManager.tempData.rowIds.push(id);
  },

  /**
   * Push a column id to data manager.
   *
   * @param {Object} state data table state
   * @param {string} id id to be pushed
   */
  pushDataManagerColId: function pushDataManagerColId(state, id) {
    state.dataManager.tempData.colIds.push(id);
  },

  /**
   * Set current row count.
   *
   * @param {Object} state data table state
   * @param {number} count count
   */
  setRowCount: function setRowCount(state, count) {
    state.dataManager.tempData.rowCount = count;
  },

  /**
   * Set current column count.
   *
   * @param {Object} state data table state
   * @param {number} count count
   */
  setColCount: function setColCount(state, count) {
    state.dataManager.tempData.colCount = count;
  },

  /**
   * Set status  for select operation.
   *
   * @param {Object} state data table state
   * @param {boolean} status status
   */
  setSelectStatus: function setSelectStatus(state, status) {
    state.dataManager.select.active = status;
  },

  /**
   * Reset select operation data.
   *
   * @param {Object} state data table state
   */
  resetSelectData: function resetSelectData(state) {
    state.dataManager.select.hoverId = null;
    state.dataManager.select.clickId.resolve = null;
    state.dataManager.select.clickId.id = null;
    state.dataManager.select.callerId = null;
  },

  /**
   * Set select operation type.
   * Available types are 'row' and 'col'.
   *
   * @param {Object} state data table state
   * @param {string} type type
   */
  setSelectionType: function setSelectionType(state, type) {
    state.dataManager.select.type = type;
  },

  /**
   * Set a resolve function to signal end for click operation.
   *
   * @param {Object} state data table state
   * @param {Function} resolve resolve function
   */
  setSelectIdResolve: function setSelectIdResolve(state, resolve) {
    state.dataManager.select.clickId.resolve = resolve;
  },

  /**
   * Set a unique id for the current select operation.
   *
   * @param {Object} state data table state
   * @param {string} callerId caller id
   */
  setSelectCallerId: function setSelectCallerId(state, callerId) {
    state.dataManager.select.callerId = callerId;
  },

  /**
   * Set store id of selected cell.
   *
   * @param {Object} state data table state
   * @param {string} id set id for selected cell
   */
  setSelectId: function setSelectId(state, id) {
    state.dataManager.select.clickId.id = id;
  },

  /**
   * Set store id of hovered cell.
   *
   * @param {Object} state data table state
   * @param {string} id set id for hovered cell
   */
  setHoverId: function setHoverId(state, id) {
    state.dataManager.select.hoverId = id;
  }
};
var _default = mutations;
exports.default = _default;
},{}],"stores/dataTables/actions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Data table store actions.
 *
 * @type {Object}
 */
var actions = {
  /**
   * Change DOM visibility of app.
   *
   * @param {Function} commit mutation commit function
   * @param {boolean} value visibility value
   */
  setComponentVisibility: function setComponentVisibility(_ref, value) {
    var commit = _ref.commit;
    commit('appVisibility', value);
  },

  /**
   * Change current screen.
   *
   * @param {Function} commit mutation commit function
   * @param {string} screenName screen name to assign as current
   */
  setCurrentScreen: function setCurrentScreen(_ref2, screenName) {
    var commit = _ref2.commit;
    commit('setScreen', screenName);
  },

  /**
   * Soft select a source card.
   *
   * @param {{commit}} mutation commit function
   * @param {string} sourceId selected source id
   */
  softSelectCard: function softSelectCard(_ref3, sourceId) {
    var commit = _ref3.commit;
    commit('setSoftSelected', sourceId);
  },

  /**
   * Start setup process for selected source type.
   *
   * For source setup to work, name your setup components as `SourceName`Setup where
   *`SourceName` being the id for that source.
   *
   * @param {{commit, dispatch}} mutation commit function
   * @param {string} sourceId selected source id
   */
  startSourceSetup: function startSourceSetup(_ref4, sourceId) {
    var commit = _ref4.commit,
        dispatch = _ref4.dispatch;
    // set source id
    commit('setSetupSourceId', sourceId); // clear temp data manager

    commit('clearTempDataManager'); // set screen

    var screenName = "".concat(sourceId[0].toUpperCase() + sourceId.slice(1), "Setup");
    dispatch('setCurrentScreen', screenName);
  },

  /**
   * Add temp data to data manager.
   *
   * @param {{commit, getters}} vuex store object
   * @param {Array} data data array
   */
  addDataManagerTempData: function addDataManagerTempData(_ref5, data) {
    var commit = _ref5.commit,
        getters = _ref5.getters;
    var confirmedData = Array.isArray(data) ? data : [];
    commit('clearTempDataManager'); // generate ids for rows
    // eslint-disable-next-line array-callback-return,no-unused-vars

    confirmedData.map(function (_) {
      commit('pushDataManagerRowId', getters.generateUniqueId());
    }); // find maximum amount of column numbers

    var maxCol = confirmedData.reduce(function (carry, current) {
      var currentLength = current.length;
      return Math.max(currentLength, carry);
    }, 0); // generate ids for columns

    for (var i = 0; i < maxCol; i += 1) {
      commit('pushDataManagerColId', getters.generateUniqueId());
    } // set maximum column amount


    commit('setColCount', maxCol); // set maximum row amount

    commit('setRowCount', confirmedData.length); // form data object

    var formedData = confirmedData.reduce(function (carry, item, index) {
      var rowObj = {
        rowId: getters.getDataManagerRowId(index),
        values: []
      }; // eslint-disable-next-line array-callback-return

      item.map(function (c, i) {
        rowObj.values.push({
          colId: getters.getDataManagerColId(i),
          value: c
        });
      });
      carry.push(rowObj);
      return carry;
    }, []);
    commit('setDataManagerTempData', formedData);
  },

  /**
   * Set tab of current active source setup.
   *
   * @param {{state,commit}} vuex store object
   * @param {string} tabId tab id to change to
   */
  setActiveTabGroupForCurrentSource: function setActiveTabGroupForCurrentSource(_ref6, tabId) {
    var state = _ref6.state,
        commit = _ref6.commit;
    commit('setActiveControlTabGroup', {
      sourceId: state.dataSource.setup.sourceId,
      tabId: tabId
    });
  },

  /**
   * Start select operation.
   *
   * @async
   * @param {{commit}} vuex store object
   * @param {string} callerId id of the component that started the operation
   * @return {Promise} Promise object
   */
  startRowSelectOperation: function startRowSelectOperation(_ref7, callerId) {
    var commit = _ref7.commit;
    // set app to busy
    commit('setBusy', true); // reset selection data

    commit('resetSelectData'); // enable row selection

    commit('setSelectionType', 'row'); // enable select operation

    commit('setSelectStatus', true); // set operation caller id

    commit('setSelectCallerId', callerId); // send back a promise object which will be resolved when click operation occurs

    return new Promise(function (res) {
      commit('setSelectIdResolve', function (val) {
        // end selection operation
        commit('setSelectStatus', false);
        commit('resetSelectData'); // set app to idle

        commit('setBusy', false);
        res(val);
      });
    });
  },
  cancelRowSelectOperation: function cancelRowSelectOperation(_ref8) {
    var state = _ref8.state,
        commit = _ref8.commit;
    commit('setSelectStatus', false);
    state.dataManager.select.clickId.resolve(null);
    commit('resetSelectData');
  }
};
var _default = actions;
exports.default = _default;
},{}],"stores/dataTables/getters.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Data table getter methods.
 *
 * @type {Object}
 */
var getters = {
  /**
   * Get visibility state.
   *
   * @param {Object} state store state
   * @return {boolean} visibility
   */
  isVisible: function isVisible(state) {
    return state.visibility;
  },

  /**
   * Get current screen of data table.
   *
   * @param {Object} state store state
   * @return {string} current screen
   */
  currentScreen: function currentScreen(state) {
    return state.screen;
  },

  /**
   * Get soft selected source card id.
   *
   * Soft selected card is the one that is selected but not confirmed.
   *
   * @param {Object} state store state
   * @return {string} soft selected card id
   */
  getSoftSelectedSourceCardId: function getSoftSelectedSourceCardId(state) {
    return state.dataSource.card.softSelectedId;
  },

  /**
   * Get pro version status of the plugin.
   *
   * @param {Object} state store state
   * @return {boolean} pro version status
   */
  getProStatus: function getProStatus(state) {
    return state.proEnabled;
  },

  /**
   * Get active tab group id for source setup
   *
   * @param {Object} state store state
   * @return {Function} function to get active setup group tab
   */
  currentSetupGroupTab: function currentSetupGroupTab(state) {
    return function (sourceId) {
      return state.dataSource.setup[sourceId].controlGroupTab;
    };
  },

  /**
   * Get active tab group id for source setup.
   *
   * @param {Object} state store state
   * @param {Object} getters getters
   * @return {boolean} source setup or not
   */
  // eslint-disable-next-line no-shadow
  isActiveScreenSourceSetup: function isActiveScreenSourceSetup(state, getters) {
    var currentScreen = getters.currentScreen;
    return currentScreen.match(/^(.+)Setup$/g);
  },

  /**
   * Get active tab group id for source setup.
   *
   * @param {Object} state store state
   * @return {boolean} app busy status
   */
  busyStatus: function busyStatus(state) {
    return state.busy;
  },

  /**
   * Whether any data source is imported on setup.
   *
   * @param {Object} state store state
   * @return {boolean} imported or not
   */
  isSetupDataImported: function isSetupDataImported(state) {
    return Array.isArray(state.dataManager.tempData) ? state.dataManager.tempData.values.length > 0 : false;
  },

  /**
   * Get current control values for given source
   *
   * @param {Object} state store state
   */
  getSetupControls: function getSetupControls(state) {
    return function (sourceId) {
      return state.dataSource.setup[sourceId].controls;
    };
  },

  /**
   * Get current control values of temp data manager.
   *
   * @param {Object} state store state
   * @return {Object} control values
   */
  getDataManagerControls: function getDataManagerControls(state) {
    return state.dataManager.controls;
  },

  /**
   * Get data values of temp data manager.
   *
   * @param {Object} state store state
   * @return {Array} temp data manager data
   */
  getDataManagerData: function getDataManagerData(state) {
    return state.dataManager.data;
  },

  /**
   * Get temp data values of data manager.
   *
   * @param {Object} state store state
   * @return {Array} temp data
   */
  getDataManagerTempData: function getDataManagerTempData(state) {
    return state.dataManager.tempData.values;
  },

  /**
   * Generate unique id.
   *
   * @return {Function} generate function
   */
  generateUniqueId: function generateUniqueId() {
    return function () {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      var variables = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5'];
      var key = '';

      for (var i = 0; i < length; i += 1) {
        key += variables[Math.floor(Math.random() * variables.length)];
      }

      return key;
    };
  },

  /**
   * Get data manager row id of a given index.
   *
   * @param {Object} state store state
   * @return {function(*): (*|0)} function that can be used with an argument
   */
  getDataManagerRowId: function getDataManagerRowId(state) {
    return function (index) {
      if (state.dataManager.tempData.rowIds[index]) {
        return state.dataManager.tempData.rowIds[index];
      }

      return null;
    };
  },

  /**
   * Get data manager column id of a given index.
   *
   * @param {Object} state store state
   * @return {function(*): (*|0)} function that can be used with an argument
   */
  getDataManagerColId: function getDataManagerColId(state) {
    return function (index) {
      if (state.dataManager.tempData.colIds[index]) {
        return state.dataManager.tempData.colIds[index];
      }

      return 0;
    };
  },

  /**
   * Get current column count.
   *
   * @param {Object} state data table state
   * @return {number} column count
   */
  getColCount: function getColCount(state) {
    return state.dataManager.tempData.colCount;
  },

  /**
   * Get data related to select operation.
   *
   * @param {Object} state store state
   * @return {Object} select operation related data
   */
  getSelectOperationData: function getSelectOperationData(state) {
    return state.dataManager.select;
  },

  /**
   * Is data selection active on data table manager.
   *
   * @param {Object} state store state
   * @return {boolean} active or not
   */
  isDataSelectionActive: function isDataSelectionActive(state) {
    return state.dataManager.select.active;
  },

  /**
   * Get row and column ids of a cell from a formed id.
   *
   * @return {function(*): {colId: *, rowId: *}} function that will be used to parse cell id
   */
  parseCellId: function parseCellId() {
    return function (formedId) {
      var _formedId$split = formedId.split('-'),
          _formedId$split2 = _slicedToArray(_formedId$split, 2),
          rowId = _formedId$split2[0],
          colId = _formedId$split2[1];

      return {
        rowId: rowId,
        colId: colId
      };
    };
  }
};
var _default = getters;
exports.default = _default;
},{}],"stores/dataTables/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vuex = _interopRequireDefault(require("vuex"));

var _vue = _interopRequireDefault(require("vue"));

var _state = _interopRequireDefault(require("./state"));

var _mutations = _interopRequireDefault(require("./mutations"));

var _actions = _interopRequireDefault(require("./actions"));

var _getters = _interopRequireDefault(require("./getters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// setup vuex for current vue instance
_vue.default.use(_vuex.default);
/**
 * Default store for data table.
 *
 * @type {Object}
 */


var storeOptions = {
  state: _state.default,
  mutations: _mutations.default,
  actions: _actions.default,
  getters: _getters.default,
  strict: false
};
/**
 * Deep merge object.
 *
 * @param {Object} source source object
 * @param {Object} target target object
 * @return {Object} merged object
 */

function objectDeepMerge(source, target) {
  // eslint-disable-next-line array-callback-return
  Object.keys(target).map(function (k) {
    if (Object.prototype.hasOwnProperty.call(target, k)) {
      if (Object.prototype.hasOwnProperty.call(source, k)) {
        if (_typeof(source[k]) === 'object') {
          // eslint-disable-next-line no-param-reassign
          source[k] = _objectSpread({}, source[k], {}, target[k]);
        } else {
          // eslint-disable-next-line no-param-reassign
          source[k] = target[k];
        }
      }
    }
  });
  return source;
}
/**
 * Create data table store.
 *
 * @param {Object} extraStoreOptions extra store options to be used
 * @return {Object} data table store
 */


var createStore = function createStore() {
  var extraStoreOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new _vuex.default.Store(objectDeepMerge(storeOptions, extraStoreOptions));
};

var _default = createStore;
exports.default = _default;
},{"vuex":"../../../../../node_modules/vuex/dist/vuex.esm.js","vue":"../../../../../node_modules/vue/dist/vue.esm.js","./state":"stores/dataTables/state.js","./mutations":"stores/dataTables/mutations.js","./actions":"stores/dataTables/actions.js","./getters":"stores/dataTables/getters.js"}],"mountPoints/WPTB_DataTable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueFragment = _interopRequireDefault(require("vue-fragment"));

var _i18n = require("@wordpress/i18n");

var _portalVue = _interopRequireDefault(require("portal-vue"));

var _DataTableApp = _interopRequireDefault(require("../containers/DataTableApp"));

var _dataTables = _interopRequireDefault(require("../stores/dataTables"));

var _filters = _interopRequireDefault(require("../plugins/filters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Data table menu.
 */
var _default = {
  name: 'DataTable',
  handler: function dataTableJS(uniqueId) {
    var data = WPTB_ControlsManager.getControlData('dataTableData'); // extra options for store

    var extraStoreOptions = {
      state: {
        icons: data.icons,
        strings: {
          dataSourceHeader: (0, _i18n.__)('Select your data source', 'wp-table-builder'),
          csvTitle: (0, _i18n.__)('CSV', 'wp-table-builder'),
          csvInfo: (0, _i18n.__)('Upload a CSV file or create your own data on the go.', 'wp-table-builder'),
          databaseTitle: (0, _i18n.__)('Database', 'wp-table-builder'),
          databaseInfo: (0, _i18n.__)('Select a local database table for your data.', 'wp-table-builder'),
          wordpressPostTitle: (0, _i18n.__)('WordPress Post', 'wp-table-builder'),
          wordpressPostInfo: (0, _i18n.__)('Query post data for your table including custom post types.', 'wp-table-builder'),
          remoteTitle: (0, _i18n.__)('remote', 'wp-table-builder'),
          remoteInfo: (0, _i18n.__)('Select a remote database for your data', 'wp-table-builder'),
          sourceSelectLeftPanelInfo: (0, _i18n.__)('Select your data source that will populate your table.', 'wp-table-builder'),
          csvSetupLeftPanelInfo: (0, _i18n.__)('Setup your CSV source, either from a file or start creating your own data with data editor.', 'wp-table-builder'),
          dataManager: (0, _i18n.__)('data manager', 'wp-table-builder'),
          csvControlHeader: (0, _i18n.__)('csv source', 'wp-table-builder'),
          csvDelimiter: (0, _i18n.__)('csv delimiter', 'wp-table-builder'),
          commaDelimiter: (0, _i18n.__)(', (comma)', 'wp-table-builder'),
          createYourData: (0, _i18n.__)('create your own data', 'wp-table-builder'),
          back: (0, _i18n.__)('Back', 'wp-table-builder'),
          continue: (0, _i18n.__)('Continue', 'wp-table-builder'),
          dragDropHint: (0, _i18n.__)('Drag and drop file', 'wp-table-builder'),
          browse: (0, _i18n.__)('browse', 'wp-table-builder'),
          clear: (0, _i18n.__)('clear', 'wp-table-builder'),
          import: (0, _i18n.__)('import', 'wp-table-builder'),
          firstRowHeader: (0, _i18n.__)('first row as column names', 'wp-table-builder'),
          columnNames: (0, _i18n.__)('column names', 'wp-table-builder'),
          columnName: (0, _i18n.__)('column name', 'wp-table-builder'),
          values: (0, _i18n.__)('values', 'wp-table-builder'),
          value: (0, _i18n.__)('value', 'wp-table-builder'),
          selectRowForNames: (0, _i18n.__)('select a row for column names', 'wp-table-builder'),
          cancel: (0, _i18n.__)('cancel', 'wp-table-builder')
        },
        proUrl: data.proUrl
      },
      getters: {
        /**
         * Get translated text from store.
         *
         * @param {Object} state store state
         * @return {Function} function to get translation
         */
        translation: function translation(state) {
          return function (key) {
            return state.strings[key];
          };
        },

        /**
         * Get icon from store.
         *
         * @param {Object} state store state
         * @return {Function} function to use to get icon from store
         */
        getIcon: function getIcon(state) {
          return function (iconId) {
            return state.icons[iconId];
          };
        }
      }
    }; // portal initialization for vue instance

    _vue.default.use(_portalVue.default); // fragment initialization


    _vue.default.use(_vueFragment.default.Plugin); // use default filters


    _vue.default.use(_filters.default);

    new _vue.default({
      components: {
        DataTableApp: _DataTableApp.default
      },
      data: data,
      store: (0, _dataTables.default)(extraStoreOptions),
      template: '<data-table-app section-name="data_table_menu" :header-height="headerHeight"></data-table-app>'
    }).$mount("#".concat(uniqueId));
  }
};
exports.default = _default;
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","vue-fragment":"../../../../../node_modules/vue-fragment/dist/vue-fragment.esm.js","@wordpress/i18n":"../../../../../node_modules/@wordpress/i18n/build-module/index.js","portal-vue":"../../../../../node_modules/portal-vue/dist/portal-vue.common.js","../containers/DataTableApp":"containers/DataTableApp.vue","../stores/dataTables":"stores/dataTables/index.js","../plugins/filters":"plugins/filters.js"}],"WPTB_BuilderControls.js":[function(require,module,exports) {

"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _WPTB_IconSelectControl = _interopRequireDefault(require("./mountPoints/WPTB_IconSelectControl"));

var _WPTB_RangeControl = _interopRequireDefault(require("./mountPoints/WPTB_RangeControl"));

var _WPTB_Select2Control = _interopRequireDefault(require("./mountPoints/WPTB_Select2Control"));

var _WPTB_MediaSelectControl = _interopRequireDefault(require("./mountPoints/WPTB_MediaSelectControl"));

var _WPTB_ControlsManager = _interopRequireDefault(require("./functions/WPTB_ControlsManager"));

var _WPTB_ResponsiveTable = _interopRequireDefault(require("./mountPoints/WPTB_ResponsiveTable"));

var _WPTB_SidesControl = _interopRequireDefault(require("./mountPoints/WPTB_SidesControl"));

var _WPTB_NamedToggleControl = _interopRequireDefault(require("./mountPoints/WPTB_NamedToggleControl"));

var _WPTB_TagControl = _interopRequireDefault(require("./mountPoints/WPTB_TagControl"));

var _WPTB_DifferentBorderControl = _interopRequireDefault(require("./mountPoints/WPTB_DifferentBorderControl"));

var _WPTB_LocalDevFileControl = _interopRequireDefault(require("./mountPoints/WPTB_LocalDevFileControl"));

var _WPTB_DataTable = _interopRequireDefault(require("./mountPoints/WPTB_DataTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */

/**
 * Main builder controls register entry point.
 *
 * This file is used to register defined builder controls to specified controls manager and let them be called by individual control elements dynamically. Instead of import/register the components automatically, explicitly specify the components that will be registered to keep track of them more easily.
 */
// turn off Vue production message at console
_vue.default.config.productionTip = false; // eslint-disable-next-line no-restricted-globals

var global = self || void 0; // adding controls manager to global space

global.WPTB_ControlsManager = _WPTB_ControlsManager.default;

_WPTB_ControlsManager.default.init();

var controls = [_WPTB_IconSelectControl.default, _WPTB_RangeControl.default, _WPTB_ControlsManager.default, _WPTB_Select2Control.default, _WPTB_MediaSelectControl.default, _WPTB_ResponsiveTable.default, _WPTB_SidesControl.default, _WPTB_NamedToggleControl.default, _WPTB_TagControl.default, _WPTB_DifferentBorderControl.default, _WPTB_LocalDevFileControl.default, _WPTB_DataTable.default];
/**
 * Register control element.
 *
 * @param {Object} controlObject control element object
 */

function registerControl(controlObject) {
  _WPTB_ControlsManager.default.addControlScript(controlObject.name, controlObject.handler);
}

controls.map(registerControl);
},{"vue":"../../../../../node_modules/vue/dist/vue.esm.js","./mountPoints/WPTB_IconSelectControl":"mountPoints/WPTB_IconSelectControl.js","./mountPoints/WPTB_RangeControl":"mountPoints/WPTB_RangeControl.js","./mountPoints/WPTB_Select2Control":"mountPoints/WPTB_Select2Control.js","./mountPoints/WPTB_MediaSelectControl":"mountPoints/WPTB_MediaSelectControl.js","./functions/WPTB_ControlsManager":"functions/WPTB_ControlsManager.js","./mountPoints/WPTB_ResponsiveTable":"mountPoints/WPTB_ResponsiveTable.js","./mountPoints/WPTB_SidesControl":"mountPoints/WPTB_SidesControl.js","./mountPoints/WPTB_NamedToggleControl":"mountPoints/WPTB_NamedToggleControl.js","./mountPoints/WPTB_TagControl":"mountPoints/WPTB_TagControl.js","./mountPoints/WPTB_DifferentBorderControl":"mountPoints/WPTB_DifferentBorderControl.js","./mountPoints/WPTB_LocalDevFileControl":"mountPoints/WPTB_LocalDevFileControl.js","./mountPoints/WPTB_DataTable":"mountPoints/WPTB_DataTable.js"}]},{},["WPTB_BuilderControls.js"], null)
//# sourceMappingURL=/WPTB_BuilderControls.js.map