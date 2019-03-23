import React, { useRef } from "react";
import { TriggerAction, useTrigger } from "./useTrigger";

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
export function useTriggerChain(triggerRef: React.MutableRefObject<HTMLElement>, hideRef: React.MutableRefObject<HTMLElement>, cb: (visible: boolean) => void, config: TriggerChainConfig) {
    const triggerActived = useRef(false);
    const hideActived = useRef(false);
    const timeHandle = useRef(null);

    const setActived = useTrigger(triggerRef, config.trigger, config.trigger, (act, actived, event) => {
        triggerActived.current = actived;
        if (actived) {
            // 触发显示 逻辑
            cb(true);
        } else if (act === "hover") {
            // 延迟 mouseDelay 后, 再触发隐藏逻辑
            clearTimeout(timeHandle.current);
            timeHandle.current = setTimeout(() => {
                // 触发隐藏逻辑
                if (!hideActived.current) {
                    cb(false);
                }
            }, config.mouseDelay);
        } else {
            // 触发隐藏逻辑
            if (!hideActived.current) {
                cb(false);
            }
        }
    });

    useTrigger(hideRef, config.trigger, config.trigger, (act, actived, event) => {
        hideActived.current = actived;
        // 触发隐藏 逻辑
        if (!actived) {
            // 触发隐藏逻辑
            if (!triggerActived.current) {
                cb(false);
            }
        }
    });

    return setActived;
}
