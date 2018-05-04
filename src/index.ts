import Component from './Component'
import _store, { getState as _getState } from './store'
export { createApp } from './utils'

const attributeExceptions = [
    `role`,
];

function appendText(el, text) {
    const textNode = document.createTextNode(text);
    el.appendChild(textNode);
}

function appendArray(el, children) {
    children.forEach((child) => {
        if (Array.isArray(child)) {
            appendArray(el, child);
        } else if (child instanceof window.Element) {
            el.appendChild(child);
        } else if (typeof child === `string`) {
            appendText(el, child);
        }
    });
}

function setStyles(el, styles) {
    if (!styles) {
        el.removeAttribute(`styles`);
        return;
    }

    Object.keys(styles).forEach((styleName) => {
        if (styleName in el.style) {
            el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
        } else {
            console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
        }
    });
}

function makeElement(type, textOrPropsOrChild?, ...otherChildren) {
    const el = document.createElement(type);
    if (Array.isArray(textOrPropsOrChild)) {
        appendArray(el, textOrPropsOrChild);
    } else if (textOrPropsOrChild instanceof window.Element) {
        el.appendChild(textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === `string`) {
        appendText(el, textOrPropsOrChild);
    } else if (typeof textOrPropsOrChild === `object`) {
        Object.keys(textOrPropsOrChild).forEach((propName) => {
            if (propName in el || attributeExceptions.indexOf(propName) !== -1) {
                const value = textOrPropsOrChild[propName];

                if (propName === `style`) {
                    setStyles(el, value);
                } else if (value) {
                    el[propName] = value;
                }
            } else {
                console.warn(`${propName} is not a valid property of a <${type}>`);
            }
        });
    }

    if (otherChildren) appendArray(el, otherChildren);
    return el;
}

export const el = (elementName, ...args) => makeElement(elementName, ...args)
export default Component
export const store = _store
export const getState = _getState