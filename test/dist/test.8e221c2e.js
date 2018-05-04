// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
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

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({12:[function(require,module,exports) {
var global = (1,eval)("this");
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.typeDetect = factory();
})(this, function () {
  'use strict';

  /* !
   * type-detect
   * Copyright(c) 2013 jake luer <jake@alogicalparadox.com>
   * MIT Licensed
   */

  var promiseExists = typeof Promise === 'function';

  /* eslint-disable no-undef */
  var globalObject = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' ? self : global; // eslint-disable-line id-blacklist

  var symbolExists = typeof Symbol !== 'undefined';
  var mapExists = typeof Map !== 'undefined';
  var setExists = typeof Set !== 'undefined';
  var weakMapExists = typeof WeakMap !== 'undefined';
  var weakSetExists = typeof WeakSet !== 'undefined';
  var dataViewExists = typeof DataView !== 'undefined';
  var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
  var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
  var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
  var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
  var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
  var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
  var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
  var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
  var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
  var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
  var toStringLeftSliceLength = 8;
  var toStringRightSliceLength = -1;
  /**
   * ### typeOf (obj)
   *
   * Uses `Object.prototype.toString` to determine the type of an object,
   * normalising behaviour across engine versions & well optimised.
   *
   * @param {Mixed} object
   * @return {String} object type
   * @api public
   */
  function typeDetect(obj) {
    /* ! Speed optimisation
     * Pre:
     *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
     *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
     *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
     *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
     *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
     * Post:
     *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
     *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
     *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
     *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
     *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
     */
    var typeofObj = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    if (typeofObj !== 'object') {
      return typeofObj;
    }

    /* ! Speed optimisation
     * Pre:
     *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
     * Post:
     *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
     */
    if (obj === null) {
      return 'null';
    }

    /* ! Spec Conformance
     * Test: `Object.prototype.toString.call(window)``
     *  - Node === "[object global]"
     *  - Chrome === "[object global]"
     *  - Firefox === "[object Window]"
     *  - PhantomJS === "[object Window]"
     *  - Safari === "[object Window]"
     *  - IE 11 === "[object Window]"
     *  - IE Edge === "[object Window]"
     * Test: `Object.prototype.toString.call(this)``
     *  - Chrome Worker === "[object global]"
     *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
     *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
     *  - IE 11 Worker === "[object WorkerGlobalScope]"
     *  - IE Edge Worker === "[object WorkerGlobalScope]"
     */
    if (obj === globalObject) {
      return 'global';
    }

    /* ! Speed optimisation
     * Pre:
     *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
     * Post:
     *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
     */
    if (Array.isArray(obj) && (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))) {
      return 'Array';
    }

    // Not caching existence of `window` and related properties due to potential
    // for `window` to be unset before tests in quasi-browser environments.
    if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window !== null) {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/browsers.html#location)
       * WhatWG HTML$7.7.3 - The `Location` interface
       * Test: `Object.prototype.toString.call(window.location)``
       *  - IE <=11 === "[object Object]"
       *  - IE Edge <=13 === "[object Object]"
       */
      if (_typeof(window.location) === 'object' && obj === window.location) {
        return 'Location';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#document)
       * WhatWG HTML$3.1.1 - The `Document` object
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       *       WhatWG HTML states:
       *         > For historical reasons, Window objects must also have a
       *         > writable, configurable, non-enumerable property named
       *         > HTMLDocument whose value is the Document interface object.
       * Test: `Object.prototype.toString.call(document)``
       *  - Chrome === "[object HTMLDocument]"
       *  - Firefox === "[object HTMLDocument]"
       *  - Safari === "[object HTMLDocument]"
       *  - IE <=10 === "[object Document]"
       *  - IE 11 === "[object HTMLDocument]"
       *  - IE Edge <=13 === "[object HTMLDocument]"
       */
      if (_typeof(window.document) === 'object' && obj === window.document) {
        return 'Document';
      }

      if (_typeof(window.navigator) === 'object') {
        /* ! Spec Conformance
         * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
         * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
         * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
         *  - IE <=10 === "[object MSMimeTypesCollection]"
         */
        if (_typeof(window.navigator.mimeTypes) === 'object' && obj === window.navigator.mimeTypes) {
          return 'MimeTypeArray';
        }

        /* ! Spec Conformance
         * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
         * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
         * Test: `Object.prototype.toString.call(navigator.plugins)``
         *  - IE <=10 === "[object MSPluginsCollection]"
         */
        if (_typeof(window.navigator.plugins) === 'object' && obj === window.navigator.plugins) {
          return 'PluginArray';
        }
      }

      if ((typeof window.HTMLElement === 'function' || _typeof(window.HTMLElement) === 'object') && obj instanceof window.HTMLElement) {
        /* ! Spec Conformance
        * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
        * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
        * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
        *  - IE <=10 === "[object HTMLBlockElement]"
        */
        if (obj.tagName === 'BLOCKQUOTE') {
          return 'HTMLQuoteElement';
        }

        /* ! Spec Conformance
         * (https://html.spec.whatwg.org/#htmltabledatacellelement)
         * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
         * Note: Most browsers currently adher to the W3C DOM Level 2 spec
         *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
         *       which suggests that browsers should use HTMLTableCellElement for
         *       both TD and TH elements. WhatWG separates these.
         * Test: Object.prototype.toString.call(document.createElement('td'))
         *  - Chrome === "[object HTMLTableCellElement]"
         *  - Firefox === "[object HTMLTableCellElement]"
         *  - Safari === "[object HTMLTableCellElement]"
         */
        if (obj.tagName === 'TD') {
          return 'HTMLTableDataCellElement';
        }

        /* ! Spec Conformance
         * (https://html.spec.whatwg.org/#htmltableheadercellelement)
         * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
         * Note: Most browsers currently adher to the W3C DOM Level 2 spec
         *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
         *       which suggests that browsers should use HTMLTableCellElement for
         *       both TD and TH elements. WhatWG separates these.
         * Test: Object.prototype.toString.call(document.createElement('th'))
         *  - Chrome === "[object HTMLTableCellElement]"
         *  - Firefox === "[object HTMLTableCellElement]"
         *  - Safari === "[object HTMLTableCellElement]"
         */
        if (obj.tagName === 'TH') {
          return 'HTMLTableHeaderCellElement';
        }
      }
    }

    /* ! Speed optimisation
    * Pre:
    *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
    *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
    *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
    *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
    *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
    *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
    *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
    *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
    *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
    * Post:
    *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
    *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
    *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
    *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
    *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
    *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
    *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
    *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
    *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
    */
    var stringTag = symbolToStringTagExists && obj[Symbol.toStringTag];
    if (typeof stringTag === 'string') {
      return stringTag;
    }

    var objPrototype = Object.getPrototypeOf(obj);
    /* ! Speed optimisation
    * Pre:
    *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
    *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
    * Post:
    *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
    *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
    */
    if (objPrototype === RegExp.prototype) {
      return 'RegExp';
    }

    /* ! Speed optimisation
    * Pre:
    *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
    * Post:
    *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
    */
    if (objPrototype === Date.prototype) {
      return 'Date';
    }

    /* ! Spec Conformance
     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
     * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
     * Test: `Object.prototype.toString.call(Promise.resolve())``
     *  - Chrome <=47 === "[object Object]"
     *  - Edge <=20 === "[object Object]"
     *  - Firefox 29-Latest === "[object Promise]"
     *  - Safari 7.1-Latest === "[object Promise]"
     */
    if (promiseExists && objPrototype === Promise.prototype) {
      return 'Promise';
    }

    /* ! Speed optimisation
    * Pre:
    *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
    * Post:
    *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
    */
    if (setExists && objPrototype === Set.prototype) {
      return 'Set';
    }

    /* ! Speed optimisation
    * Pre:
    *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
    * Post:
    *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
    */
    if (mapExists && objPrototype === Map.prototype) {
      return 'Map';
    }

    /* ! Speed optimisation
    * Pre:
    *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
    * Post:
    *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
    */
    if (weakSetExists && objPrototype === WeakSet.prototype) {
      return 'WeakSet';
    }

    /* ! Speed optimisation
    * Pre:
    *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
    * Post:
    *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
    */
    if (weakMapExists && objPrototype === WeakMap.prototype) {
      return 'WeakMap';
    }

    /* ! Spec Conformance
     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
     * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
     * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
     *  - Edge <=13 === "[object Object]"
     */
    if (dataViewExists && objPrototype === DataView.prototype) {
      return 'DataView';
    }

    /* ! Spec Conformance
     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
     * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
     * Test: `Object.prototype.toString.call(new Map().entries())``
     *  - Edge <=13 === "[object Object]"
     */
    if (mapExists && objPrototype === mapIteratorPrototype) {
      return 'Map Iterator';
    }

    /* ! Spec Conformance
     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
     * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
     * Test: `Object.prototype.toString.call(new Set().entries())``
     *  - Edge <=13 === "[object Object]"
     */
    if (setExists && objPrototype === setIteratorPrototype) {
      return 'Set Iterator';
    }

    /* ! Spec Conformance
     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
     * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
     * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
     *  - Edge <=13 === "[object Object]"
     */
    if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
      return 'Array Iterator';
    }

    /* ! Spec Conformance
     * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
     * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
     * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
     *  - Edge <=13 === "[object Object]"
     */
    if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
      return 'String Iterator';
    }

    /* ! Speed optimisation
    * Pre:
    *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
    * Post:
    *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
    */
    if (objPrototype === null) {
      return 'Object';
    }

    return Object.prototype.toString.call(obj).slice(toStringLeftSliceLength, toStringRightSliceLength);
  }

  return typeDetect;
});
},{}],11:[function(require,module,exports) {
'use strict';
/* globals Symbol: false, Uint8Array: false, WeakMap: false */
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var type = require('type-detect');
function FakeMap() {
  this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}

FakeMap.prototype = {
  get: function getMap(key) {
    return key[this._key];
  },
  set: function setMap(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this._key, {
        value: value,
        configurable: true
      });
    }
  }
};

