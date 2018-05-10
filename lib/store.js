"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var deepEql = require("deep-eql");
var Store = /** @class */ (function () {
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
                if (newState[key] !== null && !deepEql(newState[key], _this.state[key])) {
                    _this.state[key] = newState[key];
                    for (var listenerKey in _this.listener) {
                        if (_this.listener[listenerKey].fields.indexOf(key) !== -1) {
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
}());
var oriStore = new Store();
exports.default = oriStore;
exports.getState = oriStore.getState;
//# sourceMappingURL=store.js.map