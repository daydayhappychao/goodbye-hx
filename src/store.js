function Store(initState) {
    this.state = initState || {};
    this.listener = {};
    return this;
};
Store.prototype.listen = function (id, fields, callback) {
    if (!(fields instanceof Array) || typeof callback === 'Function') {
        console.error('listen method need to get arg of Array and Function');
        return;
    }
    this.listener[id] = {
        fields: fields,
        callback: callback
    };
};
Store.prototype.dispatch = function (newState) {
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
    ids = [...new Set(ids)];
    ids.forEach(function (listenerKey) {
        this.listener[listenerKey].callback(this.state);
    },this);
}