import store, { state } from '../src/store'
import { el } from '../index'

store.init({ title: '很高兴遇见你'})
console.log(store.state)
console.log(state)
// const store = new Store({ title: '很高兴遇见你', content: '测试一下', button: '按钮没按' });
// let state = store.state;
class BaseGoodByeHx {
    constructor(id, fields) {
        this.id = id
        this.fields = fields
        this.render = this.render.bind(this)
        this.el = this.render();
        store.listen(this.id, this.fields, (newData) => {
            this.el = this.update(this.el, newData);
        });
    }
    id: string
    fields: string[] | undefined[]
    el: Element | any
    render(newData?) { return el('div') }
    update(prevEl, newData) {
        const nextEl = this.render(newData);
        if (nextEl.isEqualNode(prevEl)) {
            console.warn(`render() was called but there was no change in the rendered output`, this.el);
        } else {
            prevEl.parentElement.replaceChild(nextEl, prevEl);
        }
        return nextEl;
    };
}

class App extends BaseGoodByeHx {
    constructor(props) {
        super('app', ['content', 'title']);
    }
    render() {
        return el('div',
            { style: { color: 'red' } },
            el('h1', state.title),
            el('h1', {
                onclick: () => {
                    store.dispatch(Object.assign({}, state, { button: '按钮按了' }))
                }
            }, state.content),
            (new Button({})).el
        )
    }
}
class Button extends BaseGoodByeHx {
    constructor(props) {
        super('button', ['button']);
    }
    clickHandle() {
        console.log(12)
        store.dispatch(Object.assign({}, state, { title: '按钮没按' + Math.random().toString() }))
    }
    render() {
        return el('button', {
            onclick: this.clickHandle
        }, state.button)
    }
}
document.getElementById('app').innerHTML = '';
document.getElementById('app').appendChild((new App({})).el);