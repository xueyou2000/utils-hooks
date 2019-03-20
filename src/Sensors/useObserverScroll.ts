import { useEffect, useRef } from "react";

/**
 * 监听元素滚动事件
 * @description 封装了滚动方向
 * @param callback
 * @param deps
 * @param target
 */
export function useObserverScroll(callback: (event: UIEvent, down: boolean) => void, deps?: any[], target: HTMLElement) {
    const lastScroll = useRef(window.pageYOffset);
    useEffect(() => {
        function handleScroll(event: UIEvent) {
            callback(event, !(lastScroll.current > window.pageYOffset));
            lastScroll.current = window.pageYOffset;
        }
        if (target) {
            target.addEventListener("scroll", handleScroll);
        }
        return () => {
            target.removeEventListener("scroll", handleScroll);
        };
    }, deps);
}