var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return null;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result === 'boolean') {
      return result;
    }
  }
  return null;
}

/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    leftHandMap.set(rightHandOperand, result);
  } else {
    leftHandMap = new MemoizeMap();
    leftHandMap.set(rightHandOperand, result);
    memoizeMap.set(leftHandOperand, leftHandMap);
  }
}

/*!
 * Primary Export
 */

module.exports = deepEqual;
module.exports.MemoizeMap = MemoizeMap;

/**
 * Assert deeply nested sameValue equality between two objects of any type.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
 */
function deepEqual(leftHandOperand, rightHandOperand, options) {
  // If we have a comparator, we can't assume anything; so bail to its check first.
  if (options && options.comparator) {
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }

  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  if (simpleResult !== null) {
    return simpleResult;
  }

  // Deeper comparisons are pushed through to a larger function
  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}

/**
 * Many comparisons can be canceled out early via simple equality or primitive checks.
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @return {Boolean|null} equal match
 */
function simpleEqual(leftHandOperand, rightHandOperand) {
  // Equal references (except for Numbers) can be returned early
  if (leftHandOperand === rightHandOperand) {
    // Handle +-0 cases
    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
  }

  // handle NaN cases
  if (leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
  rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
  ) {
      return true;
    }

  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
  // strings, and undefined, can be compared by reference.
  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    // Easy out b/c it would have passed the first equality check
    return false;
  }
  return null;
}

