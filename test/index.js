import { Store } from '../src/store'
import { div, h1, button } from '../index'
const store = new Store({ title: '很高兴遇见你', content: '测试一下' });
let state = store.state;
class BaseGoodByeHx {
    constructor() {
        this.store = store
        this.state = state
        this.id = ''
        this.fields = ['content', 'title']
        this.el = this.render();
        console.log(this)
        this.store.listen(this.id, this.fields, (newData) => {
            this.el = this.update(this.el, newData);
        });
        return this.el;
    }

    render() { }
    update(prevEl, newData) {
        const nextEl = this.render(newData);
        if (nextEl.isEqualNode(prevEl)) {
            console.warn(`render() was called but there was no change in the rendered output`, el);
        } else {
            prevEl.parentElement.replaceChild(nextEl, prevEl);
        }
        return nextEl;
    };
}

class App extends BaseGoodByeHx {
    constructor(props) {
        super(props)
    }
    render() {
        return div(
            { style: { color: 'red' } },
            h1(this.state.title),
            h1(this.state.content)
        )
    }
}
setTimeout(() => {
    store.dispatch(Object.assign({}, state, { title: '不高兴遇见你' }))
}, 1000);
console.log(new App())
document.getElementById('app').appendChild(new App());