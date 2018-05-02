export class Store {
    constructor(initState?) {
        if (initState) {
            this.state = initState
        }
    }
    state: any = {}


    listener = {}
    init = (initState?) => {
        this.state = initState
    }
    listen = (id: string, fields: string[], callback: Function) => {
        this.listener[id] = {
            fields: fields,
            callback: callback
        };
    }
    dispatch = (newState) => {
        let ids = [];
        for (const key in this.state) {
            if (newState[key] !== this.state[key]) {
                this.state[key] = newState[key];
                for (const listenerKey in this.listener) {
                    if (this.listener[listenerKey].fields.includes(key)) {
                        ids.push(listenerKey);
                    }
                }
            }
        };
        // ids = [...new Set(ids)];
        ids.forEach(function (listenerKey) {
            this.listener[listenerKey].callback(this.state);
        }, this);
    }
}

const oriStore = new Store()
export default oriStore
export let state = oriStore._state