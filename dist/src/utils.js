"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createApp(id, App) {
    document.getElementById(id).innerHTML = '';
    document.getElementById(id).appendChild((new App({})).element);
}
exports.createApp = createApp;
//# sourceMappingURL=utils.js.map