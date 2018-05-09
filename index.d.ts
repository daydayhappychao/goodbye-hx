export = goodbyehx;
export as namespace goodbyehx;
declare namespace goodbyehx {
  class Component {
    constructor(id: string, fields: string[]);
  }
  let el: (elementName: string, ...any) => HTMLElement;
  interface store {
    state: any;
    listener: any;
    getState: () => any;
    init: (Object) => void;
    listen: (id: string, fields: string[], callback: Function) => void;
    dispatch: (newState: any) => void;
  }
  let getState: () => any;
  let createApp: (id: string, App: any) => void;
}