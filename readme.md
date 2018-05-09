> 一个微型mvvm框架实现

# 使用

`` npm i goodbye-hx babel-plugin-transform-goodbyehx-jsx --save ``
```
// index.jsx
import * as Gbh from 'goodbye-hx';
const store = {
    // your original store here
    color: 'red'
}
class App extends Gbh.Component {
  constructor() {
      // 第一个参数为组件name,不可重复
      // 第二个参数为监听的store key,只有当被监听的store 值发生变化时,组件才会被更新
      super('app', ['color']);
  }
  render() {
    return Gbh.el('div', {
      style: { color: Gbh.store.state.color, cursor: 'pointer' },
      onclick: () => {
        Gbh.store.dispatch({ color: Gbh.store.state.color === 'red' ? 'blue' : 'red' })
      }
    },
    <div
      onclick={() => { console.log('牛逼') }} 
      style={{ color: '#000' }}>
        11
    </div>,
    'hehe', 'heihei');
  }
}
Gbh.createApp('aipapa', App);


```

```
// .babelrc
{
    "presets": [
        "env"
    ],
    "plugins": [
        "babel-plugin-transform-goodbyehx-jsx"
    ],
    "ignore": [
        "node_modules"
    ]
}
```
推荐使用parcel来启动devserver和build，当然其他构建工具如webpack也是可以的。 
`` npm i parcel -g ``

然后创建文件index.html
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>叼叼叼</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body id="aipapa">

</body>
<script src="./index.jsx"></script>

</html>
```
执行命令`` parcel index.html ``  
打开127.0.0.1:1234,如果页面渲染成功就可以愉快的玩耍了^_^