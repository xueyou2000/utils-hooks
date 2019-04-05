/**
 * 监听元素是否hover
 * @param element
 * @param cb
 */
export function listenHover(element: HTMLElement, cb: (hovered: boolean, event: MouseEvent) => void) {
    const onMouseEnter = (event: MouseEvent) => {
        cb(true, event);
    };
    const onMouseLeave = (event: MouseEvent) => {
        cb(false, event);
    };

    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);

    // 返回取消函数
    return () => {
        element.removeEventListener("mouseenter", onMouseEnter);
        element.removeEventListener("mouseleave", onMouseLeave);
    };
}

/**
 * 监听元素点击事件
 * @param element
 * @param cb
 */
export function listenClick(element: HTMLElement, cb: (clicked: boolean, event: MouseEvent) => void, getPrevState?: () => boolean) {
    const onMouseClick = (event: MouseEvent) => {
        if (getPrevState) {
            cb(!getPrevState(), event);
        } else {
            cb(true, event);
        }
    };
    element.addEventListener("click", onMouseClick);

    // 返回取消函数
    return () => element.removeEventListener("click", onMouseClick);
}

/**
 * 监听元素焦点事件
 * @param element
 * @param cb
 */
export function listenFocus(element: HTMLElement, cb: (hovered: boolean, event: MouseEvent) => void) {
    const onMouseFocus = (event: MouseEvent) => {
        cb(true, event);
    };
    const onMouseBlur = (event: MouseEvent) => {
        cb(false, event);
    };

    element.addEventListener("focus", onMouseFocus);
    element.addEventListener("blur", onMouseBlur);

    // 返回取消函数
    return () => {
        element.removeEventListener("focus", onMouseFocus);
        element.removeEventListener("blur", onMouseBlur);
    };
}

/**
 * 监听元素右键菜单事件
 * @param element
 * @param cb
 */
export function listenContextMenu(element: HTMLElement, cb: (clicked: boolean, event: MouseEvent) => void) {
    const onContextMenu = (event: MouseEvent) => {
        cb(true, event);
        event.preventDefault();
    };
    element.addEventListener("contextmenu", onContextMenu);

    // 返回取消函数
    return () => {
        element.removeEventListener("contextmenu", onContextMenu);
    };
}
