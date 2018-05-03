"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = require("./src/Component");
var store_1 = require("./src/store");
var utils_1 = require("./src/utils");
exports.createApp = utils_1.createApp;
var attributeExceptions = [
    "role",
];
function appendText(el, text) {
    var textNode = document.createTextNode(text);
    el.appendChild(textNode);
}
function appendArray(el, children) {
    children.forEach(function (child) {
        if (Array.isArray(child)) {
            appendArray(el, child);
        }
        else if (child instanceof window.Element) {
            el.appendChild(child);
        }
        else if (typeof child === "string") {
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
        }
        else {
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
    }
    else if (textOrPropsOrChild instanceof window.Element) {
        el.appendChild(textOrPropsOrChild);
    }
    else if (typeof textOrPropsOrChild === "string") {
        appendText(el, textOrPropsOrChild);
    }
    else if (typeof textOrPropsOrChild === "object") {
        Object.keys(textOrPropsOrChild).forEach(function (propName) {
            if (propName in el || attributeExceptions.includes(propName)) {
                var value = textOrPropsOrChild[propName];
                if (propName === "style") {
                    setStyles(el, value);
                }
                else if (value) {
                    el[propName] = value;
                }
            }
            else {
                console.warn(propName + " is not a valid property of a <" + type + ">");
            }
        });
    }
    if (otherChildren)
        appendArray(el, otherChildren);
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