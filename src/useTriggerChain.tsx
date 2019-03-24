import React, { useRef, useEffect } from "react";
import { TriggerAction, useTrigger } from "./useTrigger";
import { listenHover } from "utils-dom";

export interface TriggerChainConfig {
    trigger: TriggerAction[];
    mouseDelay: number;
}

/**
 * 触发链
 * @param triggerRef
 * @param hideRef
 * @param mouseDelay
 */
export function useTriggerChain(
    triggerRef: React.MutableRefObject<HTMLElement>,
    hideRef: React.MutableRefObject<HTMLElement>,
    cb: (act: TriggerAction, actived: boolean, event: MouseEvent) => void,
    config: TriggerChainConfig,
    deps: any[] = []
) {
    const triggerActived = useRef(false);
    const hideActived = useRef(false);
    const timeHandle = useRef(null);

    const setActived = useTrigger(
        triggerRef,
        config.trigger,
        config.trigger,
        (act, actived, event) => {
            triggerActived.current = actived;
            if (actived) {
                cb(act, actived, event);
            } else if (act === "hover") {
                // hover时候离开, 等mouseDelay秒, 再判断
                clearTimeout(timeHandle.current);
                timeHandle.current = setTimeout(() => {
                    if (!hideActived.current) {
                        cb(act, actived, event);
                    }
                }, config.mouseDelay);
            } else {
                if (!hideActived.current) {
                    cb(act, actived, event);
                }
            }
        },
        deps
    );

    useEffect(() => {
        return listenHover(hideRef.current, (hovered, event) => {
            hideActived.current = hovered;
            if (!hovered) {
                clearTimeout(timeHandle.current);
                timeHandle.current = setTimeout(() => {
                    if (!triggerActived.current) {
                        cb("hover", hovered, event);
                    }
                }, config.mouseDelay);
            }
        });
    }, [hideRef.current, ...deps]);

    return setActived;
}
