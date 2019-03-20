import { useEffect, useRef } from "react";

/**
 * 监听元素滚动事件
 * @description 封装了滚动方向
 * @param callback
 * @param deps
 * @param target
 */
export function useObserverScroll(callback: (event: UIEvent, down: boolean) => void, target?: HTMLElement, deps?: any[]) {
    const lastScroll = useRef(window.pageYOffset);
    useEffect(() => {
        function handleScroll(event: UIEvent) {
            callback(event, !(lastScroll.current > window.pageYOffset));
            lastScroll.current = window.pageYOffset;
        }
        const t = target || window;
        if (t) {
            t.addEventListener("scroll", handleScroll);
        }
        return () => {
            t.removeEventListener("scroll", handleScroll);
        };
    }, deps);
}
