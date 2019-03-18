import { useEffect, useRef } from "react";

export type GetDrawerContainerFuc = () => HTMLElement;
export type GetContainer = GetDrawerContainerFuc | HTMLElement;

/**
 * 获取容器
 * @param getContainer 
 * @example const container = useContainer(() => some_container);
 */
function useContainer(getContainer?: GetContainer) {
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
            document.body.append(container);
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

export default useContainer;