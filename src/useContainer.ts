import { useEffect, useRef } from "react";

export type GetDrawerContainerFuc = () => HTMLElement;
export type GetContainer = GetDrawerContainerFuc | HTMLElement;

/**
 * 获取容器
 * @param getContainer
 * @param   className
 * @example const container = useContainer(() => some_container);
 */
export function useContainer(className?: string, getContainer?: GetContainer) {
    const containerRef = useRef<HTMLElement>(null);

    // 在组件装卸时, 清除再body内创建的 container
    useEffect(() => {
        return () => {
            if (containerRef.current) {
                document.body.removeChild(containerRef.current);
            }
        };
    }, []);

    let container: HTMLElement;
    if (!getContainer) {
        // 未提供 container 则在Body下创建div作为容器
        if (!containerRef.current) {
            container = document.createElement("div");
            if (className) {
                container.classList.add(className);
            }
            document.body.appendChild(container);
            containerRef.current = container;
        } else {
            return containerRef.current;
        }
    } else if (getContainer instanceof Function) {
        container = getContainer();
    } else {
        container = getContainer;
    }

    return container;
}

export function useContainerWithRef(containerRef: React.MutableRefObject<any>, className?: string, getContainer?: GetContainer) {
    // 在组件装卸时, 清除再body内创建的 container
    useEffect(() => {
        return () => {
            if (containerRef.current) {
                document.body.removeChild(containerRef.current);
            }
        };
    }, []);

    let container: HTMLElement;
    if (!getContainer) {
        // 未提供 container 则在Body下创建div作为容器
        if (!containerRef.current) {
            container = document.createElement("div");
            if (className) {
                container.classList.add(className);
            }
            document.body.appendChild(container);
            containerRef.current = container;
        } else {
            return containerRef.current;
        }
    } else if (getContainer instanceof Function) {
        container = getContainer();
    } else {
        container = getContainer;
    }

    return container;
}
