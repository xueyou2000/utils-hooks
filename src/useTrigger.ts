import { useEffect, useRef } from "react";
import { listenClick, listenContextMenu, listenFocus, listenHover } from "utils-dom";

export type TriggerAction = "hover" | "click" | "focus" | "contextMenu";

const ActionMap = {
    hover: listenHover,
    click: listenClick,
    focus: listenFocus,
    contextMenu: listenContextMenu
};

export function useTrigger(action: TriggerAction[], cancel: TriggerAction[], cb: (act: TriggerAction, actived: boolean, event?: MouseEvent) => void) {
    const ref = useRef();
    const prevState = useRef(false);

    /**
     * 是否可以取消激活
     * @param act
     */
    function canbeCancel(act: TriggerAction) {
        // if (act === "contextMenu") {
        //     return cancel.some((x) => x === "click");
        // }
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
            listenMap
        );

        return () => {
            // 清除事件监听
            for (let key in listenMap) {
                listenMap[key]();
            }
        };
    }, [ref.current]);

    return ref;
}
