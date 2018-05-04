import store from './store'
import { el } from './index'
export default class BaseGoodByeHx {
    constructor(id, fields) {
        this.id = id
        this.fields = fields
        this.render = this.render.bind(this)
        this.element = this.render();
        store.listen(this.id, this.fields, (newData) => {
            this.element = this.update(this.element, newData);
        });
    }
    id: string
    fields: string[] | undefined[]
    element: Element | any
    render(newData?) { return el('div') }
    update(prevEl, newData) {
        const nextEl = this.render(newData);
        if (nextEl.isEqualNode(prevEl)) {
            console.warn(`render() was called but there was no change in the rendered output`, this.element);
        } else {
            prevEl.parentElement.replaceChild(nextEl, prevEl);
        }
        return nextEl;
    };
}