import Component, { getState, store, el, createApp } from '../lib/index'
store.init({ title: '很高兴遇见你', content: '测试一下', button: '按钮没按' })

class App extends Component {
    constructor(props) {
        super('app', ['content', 'title']);
    }
    render() {
        return el('div',
            { style: { color: 'red' } },
            el('h1', getState().title),
            el('h1', {
                onclick: () => {
                    store.dispatch(Object.assign({}, getState(), { button: '按钮按了' }))
                }
            }, getState().content),
            (new Button({})).element
        )
    }
}
class Button extends Component {
    constructor(props) {
        super('button', ['button']);
    }
    clickHandle() {
        store.dispatch(Object.assign({}, getState(), { title: '按钮没按' + Math.random().toString() }))
    }
    render() {
        return el('button', {
            onclick: this.clickHandle
        }, getState().button)
    }
}
createApp('app', App)