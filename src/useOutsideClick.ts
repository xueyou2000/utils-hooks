import { useMount } from "./Lifecycles/useMount";

/**
 * 监听是否空白处点击
 * @param elements
 * @param cb
 */
export function useOutsideClick(elements: HTMLElement[], cb: Function) {
    useMount(() => {
        const outsideClickHandle = (event: MouseEvent) => {
            if (!elements.some((ele) => ele.contains(event.target as HTMLElement))) {
                cb();
            }
        };

        document.addEventListener("click", outsideClickHandle, true);

        return () => document.removeEventListener("click", outsideClickHandle, true);
    });
}
