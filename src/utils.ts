export function createApp(id: string, App: any) {
    document.getElementById(id).innerHTML = '';
    document.getElementById(id).appendChild((new App({})).element);
}