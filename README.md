# utils-hooks

---

[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/utils-hooks.svg?style=flat-square
[npm-url]: http://npmjs.org/package/utils-hooks
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/utils-hooks.svg?style=flat-square
[download-url]: https://npmjs.org/package/utils-hooks

> 提供通用`hooks`

## useControll

提供受控组件和非受控组件, 双向绑定的实现

```tsx
function Checkbox(props) {
    // ...
    const [checked, setChecked, isControll] = useControll(props, "checked", "defaultChecked");
    // ...
}
```

## useMedia

提供媒体查询功能, 核心使用到了`window.matchMedia`接口

```tsx
// min-width: 1500px -> count === 5
// min-width: 1000px -> count === 4
// min-width: 600px -> count === 3
// 不匹配媒体查询则使用默认值 count === 2
const count = useMedia(["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"], [5, 4, 3], 2);
```