/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {};
  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator;

  // Check if a memoized result exists.
  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) {
    return memoizeResultLeft;
  }
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) {
    return memoizeResultRight;
  }

  // If a comparator is present, use it.
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    // Comparators may return null, in which case we want to go back to default behavior.
    if (comparatorResult === false || comparatorResult === true) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
      return comparatorResult;
    }
    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
    // what to do, we need to make sure to return the basic tests first before we move on.
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      // Don't memoize this, it takes longer to set/retrieve than to just compare.
      return simpleResult;
    }
  }

  var leftHandType = type(leftHandOperand);
  if (leftHandType !== type(rightHandOperand)) {
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
    return false;
  }

  // Temporarily set the operands in the memoize object to prevent blowing the stack
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);

  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
  return result;
}

function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Date':
      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case 'Promise':
    case 'Symbol':
    case 'function':
    case 'WeakMap':
    case 'WeakSet':
    case 'Error':
      return leftHandOperand === rightHandOperand;
    case 'Arguments':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Array':
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case 'RegExp':
      return regexpEqual(leftHandOperand, rightHandOperand);
    case 'Generator':
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case 'DataView':
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case 'ArrayBuffer':
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case 'Set':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case 'Map':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}

/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */

function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}

/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function entriesEqual(leftHandOperand, rightHandOperand, options) {
  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
  if (leftHandOperand.size !== rightHandOperand.size) {
    return false;
  }
  if (leftHandOperand.size === 0) {
    return true;
  }
  var leftHandItems = [];
  var rightHandItems = [];
  leftHandOperand.forEach(function gatherEntries(key, value) {
    leftHandItems.push([key, value]);
  });
  rightHandOperand.forEach(function gatherEntries(key, value) {
    rightHandItems.push([key, value]);
  });
  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}

