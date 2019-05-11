import React, { useEffect, useRef } from "react";
import { listenClick, listenContextMenu, listenFocus, listenHover } from "./utils";
export type TriggerAction = "hover" | "click" | "focus" | "contextMenu";

const ActionMap = {
    hover: listenHover,
    click: listenClick,
    focus: listenFocus,
    contextMenu: listenContextMenu,
};

export function useTrigger(ref: React.MutableRefObject<any>, action: TriggerAction[], cancel: TriggerAction[], cb: (act: TriggerAction, actived: boolean, event?: MouseEvent) => void, deps: any[] = []) {
    const prevState = useRef(false);

    /**
     * 是否可以取消激活
     * @param act
     */
    function canbeCancel(act: TriggerAction) {
        if (act === "contextMenu") {
            return cancel.some((x) => x === "click");
        }
        return cancel.some((x) => x === act);
    }

    function listenTrigger(element: HTMLElement, actions: TriggerAction[], handle: (act: TriggerAction, actived: boolean, event: MouseEvent) => void, alreadyListenMap = {}) {
        const listenMap = alreadyListenMap || {};
        actions.forEach((act) => {
            const listenFn = ActionMap[act];
            if (!listenFn) {
                throw new Error(`invalid action ${act}`);
            }
            if (!listenMap[act]) {
                listenMap[act] = listenFn(element, (actived, event) => handle(act, actived, event), () => prevState.current);
            }
        });
        return listenMap;
    }

    useEffect(() => {
        const element = ref.current as HTMLElement;
        if (!element) {
            return;
        }

        const listenMap = listenTrigger(element, action, (act, actived, event) => {
            if (actived || canbeCancel(act)) {
                prevState.current = actived;
                cb(act, actived, event);
            }
        });

        listenTrigger(
            element,
            cancel,
            (act, actived, event) => {
                prevState.current = false;
                cb(act, false, event);
            },
            listenMap,
        );

        return () => {
            // 清除事件监听
            for (let key in listenMap) {
                listenMap[key]();
            }
        };
    }, [ref.current, ...deps]);

    return (visible: boolean) => (prevState.current = visible);
}

/**
 * 触发包裹组件
 * @description 如果element是原生组件, 则直接返回, 否则包裹一层div去监听事件
 * @param element
 */
export function TriggerWrap(element: React.ReactNode, ref: React.MutableRefObject<any>, className?: string, allowOther = false) {
    const node = React.Children.only(element) as any;

    // node.type 是字符串, 则认为原生标签, 如果是构造函数, 则认定是自定义组件
    if (typeof node.type === "string" || allowOther) {
        return React.cloneElement(node, { ref, className });
    } else {
        return (
            <div ref={ref} className={className}>
                {element}
            </div>
        );
    }
}
