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

## useContainer

封装获取 dom 元素方法, 如果提供参数, 则默认再 body 内创建一个 div 作为容器.

> 一般用于弹出组件

```tsx
const container = useContainer();
```

## usePortal

封装`useContainer`, 并使用`ReactDOM.createPortal`渲染弹出内容

```tsx
function Model() {
    const renderPortal = usePortal();

    return renderPortal(
        <div>
            <h1>我是弹出框</h1>
        </div>
    );
}
```

## useTranstion

监听过度动画状态.

```tsx
import useTranstion, { UNMOUNTED, ENTERING, ENTERED, EXITING, EXITED } from "utils-hooks/es/useTranstion";

function App() {
    // 是否可见, 切换此状态来改变是否 state
    const [visible] = useState(false);
    const [ref, state] = useTranstion(visible);
    // 默认状态 state == UNMOUNTED

    return <div ref={ref}>有过度css的元素</div>;
}
```

## useObserverScroll

监听元素滚动事件, 封装了滚动方向

```tsx
useObserverScroll((event, down) => {
    console.log(`向${down ? "下" : "上"}滚动了`);
});
```

## useGlobalState

监听全局数据

```tsx
import { MonitorState, MonitorStateTest } from "utils-hooks";
const countStore = new MonitorState(0);

export function MonitorStateTest() {
    const [count, setCount] = useGlobalState<number>(countStore);

    return (
        <div>
            当前count: {count}
            <button onClick={() => setCount(count + 1)}>增加</button>
            <button onClick={() => setCount(count - 1)}>减少</button>
        </div>
    );
}
```

## useOutsideClick

监听空白处点击

```tsx
var div = document.getById("abc");
useOutsideClick([div], () => {
    console.log("点击到空白处了");
});
```

## useTrigger

监听触发器

```tsx
function app() {
    const ref = useTrigger(["click"], ["click"], (actived) => {
        console.log(actived ? "激活了" : "取消激活");
    });

    return <div ref={ref} />;
}
```

## useDebounce

防抖函数

```tsx
function app() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState([]);

    // Effect for API call
    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true);
            searchCharacters(debouncedSearchTerm).then((results) => {
                setIsSearching(false);
                setResults(results);
            });
        } else {
            setResults([]);
        }
    }, [debouncedSearchTerm]); // Only call effect if debounced search term changes

    return (
        <div>
            <input placeholder="Search Marvel Comics" onChange={(e) => setSearchTerm(e.target.value)} />
            {isSearching && <div>Searching ...</div>}
        </div>
    );
}
```
