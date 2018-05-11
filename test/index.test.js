var assert = require('assert');
var Gbh = require('../lib/index');
var { store, Component } = Gbh;
document = { createElement: () => { return 'haha' } };
Element = String;
describe('store', function () {
    var vElement = ''
    describe('init', function () {
        it('should init', function () {
            store.init({ name: 'Magin' });
            assert.deepEqual(store.state, { name: 'Magin' });
        });
    });
    describe('listen', function () {
        it('should listen', function () {
            function cb() {
                vElement = 'refresh';
            }
            store.listen('89757', ['name'], cb);
            assert.deepEqual(
                store.listener['89757'],
                { fields: ['name'], callback: cb }
            );
        });
    });
    describe('dispatch', function () {
        store.listen('9527', ['age'], () => { });
        it('should dispatch', function () {
            store.dispatch({ name: 'wangchao' });
            assert.deepEqual(store.state, { name: 'wangchao' });
        });
        it('cant\'t dispatch inexistent state', function () {
            store.dispatch({ age: 18 });
            assert.deepEqual(store.state, { name: 'wangchao' });
        });
    });
    describe('getState', function () {
        it('should getState', function () {
            assert.deepEqual(store.getState(), { name: 'wangchao' });
        })
    });
});
describe('Component', function () {
    describe('init a Component', function () {
        class Ceshi extends Component {
            constructor() {
                super('Ceshi', ['sex']);
            };
        }
        new Ceshi();
        it('init Component with id and fields', function () {
            assert.deepEqual(store.listener['Ceshi'].fields, ['sex']);
        })
    });
})