/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) {
    return false;
  }
  if (length === 0) {
    return true;
  }
  var index = -1;
  while (++index < length) {
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}

/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */
function hasIteratorFunction(target) {
  return typeof Symbol !== 'undefined' && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && typeof Symbol.iterator !== 'undefined' && typeof target[Symbol.iterator] === 'function';
}

/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) {
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {
      return [];
    }
  }
  return [];
}

/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */
function getGeneratorEntries(generator) {
  var generatorResult = generator.next();
  var accumulator = [generatorResult.value];
  while (generatorResult.done === false) {
    generatorResult = generator.next();
    accumulator.push(generatorResult.value);
  }
  return accumulator;
}

/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */
function getEnumerableKeys(target) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return keys;
}

/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
  var length = keys.length;
  if (length === 0) {
    return true;
  }
  for (var i = 0; i < length; i += 1) {
    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand);
  var rightHandKeys = getEnumerableKeys(rightHandOperand);
  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
    leftHandKeys.sort();
    rightHandKeys.sort();
    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
      return false;
    }
    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  }

  var leftHandEntries = getIteratorEntries(leftHandOperand);
  var rightHandEntries = getIteratorEntries(rightHandOperand);
  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
    leftHandEntries.sort();
    rightHandEntries.sort();
    return iterableEqual(leftHandEntries, rightHandEntries, options);
  }

  if (leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0) {
    return true;
  }

  return false;
}

