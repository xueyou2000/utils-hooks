import { useCallback, useEffect, useRef, useState } from "react";

export const UNMOUNTED = "unmounted";
export const EXITED = "exited";
export const ENTERING = "entering";
export const ENTERED = "entered";
export const EXITING = "exiting";

/**
 * 过度状态
 * @param visible   是否可见
 * @param initTranstion   是否初始动画, 默认false[可选]
 * @example const [ref, state] = useTranstion(visible);
 */
function useTranstion(visible: boolean, initTranstion: boolean  = false): [React.MutableRefObject<undefined>, string] {
    const [state, setState] = useState<string>(initTranstion ? (visible ? ENTERED : EXITED) : UNMOUNTED);
    const init = useRef(false);
    const ref = useRef();

    const handleTransitionEnter = useCallback((e: TransitionEvent) => {
        const element = ref.current as HTMLElement;
        if (e.target === element) {
            setState(ENTERED);
        }
    }, []);

    const handleTransitionLeave = useCallback((e: TransitionEvent) => {
        const element = ref.current as HTMLElement;
        if (e.target === element) {
            setState(EXITED);
        }
    }, []);

    useEffect(() => {
        const element = ref.current as HTMLElement;

        if (!element || init.current === false) {
            init.current = true;
            return;
        }

        if (visible) {
            // 重置离开的样式和事件
            element.removeEventListener("transitionend", handleTransitionLeave);
            element.removeEventListener("animationend", handleTransitionLeave);

            // 1. 监听过度完毕事件
            element.addEventListener("transitionend", handleTransitionEnter);
            element.addEventListener("animationend", handleTransitionEnter);

            setState(ENTERING);
        } else {
            element.removeEventListener("transitionend", handleTransitionEnter);
            element.removeEventListener("animationend", handleTransitionEnter);

            element.addEventListener("transitionend", handleTransitionLeave);
            element.addEventListener("animationend", handleTransitionLeave);

            setState(EXITING);
        }
    }, [visible]);

    return [ref, state];
}

export default useTranstion;