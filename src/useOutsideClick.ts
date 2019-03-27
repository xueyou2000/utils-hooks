import { useEffect } from "react";

/**
 * 监听是否空白处点击
 * @param elements
 * @param cb
 */
export function useOutsideClick(elements: HTMLElement[], cb: Function, deps: any[] = []) {
    useEffect(() => {
        const outsideClickHandle = (event: MouseEvent) => {
            if (!elements.some((ele) => ele && (ele === event.target || ele.contains(event.target as HTMLElement)))) {
                cb(event);
            }
        };
        document.addEventListener("click", outsideClickHandle, true);
        return () => document.removeEventListener("click", outsideClickHandle, true);
    }, [...elements, ...deps]);
}
