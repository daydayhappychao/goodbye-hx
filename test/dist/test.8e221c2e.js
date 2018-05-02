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
})({4:[function(require,module,exports) {
"use strict";

exports.__esModule = true;
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
                if (newState[key] !== _this.state[key]) {
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
    }
    return Store;
}();
exports.Store = Store;
var oriStore = new Store();
exports["default"] = oriStore;
exports.state = oriStore._state;
},{}],3:[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
    var el = document.createElement(type);
    if (Array.isArray(textOrPropsOrChild)) {
        appendArray(el, textOrPropsOrChild);
    } else if (textOrPropsOrChild instanceof window.Element) {
        el.appendChild(textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === "string") {
        appendText(el, textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === "object") {
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

    for (var _len = arguments.length, otherChildren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        otherChildren[_key - 2] = arguments[_key];
    }

    if (otherChildren) appendArray(el, otherChildren);

    return el;
}

var el = exports.el = function el(elementName) {
    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
    }

    return makeElement.apply(undefined, [elementName].concat(args));
};
// export const button = (...args) => makeElement(`button`, ...args);
// export const div = (...args) => makeElement(`div`, ...args);
// export const h1 = (...args) => makeElement(`h1`, ...args);
// export const header = (...args) => makeElement(`header`, ...args);
// export const p = (...args) => makeElement(`p`, ...args);
// export const span = (...args) => makeElement(`span`, ...args);
},{}],2:[function(require,module,exports) {
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
exports.__esModule = true;
var store_1 = __importDefault(require("../src/store"));
var index_1 = require("../index");
store_1["default"].init({ title: '很高兴遇见你' });
console.log(store_1["default"].state);
console.log(store_1.state);
// const store = new Store({ title: '很高兴遇见你', content: '测试一下', button: '按钮没按' });
// let state = store.state;
var BaseGoodByeHx = /** @class */function () {
    function BaseGoodByeHx(id, fields) {
        var _this = this;
        this.id = id;
        this.fields = fields;
        this.render = this.render.bind(this);
        this.el = this.render();
        store_1["default"].listen(this.id, this.fields, function (newData) {
            _this.el = _this.update(_this.el, newData);
        });
    }
    BaseGoodByeHx.prototype.render = function (newData) {
        return index_1.el('div');
    };
    BaseGoodByeHx.prototype.update = function (prevEl, newData) {
        var nextEl = this.render(newData);
        if (nextEl.isEqualNode(prevEl)) {
            console.warn("render() was called but there was no change in the rendered output", this.el);
        } else {
            prevEl.parentElement.replaceChild(nextEl, prevEl);
        }
        return nextEl;
    };
    ;
    return BaseGoodByeHx;
}();
var App = /** @class */function (_super) {
    __extends(App, _super);
    function App(props) {
        return _super.call(this, 'app', ['content', 'title']) || this;
    }
    App.prototype.render = function () {
        return index_1.el('div', { style: { color: 'red' } }, index_1.el('h1', store_1.state.title), index_1.el('h1', {
            onclick: function onclick() {
                store_1["default"].dispatch(Object.assign({}, store_1.state, { button: '按钮按了' }));
            }
        }, store_1.state.content), new Button({}).el);
    };
    return App;
}(BaseGoodByeHx);
var Button = /** @class */function (_super) {
    __extends(Button, _super);
    function Button(props) {
        return _super.call(this, 'button', ['button']) || this;
    }
    Button.prototype.clickHandle = function () {
        console.log(12);
        store_1["default"].dispatch(Object.assign({}, store_1.state, { title: '按钮没按' + Math.random().toString() }));
    };
    Button.prototype.render = function () {
        return index_1.el('button', {
            onclick: this.clickHandle
        }, store_1.state.button);
    };
    return Button;
}(BaseGoodByeHx);
document.getElementById('app').innerHTML = '';
document.getElementById('app').appendChild(new App({}).el);
},{"../src/store":4,"../index":3}],13:[function(require,module,exports) {

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
  var hostname = undefined || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '49964' + '/');
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