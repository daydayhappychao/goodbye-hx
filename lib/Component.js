"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("./store");
var index_1 = require("./index");
var BaseGoodByeHx = /** @class */ (function () {
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
    BaseGoodByeHx.prototype.render = function (newData) { return index_1.el('div'); };
    BaseGoodByeHx.prototype.update = function (prevEl, newData) {
        var nextEl = this.render(newData);
        if (nextEl.isEqualNode(prevEl)) {
            console.warn("render() was called but there was no change in the rendered output", this.element);
        }
        else {
            prevEl.parentElement.replaceChild(nextEl, prevEl);
        }
        return nextEl;
    };
    ;
    return BaseGoodByeHx;
}());
exports.default = BaseGoodByeHx;
//# sourceMappingURL=Component.js.map