/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */
function isPrimitive(value) {
  return value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object';
}
},{"type-detect":12}],6:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var deepEql = require("deep-eql");
var Store = /** @class */function () {
    function Store(initState) {
        var _this = this;
        this.state = {};
        this.listener = {};
        this.init = function (initState) {
            _this.state = initState;
        };
        this.listen = function (id, fields, callback) {
            _this.listener[id] = {
                fields: fields,
                callback: callback
            };
        };
        this.dispatch = function (newState) {
            var ids = [];
            for (var key in _this.state) {
                if (!deepEql(newState[key], _this.state[key])) {
                    _this.state[key] = newState[key];
                    for (var listenerKey in _this.listener) {
                        if (_this.listener[listenerKey].fields.includes(key)) {
                            ids.push(listenerKey);
                        }
                    }
                }
            }
            ;
            // ids = [...new Set(ids)];
            ids.forEach(function (listenerKey) {
                this.listener[listenerKey].callback(this.state);
            }, _this);
        };
        if (initState) {
            this.state = initState;
        }
        this.getState = this.getState.bind(this);
    }
    Store.prototype.getState = function () {
        return this.state;
    };
    return Store;
}();
var oriStore = new Store();
exports.default = oriStore;
exports.getState = oriStore.getState;
//# sourceMappingURL=store.js.map
},{"deep-eql":11}],5:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
var index_1 = require("./index");
var BaseGoodByeHx = /** @class */function () {
    function BaseGoodByeHx(id, fields) {
        var _this = this;
        this.id = id;
        this.fields = fields;
        this.render = this.render.bind(this);
        this.element = this.render();
        store_1.default.listen(this.id, this.fields, function (newData) {
            _this.element = _this.update(_this.element, newData);
        });
    }
    BaseGoodByeHx.prototype.render = function (newData) {
        return index_1.el('div');
    };
    BaseGoodByeHx.prototype.update = function (prevEl, newData) {
        var nextEl = this.render(newData);
        if (nextEl.isEqualNode(prevEl)) {
            console.warn("render() was called but there was no change in the rendered output", this.element);
        } else {
            prevEl.parentElement.replaceChild(nextEl, prevEl);
        }
        return nextEl;
    };
    ;
    return BaseGoodByeHx;
}();
exports.default = BaseGoodByeHx;
//# sourceMappingURL=Component.js.map
},{"./store":6,"./index":3}],7:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createApp(id, App) {
    document.getElementById(id).innerHTML = '';
    document.getElementById(id).appendChild(new App({}).element);
}
exports.createApp = createApp;
//# sourceMappingURL=utils.js.map
},{}],3:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./Component");
var store_1 = require("./store");
var utils_1 = require("./utils");
exports.createApp = utils_1.createApp;
var attributeExceptions = ["role"];
function appendText(el, text) {
    var textNode = document.createTextNode(text);
    el.appendChild(textNode);
}
function appendArray(el, children) {
    children.forEach(function (child) {
        if (Array.isArray(child)) {
            appendArray(el, child);
        } else if (child instanceof window.Element) {
            el.appendChild(child);
        } else if (typeof child === "string") {
            appendText(el, child);
        }
    });
}
function setStyles(el, styles) {
    if (!styles) {
        el.removeAttribute("styles");
        return;
    }
    Object.keys(styles).forEach(function (styleName) {
        if (styleName in el.style) {
            el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
        } else {
            console.warn(styleName + " is not a valid style for a <" + el.tagName.toLowerCase() + ">");
        }
    });
}
function makeElement(type, textOrPropsOrChild) {
    var otherChildren = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        otherChildren[_i - 2] = arguments[_i];
    }
    var el = document.createElement(type);
    if (Array.isArray(textOrPropsOrChild)) {
        appendArray(el, textOrPropsOrChild);
    } else if (textOrPropsOrChild instanceof window.Element) {
        el.appendChild(textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === "string") {
        appendText(el, textOrPropsOrChild);
    } else if ((typeof textOrPropsOrChild === "undefined" ? "undefined" : _typeof(textOrPropsOrChild)) === "object") {
        Object.keys(textOrPropsOrChild).forEach(function (propName) {
            if (propName in el || attributeExceptions.includes(propName)) {
                var value = textOrPropsOrChild[propName];
                if (propName === "style") {
                    setStyles(el, value);
                } else if (value) {
                    el[propName] = value;
                }
            } else {
                console.warn(propName + " is not a valid property of a <" + type + ">");
            }
        });
    }
    if (otherChildren) appendArray(el, otherChildren);
    return el;
}
exports.el = function (elementName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return makeElement.apply(void 0, [elementName].concat(args));
};
exports.default = Component_1.default;
exports.store = store_1.default;
exports.getState = store_1.getState;
//# sourceMappingURL=index.js.map
},{"./Component":5,"./store":6,"./utils":7}],2:[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("../lib/index"));
index_1.store.init({ title: '很高兴遇见你', content: '测试一下', button: '按钮没按' });
var App = /** @class */function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, 'app', ['content', 'title']) || this;
    }
    App.prototype.render = function () {
        return index_1.el('div', { style: { color: 'red' } }, index_1.el('h1', index_1.getState().title), index_1.el('h1', {
            onclick: function onclick() {
                index_1.store.dispatch(Object.assign({}, index_1.getState(), { button: '按钮按了' }));
            }
        }, index_1.getState().content), new Button({}).element);
    };
    return App;
}(index_1.default);
var Button = /** @class */function (_super) {
    __extends(Button, _super);
    function Button(props) {
        return _super.call(this, 'button', ['button']) || this;
    }
    Button.prototype.clickHandle = function () {
        index_1.store.dispatch(Object.assign({}, index_1.getState(), { title: '按钮没按' + Math.random().toString() }));
    };
    Button.prototype.render = function () {
        return index_1.el('button', {
            onclick: this.clickHandle
        }, index_1.getState().button);
    };
    return Button;
}(index_1.default);
index_1.createApp('app', App);
},{"../lib/index":3}],13:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '60683' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[13,2])
//# sourceMappingURL=/test.8e221c2e.map