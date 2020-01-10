# Change Log

## 0.0.77 (Fri Jan 10 2020)

-   紧急修复`Store`导出

## 0.0.76 (Fri Jan 10 2020)

-   增强`store`

## 0.0.75 (Tue Nov 05 2019)

-   再次修复`useFetchWichRefresh`加载状态

## 0.0.74 (Tue Nov 05 2019)

-   修复`useFetchWichRefresh`刷新时加载状态未设置问题

## 0.0.73 (Fri Oct 25 2019)

-   增加`useFetch`, `useFetchWichRefresh`管理网络请求状态
-   增加`useStore`全局状态管理

## 0.0.72 (Mon Sep 09 2019)

-   `useControll`增加值转换器

## 0.0.71 (Sun May 12 2019)

-   修复`useTriggerChain`在没有`hover`触发选项的时候忽略

## 0.0.70 (Sun May 12 2019)

-   修复`TriggerWrap`包裹元素时候漏掉了元素自身的 props

## 0.0.69 (Sat May 11 2019)

-   `TriggerWrap`增加可选参数, `className`和`allowOther`

## 0.0.68 (Fri May 10 2019)

-   修复 `useTriggerChain`中某些 ref 暂时未未定义导致的空指针异常

## 0.0.67 (Thu May 09 2019)

-   增加 `useHover`

## 0.0.66 (Thu May 09 2019)

-   暴露 `DefineDefaultValue`

## 0.0.65 (Wed Apr 24 2019)

-   修复`useForceUpdate`强制更新实现

## 0.0.64 (Tue Apr 23 2019)

-   增加`useForceUpdate`强制更新 hooks

## 0.0.63 (Sun Apr 21 2019)

-   再次修复`useTranstion`在初次动画问题

## 0.0.61 (Sun Apr 21 2019)

-   修复`useTranstion`在初次动画问题

## 0.0.60 (Wed Apr 17 2019)

-   `useDebounceCallback`当延迟为 0 时候, 不进行`setTimeout`

## 0.0.59 (Wed Apr 17 2019)

-   增加`useDebounce`
-   增加`useDebounceCallback`

## 0.0.58 (Wed Apr 17 2019 )

-   修改`usePortal`函数签名, 增加`className`属性

## 0.0.57 (Sun Apr 07 2019)

-   修复`useUpdateEffect`的导出

## 0.0.56 (Sun Apr 07 2019)

-   增加`useUpdateEffect`

## 0.0.55 (Fri Apr 05 2019)

-   移除外部`util-dom`依赖

## 0.0.54 (Wed Mar 27 2019)

-   `useOutsideClick`再次修复

## 0.0.53 (Tue Mar 26 2019)

-   增加 ref 参数的版本

## 0.0.52 (Tue Mar 26 2019)

-   修复`useOutsideClick`的判断逻辑

## 0.0.51 (Sun Mar 24 2019)

-   `useTriggerChain`增加 deeps 依赖数组

## 0.0.50 (Sat Mar 23 2019)

-   `useTrigger`, `useTriggerChain` 返回一个更改函数, 去更改内部状态

## 0.0.49 (Sat Mar 23 2019)

-   `useTrigger`导出
-   修复`useOutsideClick`再元素为空时候的异常

## 0.0.48 (Sat Mar 23 2019)

-   增加`TriggerWrap`
-   增加`useTrigger`

## 0.0.47 (Sat Mar 23 2019)

-   再次更新`useTrigger`函数签名, 将 ref 通过参数传入

## 0.0.46 (Sat Mar 23 2019)

-   更新`useTrigger`函数签名

## 0.0.45 (Sat Mar 23 2019)

-   增加`useOutsideClick`
-   增加`useTrigger`

## 0.0.43 (Thu Mar 21 2019)

-   增加`useGlobalState`

## 0.0.42 (Wed Mar 20 2019)

-   增加`useObserverScroll`
-   增加`useMount`
-   增加`useUnmount`

## 0.0.41 (Mon Mar 18 2019)

-   增加`useObserver`, 由于使用到了`IntersectionObserver`, 再正式项目中需要使用[polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)

## 0.0.40 (Mon Mar 18 2019)

-   修复 IE 下不支持`append`API

## 0.0.39 (Mon Mar 18 2019)

-   更改输出目标`esnext`为`es5`
-   默认使用`es`模块

## 0.0.38 (Mon Mar 18 2019)

-   修复`useTranstion`是否初次过度动画实现

## 0.0.37 (Mon Mar 18 2019)

-   `useTranstion` 增加`initTranstion`可选参数
-   `useTranstion`初始化第一次渲染逻辑修复

## 0.0.34 (Mon Mar 18 2019)

-   导出所有内容

## 0.0.33 (Mon Mar 18 2019)

-   增加`useContainer`
-   增加`usePortal`
-   增加`useTranstion`

## 0.0.32 (Sun Mar 17 2019)

-   极大优化 useControll 性能
-   更新 readme

## 0.0.31 (March 8, 2019)

-   更改输出目标`esnext`为`es6`
-   更改`.d.ts`目录为`typings`

## 0.0.3 (February 15, 2019)

-   移除 babel

## 0.0.1 (February 15, 2019)

-   初始化项目
