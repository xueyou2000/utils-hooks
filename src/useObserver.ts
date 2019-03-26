import { useEffect, useRef, useState } from "react";

/**
 * 监听元素是否可视
 * @param justFirst 是否仅初次加载触发
 * @example
 *  const [ref, visible] = useObserver();
 */
export function useObserver(justFirst = false): [React.MutableRefObject<undefined>, boolean] {
    const ref = useRef();
    const loadRef = useRef(false);
    // 元素当前是否可见
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current as HTMLElement;
        if (!element) {
            return;
        }
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((info) => {
                const _visible = info.intersectionRatio > 0;

                if (justFirst) {
                    if (_visible && !loadRef.current) {
                        loadRef.current = true;
                        setVisible(_visible);
                        intersectionObserver.disconnect();
                    }
                } else {
                    setVisible(_visible);
                }
            });
        });

        intersectionObserver.observe(element);
        return () => {
            intersectionObserver.unobserve(element);
        };
    }, [ref.current]);

    return [ref, visible];
}

export function useObserverWithRef(ref: React.MutableRefObject<any>, justFirst = false): boolean {
    const loadRef = useRef(false);
    // 元素当前是否可见
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current as HTMLElement;
        if (!element) {
            return;
        }
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((info) => {
                const _visible = info.intersectionRatio > 0;

                if (justFirst) {
                    if (_visible && !loadRef.current) {
                        loadRef.current = true;
                        setVisible(_visible);
                        intersectionObserver.disconnect();
                    }
                } else {
                    setVisible(_visible);
                }
            });
        });

        intersectionObserver.observe(element);
        return () => {
            intersectionObserver.unobserve(element);
        };
    }, [ref.current]);

    return visible;
}
